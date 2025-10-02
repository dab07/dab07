import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { View, Dimensions, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as THREE from 'three';

const { width, height } = Dimensions.get('window');

interface WaterPlaneProps {
    onRipple: (x: number, y: number) => void;
}

function WaterPlane({ onRipple }: WaterPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; time: number; id: number }>>([]);
    const rippleIdRef = useRef(0);

    // Enhanced water shader material with better physics
    const waterMaterial = useRef(
        new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                ripples: { value: [] },
                rippleCount: { value: 0 },
                resolution: { value: new THREE.Vector2(width, height) },
                baseColor: { value: new THREE.Color(0x006994) },
                surfaceColor: { value: new THREE.Color(0x00a8cc) },
                deepColor: { value: new THREE.Color(0x003d5c) },
                waveAmplitude: { value: 0.02 },
                waveFrequency: { value: 1.0 },
                rippleStrength: { value: 0.15 },
            },
            vertexShader: `
        uniform float time;
        uniform vec3 ripples[20];
        uniform int rippleCount;
        uniform float waveAmplitude;
        uniform float waveFrequency;
        uniform float rippleStrength;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vElevation;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          float elevation = 0.0;
          
          // Enhanced base water waves with multiple frequencies
          elevation += sin(pos.x * 2.0 * waveFrequency + time * 2.0) * waveAmplitude;
          elevation += sin(pos.y * 3.0 * waveFrequency + time * 1.5) * waveAmplitude * 0.5;
          elevation += sin(pos.x * 4.0 * waveFrequency + pos.y * 2.0 * waveFrequency + time * 3.0) * waveAmplitude * 0.25;
          elevation += sin(pos.x * 1.5 * waveFrequency - pos.y * 2.5 * waveFrequency + time * 1.8) * waveAmplitude * 0.3;
          
          // Advanced ripple effects with interference patterns
          for(int i = 0; i < 20; i++) {
            if(i >= rippleCount) break;
            
            vec2 ripplePos = ripples[i].xy;
            float rippleTime = ripples[i].z;
            
            float dist = distance(pos.xy, ripplePos);
            float rippleAge = rippleTime;
            
            // Multiple wave fronts for realistic ripple propagation
            float wave1 = sin(dist * 15.0 - rippleAge * 8.0) * rippleStrength;
            float wave2 = sin(dist * 25.0 - rippleAge * 12.0) * rippleStrength * 0.5;
            float wave3 = sin(dist * 35.0 - rippleAge * 16.0) * rippleStrength * 0.25;
            
            // Damping function for realistic energy dissipation
            float damping = exp(-rippleAge * 2.0) * exp(-dist * 1.5);
            
            elevation += (wave1 + wave2 + wave3) * damping;
          }
          
          pos.z = elevation;
          vElevation = elevation;
          
          // Calculate normal for lighting
          vec3 tangent = vec3(1.0, 0.0, 0.0);
          vec3 bitangent = vec3(0.0, 1.0, 0.0);
          vNormal = normalize(cross(tangent, bitangent));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec3 baseColor;
        uniform vec3 surfaceColor;
        uniform vec3 deepColor;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vElevation;
        varying vec3 vNormal;
        
        void main() {
          vec2 uv = vUv;
          
          // Enhanced water color based on elevation and depth
          float elevationFactor = vElevation * 8.0 + 0.5;
          vec3 waterColor = mix(deepColor, baseColor, elevationFactor);
          waterColor = mix(waterColor, surfaceColor, max(0.0, elevationFactor - 0.3));
          
          // Advanced shimmer effect
          float shimmer = sin(vPosition.x * 12.0 + time * 4.0) * 0.1;
          shimmer += sin(vPosition.y * 15.0 + time * 2.5) * 0.05;
          shimmer += sin(vPosition.x * 8.0 - vPosition.y * 6.0 + time * 3.5) * 0.03;
          
          // Fresnel effect for realistic water surface
          float fresnel = pow(1.0 - abs(vElevation), 1.5);
          vec3 fresnelColor = mix(waterColor, vec3(0.7, 0.85, 1.0), fresnel * 0.4);
          
          // Caustics effect
          float caustics = sin(vPosition.x * 20.0 + time * 3.0) * sin(vPosition.y * 20.0 + time * 2.0);
          caustics *= 0.1 * (1.0 + vElevation * 2.0);
          
          vec3 finalColor = fresnelColor + shimmer + caustics;
          
          // Subtle foam effect on wave peaks
          float foam = smoothstep(0.08, 0.12, vElevation);
          finalColor = mix(finalColor, vec3(0.9, 0.95, 1.0), foam * 0.3);
          
          gl_FragColor = vec4(finalColor, 0.85);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
        })
    );

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.time.value = state.clock.elapsedTime;

            // Update ripples with better cleanup
            const now = state.clock.elapsedTime;
            const activeRipples = ripples.filter(ripple => now - ripple.time < 3.0);

            if (activeRipples.length !== ripples.length) {
                setRipples(activeRipples);
            }

            // Update shader uniforms with current ripples
            const rippleData = activeRipples.map(ripple => [
                ripple.x, ripple.y, now - ripple.time
            ]).flat();

            // Pad the array to ensure consistent size
            while (rippleData.length < 60) rippleData.push(0);

            material.uniforms.ripples.value = rippleData;
            material.uniforms.rippleCount.value = activeRipples.length;
        }
    });

    const handlePointerDown = (event: any) => {
        const { point } = event;
        const newRipple = {
            x: point.x,
            y: point.y,
            time: Date.now() / 1000,
            id: rippleIdRef.current++,
        };

        setRipples(prev => [...prev, newRipple]);
        onRipple(point.x, point.y);
    };

    return (
        <mesh
            ref={meshRef}
            material={waterMaterial.current}
            onPointerDown={handlePointerDown}
            rotation={[-Math.PI / 6, 0, 0]}
        >
            <planeGeometry args={[viewport.width * 1.2, viewport.height * 1.2, 128, 128]} />
        </mesh>
    );
}

interface WaterEffectProps {
    className?: string;
}

export default function WaterEffect({ className }: WaterEffectProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            loadSound();
        }

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const loadSound = async () => {
        try {
            // Using a water drop sound from a reliable source
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: 'https://www.soundjay.com/misc/sounds/water-drop-3.wav' },
                { shouldPlay: false, volume: 0.3 }
            );
            setSound(newSound);
        } catch (error) {
            console.log('Error loading sound:', error);
        }
    };

    const playRippleSound = async () => {
        if (Platform.OS !== 'web' && sound) {
            try {
                await sound.replayAsync();
            } catch (error) {
                console.log('Error playing sound:', error);
            }
        }
    };

    const handleRipple = (x: number, y: number) => {
        playRippleSound();
        // Add haptic feedback on mobile
        if (Platform.OS !== 'web') {
            // Haptic feedback would go here
        }
    };

    return (
        <View style={{ flex: 1 }} className={className}>
            <Canvas
                camera={{
                    position: [0, 0, 3],
                    fov: 60,
                    near: 0.1,
                    far: 1000
                }}
                style={{ flex: 1 }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight
                    position={[0, 5, 3]}
                    intensity={0.8}
                    color="#87ceeb"
                />
                <WaterPlane onRipple={handleRipple} />
            </Canvas>
        </View>
    );
}

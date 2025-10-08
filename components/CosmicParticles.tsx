import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate,
    Easing,
} from 'react-native-reanimated';

interface ParticleProps {
    delay: number;
    duration: number;
    size: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
}

const Particle: React.FC<ParticleProps> = ({
    delay,
    duration,
    size,
    startX,
    startY,
    endX,
    endY,
    color,
}) => {
    const progress = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            false
        );

        opacity.value = withRepeat(
            withTiming(1, {
                duration: duration / 2,
                easing: Easing.inOut(Easing.quad),
            }),
            -1,
            true
        );
    }, [duration]);

    const animatedStyle = useAnimatedStyle(() => {
        const x = interpolate(progress.value, [0, 1], [startX, endX]);
        const y = interpolate(progress.value, [0, 1], [startY, endY]);
        
        return {
            transform: [{ translateX: x }, { translateY: y }],
            opacity: opacity.value * 0.6,
        };
    });

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    position: 'absolute',
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                },
            ]}
        />
    );
};

interface CosmicParticlesProps {
    particleCount?: number;
    colors?: string[];
}

const CosmicParticles: React.FC<CosmicParticlesProps> = ({
    particleCount = 30,
    colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#FFFFFF'],
}) => {
    const particles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        delay: Math.random() * 5000,
        duration: 8000 + Math.random() * 12000,
        size: 1 + Math.random() * 3,
        startX: Math.random() * 400 - 200,
        startY: Math.random() * 800 + 100,
        endX: Math.random() * 400 - 200,
        endY: -Math.random() * 200 - 100,
        color: colors[Math.floor(Math.random() * colors.length)],
    }));

    return (
        <View className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <Particle
                    key={particle.id}
                    delay={particle.delay}
                    duration={particle.duration}
                    size={particle.size}
                    startX={particle.startX}
                    startY={particle.startY}
                    endX={particle.endX}
                    endY={particle.endY}
                    color={particle.color}
                />
            ))}
        </View>
    );
};

export default CosmicParticles;
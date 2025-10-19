import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    Easing,
} from 'react-native-reanimated';

interface AnimatedScreenWrapperProps {
    children: React.ReactNode;
    screenName: string;
}

export default function AnimatedScreenWrapper({ 
    children, 
    screenName 
}: AnimatedScreenWrapperProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useFocusEffect(
        React.useCallback(() => {
            // Only animate non-index screens
            if (screenName !== 'index') {
                // Coming from index: Zoom in then zoom out
                scale.value = 0.3;
                opacity.value = 0;
                
                scale.value = withSequence(
                    withTiming(1.1, { 
                        duration: 600, 
                        easing: Easing.out(Easing.quad) 
                    }),
                    withTiming(1, { 
                        duration: 400, 
                        easing: Easing.inOut(Easing.quad) 
                    })
                );
                
                opacity.value = withTiming(1, { 
                    duration: 500, 
                    easing: Easing.out(Easing.quad) 
                });
            }

            return () => {
                // Cleanup when leaving screen (going back to index)
                if (screenName !== 'index') {
                    scale.value = withSequence(
                        withTiming(1.1, { 
                            duration: 300, 
                            easing: Easing.in(Easing.quad) 
                        }),
                        withTiming(0.3, { 
                            duration: 500, 
                            easing: Easing.in(Easing.quad) 
                        })
                    );
                    
                    opacity.value = withTiming(0, { 
                        duration: 600, 
                        easing: Easing.in(Easing.quad) 
                    });
                }
            };
        }, [screenName])
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            {children}
        </Animated.View>
    );
}
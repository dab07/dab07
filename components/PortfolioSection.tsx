import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

interface PortfolioSectionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function PortfolioSection({
                                             children,
                                             delay = 0,
                                             className
                                         }: PortfolioSectionProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!hasAnimated.current) {
            opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
            translateY.value = withDelay(delay, withTiming(0, { duration: 600 }));
            hasAnimated.current = true;
        }
    }, [delay, opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.content}>
                {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
});

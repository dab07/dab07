import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate,
    Easing,
} from 'react-native-reanimated';

const CosmicLoader: React.FC = () => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 3000,
                easing: Easing.linear,
            }),
            -1,
            false
        );

        scale.value = withRepeat(
            withTiming(1.2, {
                duration: 1500,
                easing: Easing.inOut(Easing.quad),
            }),
            -1,
            true
        );

        opacity.value = withRepeat(
            withTiming(1, {
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${rotation.value}deg` },
            { scale: scale.value },
        ],
        opacity: opacity.value,
    }));

    const pulseStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacity.value, [0.3, 1], [0.1, 0.3]),
        transform: [{ scale: interpolate(scale.value, [1, 1.2], [1, 1.5]) }],
    }));

    return (
        <View className="flex-1 items-center justify-center">
            {/* Outer Glow */}
            <Animated.View style={pulseStyle} className="absolute">
                <LinearGradient
                    colors={['rgba(168, 85, 247, 0.3)', 'transparent']}
                    className="w-32 h-32 rounded-full"
                />
            </Animated.View>

            {/* Main Loader */}
            <Animated.View style={animatedStyle}>
                <LinearGradient
                    colors={['#8B5CF6', '#EC4899', '#06B6D4']}
                    className="w-16 h-16 rounded-full items-center justify-center"
                >
                    <View className="w-12 h-12 rounded-full bg-black items-center justify-center">
                        <View className="w-2 h-2 bg-white rounded-full" />
                    </View>
                </LinearGradient>
            </Animated.View>

            <Text className="text-purple-300 mt-6 text-lg font-medium">
                Loading cosmic projects...
            </Text>
        </View>
    );
};

export default CosmicLoader;
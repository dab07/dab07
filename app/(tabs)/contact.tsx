import React from 'react';
import { View, Text, Pressable, Linking, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';
import CosmicParticles from '@/components/CosmicParticles';
import { Mail, Copy, ExternalLink } from 'lucide-react-native';

export default function ContactScreen() {
    const scrollY = useSharedValue(0);
    const { width } = Dimensions.get('window');
    const isTablet = width > 768;
    const containerWidth = isTablet ? '60%' : '90%';

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const email = '7novharshit@gmail.com';

    const openEmail = () => {
        Linking.openURL(`mailto:${email}`);
    };

    const copyEmail = async () => {
        // For web compatibility, we'll use a simple approach
        try {
            if (navigator?.clipboard) {
                await navigator.clipboard.writeText(email);
            }
        } catch (error) {
            console.log('Copy not supported on this platform');
        }
    };
    return (
        <AnimatedScreenWrapper screenName="contact">
            <View className="flex-1 bg-black">
                <CosmicParticles particleCount={25} />

                {/* Stars Background */}
                <View className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                        <View
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                opacity: Math.random() * 0.8 + 0.2,
                            }}
                        />
                    ))}
                </View>

                <SafeAreaView className="flex-1" edges={['bottom']}>
                    <Animated.ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingTop: 120, paddingBottom: 40 }}
                    >
                        <View className="items-center px-4">
                            <View style={{ width: containerWidth, maxWidth: 600 }}>
                                {/* Header */}
                                <View className="mb-12 text-center">
                                    <Text className="text-4xl font-bold text-white mb-4 text-center">
                                        Get In Touch
                                    </Text>
                                    <Text className="text-gray-400 text-lg leading-6 text-center">
                                        Ready to collaborate? Let's create something amazing together.
                                    </Text>
                                </View>

                                {/* Email Card */}
                                <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-8 mb-8">
                                    <LinearGradient
                                        colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                        className="absolute inset-0 rounded-2xl"
                                    />

                                    <View className="relative z-10 items-center">
                                        {/* Email Icon */}
                                        <View className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full items-center justify-center mb-6">
                                            <Mail size={32} color="#ffffff" />
                                        </View>

                                        {/* Email Address */}
                                        <Text className="text-2xl font-bold text-white mb-2 text-center">
                                            Email Me
                                        </Text>
                                        <Text className="text-purple-300 text-lg mb-8 text-center">
                                            {email}
                                        </Text>

                                        {/* Action Buttons */}
                                        <View className="flex-row space-x-4 w-full">
                                            {/* Send Email Button */}
                                            <Pressable
                                                onPress={openEmail}
                                                className="flex-1"
                                            >
                                                <LinearGradient
                                                    colors={['#8b5cf6', '#7c3aed']}
                                                    className="flex-row items-center justify-center px-6 py-4 rounded-xl"
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                >
                                                    <ExternalLink size={20} color="#ffffff" />
                                                    <Text className="text-white font-semibold ml-2">
                                                        Send Email
                                                    </Text>
                                                </LinearGradient>
                                            </Pressable>

                                            {/* Copy Email Button */}
                                            <Pressable
                                                onPress={copyEmail}
                                                className="flex-1"
                                            >
                                                <View className="flex-row items-center justify-center px-6 py-4 rounded-xl border border-purple-500/50 bg-purple-500/10">
                                                    <Copy size={20} color="#a855f7" />
                                                    <Text className="text-purple-300 font-semibold ml-2">
                                                        Copy
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>

                                {/* Additional Info */}
                                <View className="bg-gray-900/30 border border-gray-600/50 rounded-2xl p-6">
                                    <Text className="text-gray-300 text-center text-base leading-6">
                                        I'm always excited to discuss new opportunities, collaborations, or just chat about technology and development. 
                                        Feel free to reach out anytime!
                                    </Text>
                                </View>

                                {/* Footer */}
                                <View className="mt-8">
                                    <LinearGradient
                                        colors={['transparent', 'rgba(168, 85, 247, 0.1)', 'transparent']}
                                        className="h-px w-full mb-6"
                                    />
                                    <Text className="text-center text-gray-500 text-sm">
                                        Looking forward to hearing from you! 🚀
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.ScrollView>
                </SafeAreaView>
            </View>
        </AnimatedScreenWrapper>
    );
}

import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Code, Briefcase, Award, MessageSquare, GraduationCap, Mail } from 'lucide-react-native';
import BlackHoleEffect from '@/components/BlackHoleEffect';
import CosmicParticles from '@/components/CosmicParticles';

const { width, height } = Dimensions.get('window');

export default function IndexScreen() {
    const router = useRouter();
    const scrollY = useSharedValue(0);
    const pulseScale = useSharedValue(1);
    
    const isMobile = width < 768;

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Pulse animation for the main title
    React.useEffect(() => {
        pulseScale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 2000 }),
                withTiming(1, { duration: 2000 })
            ),
            -1,
            true
        );
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    const navigationItems = [
        { id: 'aboutme', label: 'About Me', icon: Award, color: ['#8b5cf6', '#7c3aed'] },
        { id: 'workexp', label: 'Work Experience', icon: Briefcase, color: ['#3b82f6', '#1d4ed8'] },
        { id: 'internship', label: 'Internships', icon: GraduationCap, color: ['#10b981', '#059669'] },
        { id: 'projects', label: 'Projects', icon: Code, color: ['#f59e0b', '#d97706'] },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, color: ['#ef4444', '#dc2626'] },
        { id: 'contact', label: 'Contact', icon: Mail, color: ['#ec4899', '#db2777'] },
    ];

    const handleNavigation = (route: string) => {
        router.push(`/(tabs)/${route}` as any);
    };

    if (!isMobile) {
        // Desktop version - keep the BlackHole effect
        return (
            <View className="flex-1">
                <BlackHoleEffect />
            </View>
        );
    }

    // Mobile version - new design
    return (
        <View className="flex-1 bg-black">
            <CosmicParticles particleCount={30} />
            
            {/* Stars Background */}
            <View className="absolute inset-0">
                {[...Array(60)].map((_, i) => (
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
                    contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}
                >
                    <View className="px-6">
                        {/* Hero Section */}
                        <View className="items-center mb-12">
                            <Animated.View style={pulseStyle} className="items-center">
                                <Text className="text-5xl font-bold text-center mb-4">
                                    <Text className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                        Dab07
                                    </Text>
                                </Text>
                                <Text className="text-xl text-gray-300 text-center mb-2">
                                    Full-Stack Developer
                                </Text>
                                <Text className="text-base text-gray-400 text-center leading-6">
                                    Passionate about creating innovative solutions with modern technologies
                                </Text>
                            </Animated.View>
                        </View>

                        {/* Navigation Grid */}
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-white mb-6 text-center">
                                Explore My Portfolio
                            </Text>
                            
                            <View className="flex-row flex-wrap justify-center gap-4">
                                {navigationItems.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => handleNavigation(item.id)}
                                            className="w-[45%] mb-4"
                                        >
                                            <LinearGradient
                                                colors={item.color as [string, string]}
                                                className="p-6 rounded-2xl items-center"
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                            >
                                                <IconComponent size={32} color="#ffffff" />
                                                <Text className="text-white font-semibold text-center mt-3 text-sm">
                                                    {item.label}
                                                </Text>
                                            </LinearGradient>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-6 mb-8">
                            <LinearGradient
                                colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                className="absolute inset-0 rounded-2xl"
                            />
                            
                            <View className="relative z-10">
                                <Text className="text-xl font-bold text-white mb-4 text-center">
                                    Quick Overview
                                </Text>
                                
                                <View className="flex-row justify-around">
                                    <View className="items-center">
                                        <Text className="text-2xl font-bold text-purple-400">3+</Text>
                                        <Text className="text-gray-400 text-xs text-center">Years Experience</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-2xl font-bold text-pink-400">10+</Text>
                                        <Text className="text-gray-400 text-xs text-center">Projects</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-2xl font-bold text-cyan-400">5+</Text>
                                        <Text className="text-gray-400 text-xs text-center">Technologies</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Call to Action */}
                        <View className="items-center">
                            <Pressable
                                onPress={() => handleNavigation('contact')}
                                className="w-full"
                            >
                                <LinearGradient
                                    colors={['#8b5cf6', '#7c3aed']}
                                    className="flex-row items-center justify-center px-8 py-4 rounded-xl"
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Mail size={20} color="#ffffff" />
                                    <Text className="text-white font-bold ml-2 text-lg">
                                        Let's Work Together
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        {/* Footer */}
                        <View className="mt-8">
                            <LinearGradient
                                colors={['transparent', 'rgba(168, 85, 247, 0.1)', 'transparent']}
                                className="h-px w-full mb-4"
                            />
                            <Text className="text-center text-gray-500 text-sm">
                                Swipe up to explore my journey 🚀
                            </Text>
                        </View>
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        </View>
    );
}   
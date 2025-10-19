import React, { useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    useAnimatedReaction,
} from 'react-native-reanimated';
import { Menu, X, Mail, Home } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface FloatingNavBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
    scrollY?: Animated.SharedValue<number>;
}

const navItems = [
    { id: 'workexp', label: 'Work Experience' },
    { id: 'internship', label: 'Internships' },
    { id: 'projects', label: 'Projects' },
    { id: 'aboutme', label: 'About Me' },
    { id: 'testimonials', label: 'Testimonials' }
];

export default function FloatingNavBar({ activeTab, onTabPress, scrollY }: FloatingNavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [contactPressed, setContactPressed] = useState(false);

    const navOpacity = useSharedValue(1);
    const navTranslateY = useSharedValue(0);
    const menuScale = useSharedValue(0);
    const menuOpacity = useSharedValue(0);
    const contactScale = useSharedValue(1);

    // Handle scroll-based visibility
    useAnimatedReaction(
        () => scrollY?.value,
        (currentScrollY, previousScrollY) => {
            if (currentScrollY == null || previousScrollY == null) return;

            const isScrollingDown = currentScrollY > previousScrollY;
            const shouldHide = isScrollingDown && currentScrollY > 100;

            navOpacity.value = withTiming(!shouldHide ? 1 : 0.8, { duration: 300 });
            navTranslateY.value = withTiming(!shouldHide ? 0 : -10, { duration: 300 });
        },
        [scrollY]
    );

    const toggleMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);

        menuScale.value = withSpring(newState ? 1 : 0, {
            damping: 15,
            stiffness: 200,
        });
        menuOpacity.value = withTiming(newState ? 1 : 0, { duration: 200 });
    };

    const handleTabPress = (tabId: string) => {
        onTabPress(tabId);
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const handleContactPress = () => {
        setContactPressed(true);
        contactScale.value = withSpring(0.95, { damping: 15, stiffness: 300 });

        setTimeout(() => {
            contactScale.value = withSpring(1, { damping: 15, stiffness: 300 });
            setContactPressed(false);
            onTabPress('contact');
        }, 150);
    };

    const navAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: navOpacity.value,
            transform: [{ translateY: navTranslateY.value }],
        };
    });

    const menuAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: menuOpacity.value,
            transform: [{ scale: menuScale.value }],
        };
    });

    const contactAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: contactScale.value }],
        };
    });

    const isMobile = width < 768;

    return (
        <>
            <Animated.View 
                style={navAnimatedStyle}
                className="absolute top-0 left-0 right-0 z-50"
            >
                <SafeAreaView edges={['top']} className="bg-transparent">
                    {!isMobile && (
                        <View className="flex-1 flex-row justify-between items-center px-6 py-4">
                            {/* Logo */}
                            <Pressable 
                                onPress={() => handleTabPress('index')}
                                className="flex-shrink-0"
                            >
                                <Text className="text-5xl font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                                    Dab07
                                </Text>
                            </Pressable>
                            
                            {/* Navigation Items */}
                            <View className="flex-row items-center space-x-8">
                                {navItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => handleTabPress(item.id)}
                                            className={`px-4 py-2 rounded-lg transition-colors ${
                                                isActive ? 'bg-purple-500/20' : 'hover:bg-white/10'
                                            }`}
                                        >
                                            <Text className={`text-lg font-medium ${
                                                isActive ? 'text-purple-300' : 'text-white'
                                            }`}>
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                            
                            {/* Contact Button */}
                            <Animated.View style={contactAnimatedStyle} className="flex-shrink-0">
                                <Pressable onPress={handleContactPress}>
                                    <LinearGradient
                                        colors={contactPressed ? ['#7c3aed', '#5b21b6'] : ['#8b5cf6', '#7c3aed']}
                                        className="flex-row items-center px-6 py-3 rounded-full shadow-lg"
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Mail size={18} color="#ffffff" />
                                        <Text className="text-white font-semibold ml-2">Contact Me</Text>
                                    </LinearGradient>
                                </Pressable>
                            </Animated.View>
                        </View>
                    )}

                    {/* Mobile Navigation */}
                    {isMobile && (
                        <View className="flex-row items-center justify-between px-4 py-3">
                            {/* Mobile Logo */}
                            <View className="flex-row items-center space-x-3">
                                <LinearGradient
                                    colors={['#3b82f6', '#1d4ed8']}
                                    className="w-9 h-9 rounded-full items-center justify-center"
                                >
                                    <Home size={18} color="#ffffff" />
                                </LinearGradient>
                                <Text className="text-lg font-bold text-gray-900">Portfolio</Text>
                            </View>

                            {/* Mobile Menu Button */}
                            <Pressable onPress={toggleMenu} className="rounded-xl overflow-hidden">
                                <LinearGradient
                                    colors={isMenuOpen ? ['#ef4444', '#dc2626'] : ['#3b82f6', '#1d4ed8']}
                                    className="w-11 h-11 items-center justify-center"
                                >
                                    {isMenuOpen ? (
                                        <X size={20} color="#ffffff" />
                                    ) : (
                                        <Menu size={20} color="#ffffff" />
                                    )}
                                </LinearGradient>
                            </Pressable>
                        </View>
                    )}
                </SafeAreaView>
            </Animated.View>

            {/* Mobile Menu Overlay */}
            {isMobile && isMenuOpen && (
                <Animated.View 
                    style={menuAnimatedStyle}
                    className="absolute top-0 left-0 right-0 bottom-0 z-40 bg-black/50"
                >
                    <View className="pt-28 px-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.id;

                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => handleTabPress(item.id)}
                                    className="relative overflow-hidden rounded-2xl"
                                >
                                    {isActive && (
                                        <LinearGradient
                                            colors={['rgba(59, 130, 246, 0.1)', 'rgba(29, 78, 216, 0.1)']}
                                            className="absolute inset-0"
                                        />
                                    )}
                                    <View className="flex-row items-center px-5 py-4 space-x-4">
                                        <Text className={`text-lg font-semibold ${
                                            isActive ? 'text-blue-400' : 'text-gray-300'
                                        }`}>
                                            {item.label}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}

                        {/* Contact Me Button for Mobile */}
                        <View className="mt-6">
                            <Pressable onPress={handleContactPress} className="rounded-2xl overflow-hidden">
                                <LinearGradient
                                    colors={['#8b5cf6', '#7c3aed']}
                                    className="flex-row items-center justify-center px-5 py-4 space-x-4"
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Mail size={20} color="#ffffff" />
                                    <Text className="text-white text-lg font-semibold">Contact Me</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </View>
                </Animated.View>
            )}
        </>
    );
}



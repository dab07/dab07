import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS, useAnimatedReaction,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Menu, X, User, Code, Award, Mail, Home } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface FloatingNavBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
    scrollY?: Animated.SharedValue<number>;
}

const navItems = [
    { id: 'index', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export default function FloatingNavBar({ activeTab, onTabPress, scrollY }: FloatingNavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navOpacity = useSharedValue(1);
    const navTranslateY = useSharedValue(0);
    const menuScale = useSharedValue(0);
    const menuOpacity = useSharedValue(0);

    // Handle scroll-based visibility
    useAnimatedReaction(
        () => scrollY?.value,
        (currentScrollY, previousScrollY) => {
            if (currentScrollY == null || previousScrollY == null) return;

            const isScrollingDown = currentScrollY > previousScrollY;
            const shouldHide = isScrollingDown && currentScrollY > 100;

            runOnJS(setIsVisible)(!shouldHide);
            navOpacity.value = withTiming(!shouldHide ? 1 : 0.8, { duration: 300 });
            navTranslateY.value = withTiming(!shouldHide ? 0 : -10, { duration: 300 });

            runOnJS(setLastScrollY)(currentScrollY);
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

    const isTablet = width >= 768;
    const isMobile = width < 768;

    return (
        <>
            <Animated.View style={[styles.navContainer, navAnimatedStyle]}>
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    <BlurView intensity={80} tint="light" style={styles.blurContainer}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                            style={styles.navContent}
                        >
                            {/* Desktop Navigation */}
                            {!isMobile && (
                                <View style={styles.desktopNav}>
                                    <View style={styles.logoContainer}>
                                        <LinearGradient
                                            colors={['#3b82f6', '#1d4ed8']}
                                            style={styles.logoGradient}
                                        >
                                            <Home size={20} color="#ffffff" />
                                        </LinearGradient>
                                        <Text style={styles.logoText}>Portfolio</Text>
                                    </View>

                                    <View style={styles.navItems}>
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = activeTab === item.id;

                                            return (
                                                <Pressable
                                                    key={item.id}
                                                    style={[styles.navItem, isActive && styles.navItemActive]}
                                                    onPress={() => handleTabPress(item.id)}
                                                >
                                                    {isActive && (
                                                        <LinearGradient
                                                            colors={['rgba(59, 130, 246, 0.1)', 'rgba(29, 78, 216, 0.1)']}
                                                            style={styles.activeBackground}
                                                        />
                                                    )}
                                                    <Icon
                                                        size={18}
                                                        color={isActive ? '#3b82f6' : '#6b7280'}
                                                    />
                                                    <Text style={[
                                                        styles.navItemText,
                                                        isActive && styles.navItemTextActive
                                                    ]}>
                                                        {item.label}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}

                            {/* Mobile Navigation */}
                            {isMobile && (
                                <View style={styles.mobileNav}>
                                    <View style={styles.logoContainer}>
                                        <LinearGradient
                                            colors={['#3b82f6', '#1d4ed8']}
                                            style={styles.logoGradient}
                                        >
                                            <Home size={18} color="#ffffff" />
                                        </LinearGradient>
                                        <Text style={styles.logoTextMobile}>Portfolio</Text>
                                    </View>

                                    <Pressable style={styles.menuButton} onPress={toggleMenu}>
                                        <LinearGradient
                                            colors={isMenuOpen ? ['#ef4444', '#dc2626'] : ['#3b82f6', '#1d4ed8']}
                                            style={styles.menuButtonGradient}
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
                        </LinearGradient>
                    </BlurView>
                </SafeAreaView>
            </Animated.View>

            {/* Mobile Menu Overlay */}
            {isMobile && isMenuOpen && (
                <Animated.View style={[styles.menuOverlay, menuAnimatedStyle]}>
                    <BlurView intensity={100} tint="light" style={styles.menuBlur}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']}
                            style={styles.menuContent}
                        >
                            <View style={styles.menuItems}>
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;

                                    return (
                                        <Pressable
                                            key={item.id}
                                            style={[styles.menuItem, isActive && styles.menuItemActive]}
                                            onPress={() => handleTabPress(item.id)}
                                        >
                                            {isActive && (
                                                <LinearGradient
                                                    colors={['rgba(59, 130, 246, 0.1)', 'rgba(29, 78, 216, 0.1)']}
                                                    style={styles.menuItemBackground}
                                                />
                                            )}
                                            <Icon
                                                size={24}
                                                color={isActive ? '#3b82f6' : '#6b7280'}
                                            />
                                            <Text style={[
                                                styles.menuItemText,
                                                isActive && styles.menuItemTextActive
                                            ]}>
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </LinearGradient>
                    </BlurView>
                </Animated.View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        elevation: 10,
    },
    safeArea: {
        backgroundColor: 'transparent',
    },
    blurContainer: {
        borderRadius: 0,
        overflow: 'hidden',
    },
    navContent: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    desktopNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mobileNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoGradient: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: '#1f2937',
    },
    logoTextMobile: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1f2937',
    },
    navItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    navItemActive: {
        // Active styles handled by gradient background
    },
    activeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 12,
    },
    navItemText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#6b7280',
    },
    navItemTextActive: {
        color: '#3b82f6',
    },
    menuButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuButtonGradient: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    menuBlur: {
        flex: 1,
    },
    menuContent: {
        flex: 1,
        paddingTop: 120,
        paddingHorizontal: 20,
    },
    menuItems: {
        gap: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    menuItemActive: {
        // Active styles handled by gradient background
    },
    menuItemBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
    },
    menuItemText: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#6b7280',
    },
    menuItemTextActive: {
        color: '#3b82f6',
    },
});

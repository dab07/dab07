import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
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
    { id : 'workex', label: 'Work Experience' },
    { id: 'internship', label: 'Internships' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'testimonials', label:'Testimonials' }
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
            <Animated.View style={[styles.navContainer, navAnimatedStyle]}>
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    {!isMobile && (
                        <View className='flex-1 flex-row justify-between'>
                            <Pressable onPress={() => handleTabPress('index')}>
                                <Text className="text-6xl font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient-x m-4">Dab07</Text>
                            </Pressable>
                            <View className='flex-row mt-4 gap-20 justify-center'>
                                {navItems.map((item) => {
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => handleTabPress(item.id)}
                                        >
                                            <Text className='text-white text-xl'>
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                            <Animated.View style={contactAnimatedStyle}>
                                <Pressable onPress={handleContactPress}>
                                    <LinearGradient
                                        colors={contactPressed ? ['#7c3aed', '#5b21b6'] : ['#8b5cf6', '#7c3aed']}
                                        style={styles.contactButton}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Mail size={18} color="#ffffff" />
                                        <Text style={styles.contactButtonText}>Contact Me</Text>
                                    </LinearGradient>
                                </Pressable>
                            </Animated.View>
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
                </SafeAreaView>
            </Animated.View>

            {/* Mobile Menu Overlay */}
            {isMobile && isMenuOpen && (
                <Animated.View style={[styles.menuOverlay, menuAnimatedStyle]}>
                    <View style={styles.menuItems}>
                        {navItems.map((item) => {
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
                                    <Text style={[
                                        styles.menuItemText,
                                        isActive && styles.menuItemTextActive
                                    ]}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}

                        {/* Contact Me Button for Mobile */}
                        <Pressable
                            style={styles.mobileContactButton}
                            onPress={handleContactPress}
                        >
                            <LinearGradient
                                colors={['#8b5cf6', '#7c3aed']}
                                style={styles.mobileContactGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Mail size={24} color="#ffffff" />
                                <Text style={styles.mobileContactText}>Contact Me</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
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
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 8,
        marginHorizontal: 12,
        shadowColor: '#8b5cf6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    mobileContactButton: {
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    mobileContactGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 16,
        shadowColor: '#8b5cf6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    mobileContactText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },
});

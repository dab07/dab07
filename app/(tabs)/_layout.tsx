import React, { useState } from 'react';
import { View } from 'react-native';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { User, Code, Mail, Award, Briefcase, GraduationCap, MessageSquare } from 'lucide-react-native';
import FloatingNavBar from '@/components/FloatingNavBar';

import { useSharedValue } from 'react-native-reanimated';
import '@/global.css';

export default function TabLayout() {
    const router = useRouter();
    const segments = useSegments();
    const [activeTab, setActiveTab] = useState('index');
    const scrollY = useSharedValue(0);

    const handleTabPress = (tabId: string) => {
        setActiveTab(tabId);

        switch (tabId) {
            case 'index':
                router.push('/(tabs)');
                break;
            case 'workexp':
                router.push('/(tabs)/workexp');
                break;
            case 'internship':
                router.push('/(tabs)/internship');
                break;
            case 'projects':
                router.push('/(tabs)/projects');
                break;
            case 'aboutme':
                router.push('/(tabs)/aboutme' as any);
                break;
            case 'testimonials':
                router.push('/(tabs)/testimonials');
                break;
            case 'contact':
                router.push('/(tabs)/contact');
                break;
            default:
                router.push('/(tabs)');
        }
    };

    // Get current active tab from segments
    React.useEffect(() => {
        const currentTab = segments[segments.length - 1] || 'index';
        setActiveTab(currentTab);
    }, [segments]);

    return (
        <View className="flex-1">
                <FloatingNavBar
                    activeTab={activeTab}
                    onTabPress={handleTabPress}
                    scrollY={scrollY}
                />

                <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        display: 'none',
                    },
                    tabBarActiveTintColor: '#3b82f6',
                    tabBarInactiveTintColor: '#6b7280',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontFamily: 'Inter-Medium',
                    },
                    animation: 'shift',
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'About',
                        tabBarIcon: ({ size, color }) => (
                            <User size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="workexp"
                    options={{
                        title: 'Work Experience',
                        tabBarIcon: ({ size, color }) => (
                            <Briefcase size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="internship"
                    options={{
                        title: 'Internship',
                        tabBarIcon: ({ size, color }) => (
                            <GraduationCap size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="projects"
                    options={{
                        title: 'Projects',
                        tabBarIcon: ({ size, color }) => (
                            <Code size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="aboutme"
                    options={{
                        title: 'About Me',
                        tabBarIcon: ({ size, color }) => (
                            <Award size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="testimonials"
                    options={{
                        title: 'Testimonials',
                        tabBarIcon: ({ size, color }) => (
                            <MessageSquare size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="contact"
                    options={{
                        title: 'Contact',
                        tabBarIcon: ({ size, color }) => (
                            <Mail size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

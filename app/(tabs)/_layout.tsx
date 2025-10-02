import React, { useState } from 'react';
import { View } from 'react-native';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { User, Code, Mail, Award } from 'lucide-react-native';
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

        // Use explicit route strings for type safety
        switch (tabId) {
            case 'index':
                router.push('/(tabs)');
                break;
            case 'projects':
                router.push('/(tabs)/projects');
                break;
            case 'skills':
                router.push('/(tabs)/skills');
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
                        display: 'none', // Hide default tab bar since we're using floating nav
                    },
                    tabBarActiveTintColor: '#3b82f6',
                    tabBarInactiveTintColor: '#6b7280',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontFamily: 'Inter-Medium',
                    },
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
                    name="projects"
                    options={{
                        title: 'Projects',
                        tabBarIcon: ({ size, color }) => (
                            <Code size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="skills"
                    options={{
                        title: 'Skills',
                        tabBarIcon: ({ size, color }) => (
                            <Award size={size} color={color} />
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

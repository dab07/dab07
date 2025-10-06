import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BlackHoleEffect from '@/components/BlackHoleEffect';
import PortfolioSection from '@/components/PortfolioSection';
import { LeetCodeStats, fetchLeetCodeStats } from '@/lib/api';
import { Trophy, TrendingUp, Code, Zap, Database, Globe, Smartphone, Layers } from 'lucide-react-native';

export default function SkillsScreen() {
    const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadLeetCodeStats();
    }, []);

    const loadLeetCodeStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const username = process.env.EXPO_PUBLIC_LEETCODE_USERNAME || 'alexthompson';
            const stats = await fetchLeetCodeStats(username);
            setLeetcodeStats(stats);
        } catch (err) {
            setError('Failed to load LeetCode stats');
            console.error('Error loading LeetCode stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const skillCategories = [
        {
            title: 'Frontend',
            icon: <Globe size={24} color="#3b82f6" />,
            skills: [
                { name: 'React/React Native', level: 95 },
                { name: 'TypeScript', level: 90 },
                { name: 'Next.js', level: 85 },
                { name: 'TailwindCSS', level: 90 },
                { name: 'Three.js', level: 75 },
            ],
        },
        {
            title: 'Backend',
            icon: <Database size={24} color="#10b981" />,
            skills: [
                { name: 'Node.js', level: 90 },
                { name: 'Python', level: 85 },
                { name: 'PostgreSQL', level: 80 },
                { name: 'GraphQL', level: 75 },
                { name: 'Docker', level: 70 },
            ],
        },
        {
            title: 'Mobile',
            icon: <Smartphone size={24} color="#8b5cf6" />,
            skills: [
                { name: 'React Native', level: 90 },
                { name: 'Expo', level: 85 },
                { name: 'iOS Development', level: 70 },
                { name: 'Android Development', level: 65 },
            ],
        },
        {
            title: 'DevOps',
            icon: <Layers size={24} color="#f59e0b" />,
            skills: [
                { name: 'AWS', level: 80 },
                { name: 'Docker', level: 75 },
                { name: 'CI/CD', level: 70 },
                { name: 'Kubernetes', level: 60 },
            ],
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return '#10b981';
            case 'medium': return '#f59e0b';
            case 'hard': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getSkillColor = (level: number) => {
        if (level >= 90) return '#10b981';
        if (level >= 80) return '#3b82f6';
        if (level >= 70) return '#8b5cf6';
        return '#f59e0b';
    };

    return (
        <View className="flex-1">

            <SafeAreaView className="flex-1" edges={['bottom']}>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 120, paddingBottom: 40 }}
                >
                    <PortfolioSection>
                        <View className="mb-8">
                            <Text className="text-4xl font-bold text-gray-900 mb-2">Skills & Expertise</Text>
                            <Text className="text-base text-gray-600">
                                My technical skills and problem-solving journey
                            </Text>
                        </View>
                    </PortfolioSection>

                    {/* LeetCode Stats Section */}
                    <PortfolioSection delay={200}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-4">LeetCode Progress</Text>

                            {loading ? (
                                <View className="p-10 items-center">
                                    <Text className="text-base text-gray-600 font-medium">Loading LeetCode stats...</Text>
                                </View>
                            ) : error ? (
                                <View className="p-10 items-center">
                                    <Text className="text-base text-red-600 font-medium mb-4 text-center">{error}</Text>
                                    <Pressable className="bg-blue-600 px-5 py-2 rounded-lg" onPress={loadLeetCodeStats}>
                                        <Text className="text-white font-semibold">Retry</Text>
                                    </Pressable>
                                </View>
                            ) : leetcodeStats ? (
                                <LinearGradient
                                    colors={['rgba(59, 130, 246, 0.1)', 'rgba(16, 185, 129, 0.1)']}
                                    className="p-5 rounded-2xl mb-5"
                                >
                                    <View className="flex-row items-center mb-5 space-x-3">
                                        <Trophy size={24} color="#fbbf24" />
                                        <Text className="text-xl font-bold text-gray-900">Problem Solving Stats</Text>
                                    </View>

                                    <View className="flex-row justify-around mb-5">
                                        <View className="items-center">
                                            <Text className="text-3xl font-bold text-blue-600">{leetcodeStats.totalSolved}</Text>
                                            <Text className="text-sm text-gray-600 font-medium">Total Solved</Text>
                                        </View>
                                        <View className="items-center">
                                            <Text className="text-3xl font-bold text-blue-600">{leetcodeStats.ranking}</Text>
                                            <Text className="text-sm text-gray-600 font-medium">Ranking</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row justify-around">
                                        <View className="flex-row items-center space-x-2">
                                            <View className="w-2 h-2 rounded-full bg-green-500" />
                                            <Text className="text-sm text-gray-700 font-medium">Easy: {leetcodeStats.easySolved}</Text>
                                        </View>
                                        <View className="flex-row items-center space-x-2">
                                            <View className="w-2 h-2 rounded-full bg-yellow-500" />
                                            <Text className="text-sm text-gray-700 font-medium">Medium: {leetcodeStats.mediumSolved}</Text>
                                        </View>
                                        <View className="flex-row items-center space-x-2">
                                            <View className="w-2 h-2 rounded-full bg-red-500" />
                                            <Text className="text-sm text-gray-700 font-medium">Hard: {leetcodeStats.hardSolved}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            ) : null}
                        </View>
                    </PortfolioSection>

                    {/* Skills Categories */}
                    {skillCategories.map((category, categoryIndex) => (
                        <PortfolioSection key={category.title} delay={400 + categoryIndex * 100}>
                            <View className="mb-8">
                                <View className="flex-row items-center mb-4 space-x-3">
                                    {category.icon}
                                    <Text className="text-xl font-bold text-gray-900">{category.title}</Text>
                                </View>

                                <View className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <View key={skill.name} className="bg-white/80 p-4 rounded-xl">
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className="text-base font-semibold text-gray-900">{skill.name}</Text>
                                                <Text className="text-sm font-medium text-gray-600">{skill.level}%</Text>
                                            </View>
                                            <View className="h-1.5 bg-gray-200 rounded-full">
                                                <View
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${skill.level}%`,
                                                        backgroundColor: getSkillColor(skill.level)
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </PortfolioSection>
                    ))}

                    {/* Certifications & Achievements */}
                    <PortfolioSection delay={800}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-6">Certifications & Achievements</Text>

                            <View className="space-y-4">
                                <View className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4">
                                    <TrendingUp size={20} color="#3b82f6" />
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900 mb-1">AWS Solutions Architect</Text>
                                        <Text className="text-sm text-gray-600">Associate Level Certification</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4">
                                    <Code size={20} color="#10b981" />
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900 mb-1">React Native Certified</Text>
                                        <Text className="text-sm text-gray-600">Meta React Native Certification</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4">
                                    <Zap size={20} color="#f59e0b" />
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900 mb-1">Top 10% on LeetCode</Text>
                                        <Text className="text-sm text-gray-600">Consistent problem solver</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </PortfolioSection>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

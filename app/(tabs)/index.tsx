import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BlackHoleEffect from '@/components/BlackHoleEffect';
import PortfolioSection from '@/components/PortfolioSection';
import { MapPin, Calendar, Coffee, Award, Users, Zap } from 'lucide-react-native';

export default function AboutScreen() {
    return (
        <View className="flex-1 bg-gray-900">
            <BlackHoleEffect />

            <SafeAreaView className="flex-1" edges={['bottom']}>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 120, paddingBottom: 40 }}
                >
                    <PortfolioSection>
                        <View className="items-center mb-10">
                            <LinearGradient
                                colors={['rgba(139, 92, 246, 0.2)', 'rgba(168, 85, 247, 0.1)']}
                                className="w-full p-10 rounded-3xl items-center dark-card"
                            >
                                <View className="w-32 h-32 rounded-full mb-6 overflow-hidden border-4 border-purple-400/50 glow-purple">
                                    <Image
                                        source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text className="text-lg text-gray-400 font-medium mb-2">Hello, I'm</Text>
                                <Text className="text-5xl font-bold text-gray-100 mb-2 text-center">Alex Thompson</Text>
                                <Text className="text-xl gradient-text font-semibold mb-4">Full Stack Developer</Text>
                                <Text className="text-base text-gray-300 text-center leading-6 max-w-sm">
                                    Crafting digital experiences with passion and precision
                                </Text>
                            </LinearGradient>
                        </View>
                    </PortfolioSection>

                    <PortfolioSection delay={200}>
                        <View className="mb-10">
                            <Text className="text-3xl font-bold text-gray-100 mb-4">About Me</Text>
                            <Text className="text-base text-gray-300 leading-7 mb-6">
                                I'm a passionate full-stack developer with 5+ years of experience
                                building scalable web applications and mobile apps. I specialize in
                                React, Node.js, and modern JavaScript technologies, with a keen eye
                                for creating intuitive user experiences.
                            </Text>

                            <View className="space-y-4">
                                <View className="flex-row items-center space-x-3">
                                    <MapPin size={20} color="#3b82f6" />
                                    <Text className="text-base text-gray-300 font-medium">San Francisco, CA</Text>
                                </View>
                                <View className="flex-row items-center space-x-3">
                                    <Calendar size={20} color="#8B5CF6" />
                                    <Text className="text-base text-gray-300 font-medium">5+ Years Experience</Text>
                                </View>
                                <View className="flex-row items-center space-x-3">
                                    <Coffee size={20} color="#8B5CF6" />
                                    <Text className="text-base text-gray-300 font-medium">Coffee Enthusiast</Text>
                                </View>
                            </View>
                        </View>
                    </PortfolioSection>

                    <PortfolioSection delay={300}>
                        <View className="mb-10">
                            <Text className="text-3xl font-bold text-gray-100 mb-6">What I Do</Text>
                            <View className="space-y-4">
                                <View className="dark-card p-5 rounded-2xl flex-row items-start space-x-4">
                                    <View className="w-12 h-12 bg-purple-900/50 rounded-xl items-center justify-center">
                                        <Zap size={24} color="#8B5CF6" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Frontend Development</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Creating responsive, interactive user interfaces with React, React Native, and modern CSS frameworks.
                                        </Text>
                                    </View>
                                </View>

                                <View className="dark-card p-5 rounded-2xl flex-row items-start space-x-4">
                                    <View className="w-12 h-12 bg-purple-900/50 rounded-xl items-center justify-center">
                                        <Award size={24} color="#A855F7" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Backend Development</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Building scalable APIs and server-side applications with Node.js, Python, and cloud technologies.
                                        </Text>
                                    </View>
                                </View>

                                <View className="dark-card p-5 rounded-2xl flex-row items-start space-x-4">
                                    <View className="w-12 h-12 bg-purple-900/50 rounded-xl items-center justify-center">
                                        <Users size={24} color="#C084FC" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Team Leadership</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Leading development teams and mentoring junior developers to deliver high-quality solutions.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </PortfolioSection>

                    <PortfolioSection delay={400}>
                        <View className="mb-10">
                            <Text className="text-3xl font-bold text-gray-100 mb-4">Philosophy</Text>
                            <View className="dark-card p-6 rounded-2xl glow-purple">
                                <Text className="text-lg text-gray-200 font-medium italic text-center leading-8">
                                    "Code is like poetry - it should be elegant, purposeful, and
                                    tell a story. Every line should have intention, every function
                                    should serve a purpose, and every project should make a difference."
                                </Text>
                            </View>
                        </View>
                    </PortfolioSection>

                    <PortfolioSection delay={600}>
                        <View className="mb-10">
                            <Text className="text-3xl font-bold text-gray-100 mb-6">My Journey</Text>
                            <View className="pl-5">
                                <View className="flex-row mb-8 items-start">
                                    <View className="w-3 h-3 rounded-full bg-purple-500 mr-5 mt-1.5" />
                                    <View className="flex-1">
                                        <Text className="text-sm text-purple-400 font-semibold mb-1">2024</Text>
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Senior Full Stack Developer</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Leading development of scalable web applications and mentoring junior developers
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row mb-8 items-start">
                                    <View className="w-3 h-3 rounded-full bg-purple-500 mr-5 mt-1.5" />
                                    <View className="flex-1">
                                        <Text className="text-sm text-purple-400 font-semibold mb-1">2022</Text>
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Full Stack Developer</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Built modern React applications with Node.js backends and cloud infrastructure
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row mb-8 items-start">
                                    <View className="w-3 h-3 rounded-full bg-purple-500 mr-5 mt-1.5" />
                                    <View className="flex-1">
                                        <Text className="text-sm text-purple-400 font-semibold mb-1">2019</Text>
                                        <Text className="text-lg font-semibold text-gray-100 mb-2">Frontend Developer</Text>
                                        <Text className="text-sm text-gray-300 leading-5">
                                            Started my journey with React and modern web technologies
                                        </Text>
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

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import CosmicParticles from '@/components/CosmicParticles';

import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';

interface InternshipItem {
  date: string;
  title: string;
  location: string;
  description: string[];
}

interface InternshipGroup {
  company: string;
  id: InternshipItem[];
}

const internshipData: InternshipGroup[] = [
  {
    company: "IBM",
    id: [
      {
        date: "Jun 2023 - Jul 2023",
        title: "Data Analyst Intern",
        location: "Remote, Bangalore, India",
        description: [
          "• Developed an XGBoost-based fraud detection model with 99.42% precision.",
          "• Improved model accuracy on imbalanced datasets using SMOTE and ADASYN."
        ],
      },
    ],
  },
  {
    company: "Traivis",
    id: [
      {
        date: "Oct 2022 - Mar 2023",
        title: "AI Developer (Intern)",
        location: "Remote, London, United Kingdom",
        description: [
          "• Formulated speech-to-text algorithm with sentiment analysis, improving transcription accuracy by 30%.",
          "• Created ML model integrating audio transformers and facial analysis, increasing sentiment prediction accuracy by 25%.",
          "• Optimized video analysis algorithm, reducing processing time by 40% and enabling real-time sentiment tracking."
        ],
      },
    ],
  },
  {
    company: "Sugar.Fit",
    id: [
      {
        date: "Jun 2022 - Jul 2022",
        title: "Software Engineering Intern",
        location: "Remote, Bangalore, India",
        description: [
          "• Developed core Ultrafit NFC feature for scanning glucose data from Abott Freestyle Libre.",
          "• Reverse-engineered CGM device activation algorithms with 98% code reusability.",
          "• Contributed to launch achieving 10,000+ users in first month."
        ],
      },
    ],
  },
];

export default function IntershipScreen() {
    const scrollY = useSharedValue(0);


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });



    return (
        <AnimatedScreenWrapper screenName="internship">
            <View className="flex-1 bg-black">
                <CosmicParticles particleCount={25} />
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

            <SafeAreaView className="flex-1">
                <Animated.ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingTop: 100, paddingBottom: 60, flexDirection: 'column-reverse' }}
                >
                    <View className="px-4 relative">
                        {/* Timeline line centered */}
                        <View className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] overflow-hidden">
                            <LinearGradient
                                colors={['#3B82F6', '#8B5CF6', '#EC4899']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{ flex: 1 }}
                            />
                        </View>

                        {/* Start at bottom */}

                        {internshipData.map((group, groupIndex) => {
                            const isRight = groupIndex % 2 === 0;

                            return (
                                <View key={groupIndex} className="relative mb-12">
                                    {/* Timeline dot at company level */}
                                    <View className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 border-4 border-[#050510] -ml-2 shadow-[0_0_15px_#8B5CF6] z-20" />
                                    
                                    {/* Single bordered container per company */}
                                    <View
                                        className={`w-[45%] bg-[#11121A] rounded-2xl border border-gray-700 p-6 shadow-lg ${
                                            isRight ? 'ml-auto mr-4' : 'mr-auto ml-4'
                                        }`}
                                    >
                                        {/* Company name almost touching the line */}
                                        <View className={`flex-row mb-4 ${isRight ? 'justify-start' : 'justify-end'}`}>
                                            <Text className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                                {group.company}
                                            </Text>
                                        </View>

                                        {/* Roles stacked vertically with small gap */}
                                        {group.id.map((item, index) => (
                                            <View key={index} className="mb-4 last:mb-0">
                                                <Text className="text-sm text-gray-400 mb-1">
                                                    {item.date}
                                                </Text>
                                                <Text className="text-lg font-semibold text-blue-400 mb-1">
                                                    {item.title}
                                                </Text>
                                                <Text className="text-sm text-gray-300 mb-2">
                                                    {item.location}
                                                </Text>

                                                {item.description.map((line, i) => (
                                                    <Text
                                                        key={i}
                                                        className="text-gray-400 text-sm leading-5 mb-1"
                                                    >
                                                        {line}
                                                    </Text>
                                                ))}
                                                
                                                {/* Add separator between roles except for last one */}
                                                {index < group.id.length - 1 && (
                                                    <View className="h-px bg-gray-600 mt-3" />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </Animated.ScrollView>
            <Text className='text-center text-4xl text-yellow-200 p-4 mt-8'>Start</Text>    
            </SafeAreaView>
        </View>
        </AnimatedScreenWrapper>
    );
}
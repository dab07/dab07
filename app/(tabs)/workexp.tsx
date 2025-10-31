import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import CosmicParticles from '@/components/CosmicParticles';

import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';

interface WorkItem {
  date: string;
  title: string;
  location: string;
  description: string[];
}

interface WorkGroup {
  company: string;
  id: WorkItem[];
}

const workData: WorkGroup[] = [
  {
    company: 'Tata Technologies',
    id: [
      {
        date: 'Aug 2024 - Jul 2025',
        title: 'Graduate Engineer Trainee',
        location: 'Pune, India',
        description: [
          'Assisted in MBSE tool development and workflow enhancement within Polarion',
          'Enhanced process compliance and lifecycle management efficiency through tailored ALM (Application Lifecycle Management) workflows.',
        ],
      },
      {
        date: 'Aug 2025 - Present',
        title: 'Solution Developer',
        location: 'Pune, India',
        description: [
          'Collaborating in the MBSE consulting domain to design and optimize As-Is and To-Be process architectures, ensuring tool alignment with customer objectives.',
          'Delivered data-driven process visualizations and graphical analyses in PowerPoint and Excel, enabling stakeholders to identify optimal tool chains and integration paths.',
          'Prepared detailed Tool Landscape analyses and comparison matrices to evaluate tool suitability across enterprise workflows.',
          'Contributed to documentation such as MoMs and technical summaries to support decision-making across engineering teams.',
        ],
      },
    ],
  },
];

export default function WorkExpScreen() {

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });



  return (
    <AnimatedScreenWrapper screenName="workexp">
      <View className="flex-1 bg-[#050510] bottom-0">
        <CosmicParticles particleCount={50} />

        {/* Star background */}
        <View className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <View
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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
                  start={{ x: 0, y: -1 }}
                  end={{ x: 0, y: 1 }}
                  style={{ flex: 1 }}
                />
              </View>
              {workData.map((group, groupIndex) => {
                const isRight = groupIndex % 2 === 0;

                return (
                  <View key={groupIndex} className="relative mb-12">
                    {/* Timeline Dot*/}
                    <View className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 border-4 border-[#050510] -ml-2 shadow-[0_0_15px_#ffffff] z-20" />

                    {/* Single bordered container per company */}
                    <View
                      className={`w-[45%] bg-[#11121A] rounded-2xl border border-gray-700 p-6 shadow-lg ${isRight ? 'ml-auto mr-4' : 'mr-auto ml-4'
                        }`}
                    >
                      <View className={`flex-row mb-4 ${isRight ? 'justify-start' : 'justify-end'}`}>
                        <Text className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                          {group.company}
                        </Text>
                      </View>

                      {group.id.slice().reverse().map((item, index) => (
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
                              • {line}
                            </Text>
                          ))}
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
        {/* <Text className='text-center text-4xl text-yellow-200 p-4 mt-8'>Start</Text> */}
      </View>
    </AnimatedScreenWrapper>
  );
}

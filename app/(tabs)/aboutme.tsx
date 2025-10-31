import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Linking, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import { LinkedIn, GitHubLight, Java, TypeScript, NextJs, NodeJs, ExpressJsLight, TailwindCSS, React as ReactIcon, HTML5, CSS3, MySQL, MongoDB, PostgreSQL, Docker } from 'developer-icons'
import CosmicParticles from '@/components/CosmicParticles';

import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';

interface SkillItem {
    name: string;
    url: string;
    icon?: React.ComponentType<any> | null;
    customIcon?: React.ReactElement;
}

interface LeetCodeStats {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    ranking: number;
    acceptanceRate: number;
    contributionPoints: number;
}

interface LeetCodeApiResponse {
    status: string;
    message: string;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    ranking: number;
    acceptanceRate: number;
    contributionPoints: number;
}

export default function AboutMeScreen() {
    const scrollY = useSharedValue(0);

    const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState<string | null>(null);

    const { width } = Dimensions.get('window');
    const isTablet = width > 768;
    const containerWidth = isTablet ? '60%' : '90%';
    const leetcodeUsername = 'Dab07';

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Fetch LeetCode stats from API
    const fetchLeetCodeStats = async () => {
        try {
            setStatsLoading(true);
            setStatsError(null);

            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: LeetCodeApiResponse = await response.json();

            if (data.status === 'success') {
                const stats: LeetCodeStats = {
                    totalSolved: data.totalSolved,
                    totalQuestions: data.totalQuestions,
                    easySolved: data.easySolved,
                    totalEasy: data.totalEasy,
                    mediumSolved: data.mediumSolved,
                    totalMedium: data.totalMedium,
                    hardSolved: data.hardSolved,
                    totalHard: data.totalHard,
                    ranking: data.ranking,
                    acceptanceRate: data.acceptanceRate,
                    contributionPoints: data.contributionPoints
                };

                setLeetcodeStats(stats);
            } else {
                throw new Error(data.message || 'Failed to fetch stats');
            }
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
            setStatsError(error instanceof Error ? error.message : 'Failed to fetch stats');

            // Fallback to mock data if API fails
            setLeetcodeStats({
                totalSolved: 150,
                totalQuestions: 3000,
                easySolved: 65,
                totalEasy: 800,
                mediumSolved: 70,
                totalMedium: 1600,
                hardSolved: 15,
                totalHard: 600,
                ranking: 125000,
                acceptanceRate: 85.5,
                contributionPoints: 1250
            });
        } finally {
            setStatsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeetCodeStats();
    }, []);

    const professionalSummary = `Computer Science graduate from UPES with a strong foundation in Full-Stack AI Development. Passionate about building modern, user-focused web and mobile applications from the ground up. I stay constantly updated with emerging technologies, exploring new tools and frameworks to craft scalable, high-performance solutions. Driven by curiosity and problem-solving, I aim to engineer impactful digital experiences that blend performance, design, and innovation.`;

    const skills: SkillItem[] = [
        { name: 'Java', icon: Java, url: 'https://www.oracle.com/java/' },
        { name: 'TypeScript', icon: TypeScript, url: 'https://www.typescriptlang.org/' },
        { name: 'TailwindCSS', icon: TailwindCSS, url: 'https://tailwindcss.com/' },
        { name: 'HTML5', icon: HTML5, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'CSS3', icon: CSS3, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        { name: 'NextJs', icon: NextJs, url: 'https://nextjs.org/' },
        { name: 'NodeJs', icon: NodeJs, url: 'https://nodejs.org/' },
        { name: 'Express', icon: ExpressJsLight, url: 'https://expressjs.com/' },
        { name: 'React', icon: ReactIcon, url: 'https://react.dev/' },
        {
            name: 'Expo',
            icon: null,
            url: 'https://expo.dev/',
            customIcon: (
                <Image
                    source={require('@/icons/logo-type-a-light.png')}
                    style={{ width: 70, height: 70 }}
                    resizeMode="center"
                />
            )
        },
        { name: 'MySQL', icon: MySQL, url: 'https://www.mysql.com/' },
        { name: 'MongoDB', icon: MongoDB, url: 'https://www.mongodb.com/' },
        { name: 'PostgreSQL', icon: PostgreSQL, url: 'https://www.postgresql.org/' },
        { name: 'Docker', icon: Docker, url: 'https://www.docker.com/' },

    ];
    const aiSkills: SkillItem[] = [
        {
            name: 'Elevenlabs',
            url: 'https://elevenlabs.io',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/elevenlabs-logo-white.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMode="center"
                />
            )
        },
        {
            name: 'ChatGPT',
            url: 'https://chatgpt.com',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/OpenAI-white-monoblossom.png')}
                    style={{ width: 70, height: 70 }}
                    resizeMode="center"
                />
            )
        },
        {
            name: 'Kiro',
            url: 'https://kiro.dev',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/kiro.svg')}
                    style={{ width: 70, height: 70 }}
                    resizeMode="center"
                />
            )
        },
        {
            name: 'Claude.ai',
            url: 'https://claude.ai',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/Unknown.jpeg')}
                    style={{ width: 70, height: 70 }}
                    resizeMode="center"
                />
            )
        }
    ]

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/dab07/',
            icon: LinkedIn,
        },
        {
            name: 'GitHub',
            url: 'https://github.com/dab07',
            icon: GitHubLight,
        },
        {
            name: 'LeetCode',
            url: 'https://leetcode.com/u/Dab07/',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/icons8-leetcode-100.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode="center"
                />
            )
        },
        {
            name: 'DevPost',
            url: 'dhttps://devpost.com/dab07',
            icon: null,
            customIcon: (
                <Image
                    source={require('@/icons/devpost-seeklogo.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="center"
                />
            )
        }
    ];

    const openLink = (url: string) => {
        Linking.openURL(url);
    };



    return (
        <AnimatedScreenWrapper screenName="aboutme">
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

                <View className="absolute top-16 right-4 z-10">
                    <View className="flex-row space-x-2 gap-4 mt-4">
                        {socialLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <Pressable
                                    key={link.name}
                                    onPress={() => openLink(link.url)}
                                >
                                    {link.customIcon ? (
                                        link.customIcon
                                    ) : IconComponent ? (
                                        <IconComponent size={25} />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <SafeAreaView className="flex-1" edges={['bottom']}>
                    <Animated.ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingTop: 120, paddingBottom: 40 }}
                    >
                        <View className="items-center px-4">
                            <View style={{ width: containerWidth, maxWidth: 900 }}>
                                <View className="mb-8">
                                    <View className="relative z-10">
                                        <Text className="text-gray-300 text-base leading-7">
                                            {professionalSummary}
                                        </Text>
                                    </View>
                                </View>

                                <View className="mb-8">
                                    <View className="flex-row items-center justify-center mb-4">
                                        <Text className="text-2xl font-bold text-white">LeetCode</Text>
                                    </View>

                                    <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-6">
                                        <LinearGradient
                                            colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                            className="absolute inset-0 rounded-2xl"
                                        />
                                        <View className="relative z-10">
                                            <View className="flex-row items-center justify-center mb-4">
                                                <Text className="text-xl font-bold text-white">{leetcodeUsername}</Text>
                                            </View>

                                            {statsLoading && (
                                                <Text className="text-center text-purple-300 text-sm mb-4">
                                                    Fetching latest stats...
                                                </Text>
                                            )}

                                            {statsError && (
                                                <Text className="text-center text-red-400 text-sm mb-4">
                                                    Using cached data • {statsError}
                                                </Text>
                                            )}

                                            {leetcodeStats && (
                                                <>
                                                    <View className="flex-row justify-between mb-6">
                                                        <View className="items-center">
                                                            <View className='flex-row'>
                                                                <Text className="text-3xl font-bold text-blue-400">
                                                                    {leetcodeStats.totalSolved}
                                                                </Text>
                                                                <Text className="text-xs text-gray-100 top-4">
                                                                    / {leetcodeStats.totalQuestions}
                                                                </Text>
                                                            </View>
                                                            <Text className="text-sm text-gray-400">Total Solved</Text>

                                                        </View>
                                                        <View className="items-center">
                                                            <Text className="text-3xl font-bold text-purple-400">
                                                                {leetcodeStats.ranking.toLocaleString()}
                                                            </Text>
                                                            <Text className="text-sm text-gray-400">Ranking</Text>
                                                        </View>
                                                        <View className="items-center">
                                                            <Text className="text-3xl font-bold text-cyan-400">
                                                                {leetcodeStats.acceptanceRate.toFixed(1)}%
                                                            </Text>
                                                            <Text className="text-sm text-gray-400">Acceptance</Text>
                                                        </View>
                                                    </View>

                                                    {/* Difficulty Breakdown */}
                                                    <View className="flex-row justify-between mb-4">
                                                        <View className="items-center flex-1">
                                                            <View className='flex-row'>
                                                                <Text className="text-xl font-bold text-green-400">
                                                                    {leetcodeStats.easySolved}
                                                                </Text>
                                                                <Text className="text-sm text-gray-100 top-1">
                                                                    / {leetcodeStats.totalEasy}
                                                                </Text>
                                                            </View>

                                                            <Text className="text-xs text-gray-400">Easy</Text>

                                                            <View className="w-[60%] bg-gray-700 rounded-full h-1.5 mt-1">
                                                                <View
                                                                    className="bg-green-400 h-1.5 rounded-full"
                                                                    style={{
                                                                        width: `${(leetcodeStats.easySolved / leetcodeStats.totalEasy) * 100}%`
                                                                    }}
                                                                />
                                                            </View>
                                                        </View>

                                                        <View className="items-center flex-1 mx-4">
                                                            <View className='flex-row'>
                                                                <Text className="text-xl font-bold text-yellow-400">
                                                                    {leetcodeStats.mediumSolved}
                                                                </Text>
                                                                <Text className="text-sm text-gray-100 top-1">
                                                                    / {leetcodeStats.totalMedium}
                                                                </Text>
                                                            </View>

                                                            <Text className="text-xs text-gray-400">Medium</Text>

                                                            <View className="w-[60%] bg-gray-700 rounded-full h-1.5 mt-1">
                                                                <View
                                                                    className="bg-yellow-400 h-1.5 rounded-full"
                                                                    style={{
                                                                        width: `${(leetcodeStats.mediumSolved / leetcodeStats.totalMedium) * 100}%`
                                                                    }}
                                                                />
                                                            </View>
                                                        </View>

                                                        <View className="items-center flex-1">
                                                            <View className='flex-row'>
                                                                <Text className="text-xl font-bold text-red-400">
                                                                    {leetcodeStats.hardSolved}
                                                                </Text>
                                                                <Text className="text-sm text-gray-100 top-1">
                                                                    / {leetcodeStats.totalHard}
                                                                </Text>
                                                            </View>

                                                            <Text className="text-xs text-gray-400">Hard</Text>

                                                            <View className="w-[60%] bg-gray-700 rounded-full h-1.5 mt-1">
                                                                <View
                                                                    className="bg-red-400 h-1.5 rounded-full"
                                                                    style={{
                                                                        width: `${(leetcodeStats.hardSolved / leetcodeStats.totalHard) * 100}%`
                                                                    }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View className="flex-row justify-center">
                                                        <View className="items-center">
                                                            <Text className="text-lg font-bold text-orange-400">
                                                                {leetcodeStats.contributionPoints.toLocaleString()}
                                                            </Text>
                                                            <Text className="text-xs text-gray-400">Contribution Points</Text>
                                                        </View>
                                                    </View>
                                                </>
                                            )}

                                        </View>
                                    </View>
                                </View>
                                <View className='mb-8'>
                                    <View className="flex-row items-center justify-center mb-4">
                                        <Text className="text-2xl font-bold text-white">Skills</Text>
                                    </View>
                                    <View className="flex-row flex-wrap justify-center gap-6">
                                        {skills.map((skill) => {
                                            const IconComponent = skill.icon;
                                            return (
                                                <Pressable
                                                    key={skill.name}
                                                    onPress={() => openLink(skill.url)}
                                                >
                                                    {skill.customIcon ? (
                                                        skill.customIcon
                                                    ) : IconComponent ? (
                                                        <IconComponent />
                                                    ) : null}
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </View>
                                <View className='mb-8'>
                                    <View className="flex-row items-center justify-center mb-4">
                                        <Text className="text-2xl font-bold text-white">AI Skills</Text>
                                    </View>
                                    <View className="flex-row flex-wrap justify-center gap-6">
                                        {aiSkills.map((skill) => {
                                            const IconComponent = skill.icon;
                                            return (
                                                <Pressable
                                                    key={skill.name}
                                                    onPress={() => openLink(skill.url)}
                                                >
                                                    {skill.customIcon ? (
                                                        skill.customIcon
                                                    ) : IconComponent ? (
                                                        <IconComponent />
                                                    ) : null}
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Animated.ScrollView>
                </SafeAreaView>
            </View>
        </AnimatedScreenWrapper>
    );
}

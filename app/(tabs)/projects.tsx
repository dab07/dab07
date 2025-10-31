import React from 'react';
import { View, Text, Pressable, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import { Video, Globe } from 'lucide-react-native';
import { GitHubLight } from 'developer-icons';
import CosmicParticles from '@/components/CosmicParticles';

import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';

interface HackathonProject {
    id: number;
    title: string;
    description: string;
    link: string;
    github: string;
    image?: string;
    technologies: string[];
    videoDemo: string;
    color: string[];
}

interface PersonalProject {
    id: number;
    title: string;
    description: string;
    github: string;
    image?: string;
    technologies: string[];
    color: string[];
}

export default function ProjectsScreen() {
    const scrollY = useSharedValue(0);


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const openProject = (url: string) => {
        Linking.openURL(url);
    };

    const getImageSource = (imageName: string) => {
        const imageMap: { [key: string]: any } = {
            'aura-online': require('@/icons/JIrayaAi.png'),
            'jirayaai': require('@/icons/JIrayaAi.png'),
            'default': require('../../assets/images/icon.png'),
        };
        return imageMap[imageName] || imageMap['default'];
    };



    const hackathonProjects: HackathonProject[] = [
        {
            id: 1,
            title: 'Aura Online',
            description: `• Built a gamified mobile app that turns real-life tasks into RPG-style quests, allowing users to earn and flex “Aura” points through solo or friend challenges.
• Implemented multi-phase challenges (creation, voting, proof submission, validation) with Aura point flow management,
rate limiting, and performance optimization.
• Developed a modern dark-themed UI using TailwindCSS and Expo, with support for customizable commissions, global
connections, and scalable backend integration via Supabase.`,
            link: 'https://auraonline.netlify.app/',
            github: 'https://github.com/dab07/Aura-Online',
            image: 'aura-online',
            technologies: ['TypeScript', 'Next.js', 'Expo', 'Supabase', 'TailwindCSS'],
            videoDemo: 'https://youtube.com/shorts/HDKSEvWNoUg?si=Tw1UDe2iJXZvQOl6',
            color: ['#8B5CF6', '#EC4899'],
        },
        {
            id: 2,
            title: 'JirayaAi',
            description: `• Developed a full-stack AI web app that simulates real interview experiences using Gemini, ChatGPT, and ElevenLabs, supporting both voice and text responses.
• Integrated Supabase for user authentication, plan management, and interview tracking; implemented personalized feedback and dynamic question generation.
• Designed a modern, responsive UI using Bolt.new with support for multi-level interviews, user analytics, and upgradeable subscription plans.`,
            link: 'https://jirayaai.netlify.app',
            github: 'https://github.com/dab07/hackathon-jirayaai',
            image: 'jirayaai',
            technologies: ['TypeScript', 'Next.js', 'Expo', 'Supabase', 'TailwindCSS', 'ElevenLabs', 'Gemini'],
            videoDemo: 'https://youtu.be/RJOTt_o6y8A?si=e6FFf1t4A7XEjiOl',
            color: ['#3B82F6', '#06B6D4'],
        },
    ];

    const personalProjects: PersonalProject[] = [
        {
            id: 1,
            title: 'Ravven Blogging Platform',
            description: `• Building a full-stack blogging platform (MERN) with JWT authentication for secure access. 
• Developed image upload functionality, allowing users to add images to their blog posts.
• Implemented likes and comments features to enhance user engagement.`,
            github: 'https://github.com/dab07/Ravven',
            image: 'default',
            technologies: ['TypeScript', 'React', 'MongoDB Atlas', 'Node.Js', 'Express,Js', 'HTML5', 'CSS5'],
            color: ['#1c92d2', '#f2fcfe'],
        },
        {
            id: 2,
            title: 'PokeVerse',
            description: `• Developed a Pok ́emon encyclopedia using Expo.io with a comparison feature for side-by-side stat analysis. 
• Worked on optimizing API calls to improve data retrieval efficiency.`,
            github: 'https://github.com/dab07/pokeVerse',
            image: 'default',
            technologies: ['TypeScript', 'Expo', 'PokeDex API', 'HTML5', 'CSS5'],
            color: ['#1c92d2', '#f2fcfe'],
        },
        {
            id: 3,
            title: 'WatchList',
            description: `• Created ’WatchList’ application in Node.js from scratch using Express.js, Sequelize, MySQL and the tmdb.org API to track user's watch progress and wishlist across movies and tv/web series.
• WImplemented comprehensive user authentication and session management to ensure secure access, enhancing user experience and data security.
• Developed features enabling users to manage their progress on movies and web series, tracking watched status, series status, total progress and wishlist.`,
            github: 'https://github.com/dab07/WatchList',
            image: 'default',
            technologies: ['TypeScript', 'Node.Js', 'Express.Js', 'tmdb.org API', 'Sequalize (ORM)', 'MySQL', 'HTML5', 'CSS5'],
            color: ['#1c92d2', '#f2fcfe'],
        },
        {
            id: 4,
            title: 'GUN DETECTION',
            description: `• Constructed a real-time weapon identification system using HAAR cascading and OpenCV, attaining 95% accuracy in diverse environmental conditions.
• Minimized false positives by 40% through coordinate system and grayscale image filtering.
• Implemented image normalization and subject classification with boundary frame display.`,
            github: 'https://github.com/dab07/pokeVerse',
            image: 'default',
            technologies: ['AI/ML Model', 'HAAR Cascading', 'OpenCV'],
            color: ['#1c92d2', '#f2fcfe'],
        },
        {
            id: 5,
            title: 'GUN DETECTION',
            description: `• Constructed a real-time weapon identification system using HAAR cascading and OpenCV, attaining 95% accuracy in diverse environmental conditions.
• Minimized false positives by 40% through coordinate system and grayscale image filtering.
• Implemented image normalization and subject classification with boundary frame display.`,
            github: 'https://github.com/dab07/pokeVerse',
            image: 'default',
            technologies: ['AI/ML Model', 'HAAR Cascading', 'OpenCV'],
            color: ['#1c92d2', '#f2fcfe'],
        },
    ];

    const HackathonProjectCard = ({ project }: { project: HackathonProject }) => {
        const cardScale = useSharedValue(1);
        const glowIntensity = useSharedValue(0);

        const animatedCardStyle = useAnimatedStyle(() => ({
            transform: [{ scale: cardScale.value }],
        }));

        const glowStyle = useAnimatedStyle(() => ({
            shadowOpacity: glowIntensity.value,
            shadowRadius: 20 * glowIntensity.value,
            shadowColor: project.color[0],
        }));

        const handlePressIn = () => {
            cardScale.value = withSpring(0.98);
            glowIntensity.value = withTiming(0.6, { duration: 200 });
        };

        const handlePressOut = () => {
            cardScale.value = withSpring(1);
            glowIntensity.value = withTiming(0.2, { duration: 300 });
        };

        return (
            <Animated.View
                style={[animatedCardStyle, glowStyle]}
                className="w-[48%] max-w-md mb-6 mx-1"
            >
                <Pressable
                    onPress={() => openProject(project.link)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className="relative"
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(5, 5, 15, 0.98)']}
                        className="rounded-2xl border border-purple-500/30 overflow-hidden"
                        style={{
                            shadowColor: project.color[0],
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.2,
                            shadowRadius: 16,
                        }}
                    >

                        <View className="p-4 pb-3">
                            <View className="flex-row items-center justify-between mb-3">
                                <Text className="text-xl font-bold text-white mb-1">
                                    {project.title}
                                </Text>
                                <Pressable
                                    className="bg-gray-800/60 p-2.5 rounded-full border border-yellow-300"
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        openProject(project.github);
                                    }}
                                >
                                    <GitHubLight size={16} color="#ffffff" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Project Image */}
                        {project.image && (
                            <View className="mx-4 mb-4 items-center justify-center h-[250]" >
                                <Image
                                    source={getImageSource(project.image)}
                                    // className='w-[100%] h-[100%]'
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="contain"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                                    className="absolute inset-0"
                                />
                            </View>
                        )}

                        {/* Description */}
                        <View className="px-4 mb-4">
                            <Text className="text-gray-300 text-sm leading-5">
                                {project.description}
                            </Text>
                        </View>

                        {/* Technologies */}
                        <View className="px-4 mb-4">
                            <View className="flex-row flex-wrap gap-1.5">
                                {project.technologies.map((tech: string, techIndex: number) => (
                                    <LinearGradient
                                        key={techIndex}
                                        colors={['rgba(168, 85, 247, 0.2)', 'rgba(59, 130, 246, 0.2)']}
                                        className="px-2.5 py-1 rounded-full border border-purple-400/30"
                                    >
                                        <Text className="text-xs text-purple-200 font-medium">{tech}</Text>
                                    </LinearGradient>
                                ))}
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="px-4 pb-4 mt-auto">
                            <View className="flex-row gap-2">
                                <Pressable
                                    className="flex-1 flex-row items-center justify-center py-2.5 rounded-lg"
                                    style={{ backgroundColor: project.color[0] + '20' }}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        openProject(project.link);
                                    }}
                                >
                                    <Globe size={14} color={project.color[0]} />
                                    <Text className="font-semibold ml-1.5 text-sm" style={{ color: project.color[0] }}>
                                        Launch
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 flex-row items-center justify-center bg-red-600/20 border border-red-500/30 py-2.5 rounded-lg"
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        openProject(project.videoDemo);
                                    }}
                                >
                                    <Video size={14} color="#ef4444" />
                                    <Text className="text-red-400 font-semibold ml-1.5 text-sm">Demo</Text>
                                </Pressable>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        );
    };

    const PersonalProjectCard = ({ project }: { project: PersonalProject }) => {
        const cardScale = useSharedValue(1);
        const glowIntensity = useSharedValue(0);

        const animatedCardStyle = useAnimatedStyle(() => ({
            transform: [{ scale: cardScale.value }],
        }));

        const glowStyle = useAnimatedStyle(() => ({
            shadowOpacity: glowIntensity.value,
            shadowRadius: 20 * glowIntensity.value,
            shadowColor: project.color[0],
        }));

        const handlePressIn = () => {
            cardScale.value = withSpring(0.98);
            glowIntensity.value = withTiming(0.6, { duration: 200 });
        };

        const handlePressOut = () => {
            cardScale.value = withSpring(1);
            glowIntensity.value = withTiming(0.2, { duration: 300 });
        };

        return (
            <Animated.View
                style={[animatedCardStyle, glowStyle]}
                className="w-[48%] max-w-md mb-6 mx-1"
            >
                <Pressable
                    onPress={() => openProject(project.github)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className="relative"
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(5, 5, 15, 0.98)']}
                        className="rounded-2xl border border-purple-500/30 overflow-hidden"
                        style={{
                            shadowColor: project.color[0],
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.2,
                            shadowRadius: 16,
                        }}
                    >
                        <View className="p-4 pb-3">
                            <View className="flex-row items-center justify-between mb-3">
                                <Text className="text-xl font-bold text-white mb-1">
                                    {project.title}
                                </Text>
                                <Pressable
                                    className="bg-gray-800/60 p-2.5 rounded-full border border-yellow-300"
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        openProject(project.github);
                                    }}
                                >
                                    <GitHubLight size={16} color="#ffffff" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Project Image - Optional for personal projects */}
                        {project.image && (
                            <View className="mx-4 mb-4 items-center justify-center h-[250]">
                                <Image
                                    source={getImageSource(project.image)}
                                    style={{ width: '90%', height: '90%' }}
                                    resizeMode="contain"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                                    className="absolute inset-0"
                                />
                            </View>
                        )}

                        {/* Description */}
                        <View className="px-4 mb-4">
                            <Text className="text-gray-300 text-sm leading-5">
                                {project.description}
                            </Text>
                        </View>

                        {/* Technologies */}
                        <View className="px-4 mb-4">
                            <View className="flex-row flex-wrap gap-1.5">
                                {project.technologies.map((tech: string, techIndex: number) => (
                                    <LinearGradient
                                        key={techIndex}
                                        colors={['rgba(168, 85, 247, 0.2)', 'rgba(59, 130, 246, 0.2)']}
                                        className="px-2.5 py-1 rounded-full border border-purple-400/30"
                                    >
                                        <Text className="text-xs text-purple-200 font-medium">{tech}</Text>
                                    </LinearGradient>
                                ))}
                            </View>
                        </View>

                        {/* Action Button - Only GitHub for personal projects */}
                        <View className="px-4 pb-4 mt-auto">
                            <Pressable
                                className="flex-row items-center justify-center py-2.5 rounded-lg"
                                style={{ backgroundColor: project.color[0] + '20' }}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    openProject(project.github);
                                }}
                            >
                                <GitHubLight size={14} color={project.color[0]} />
                                <Text className="font-semibold ml-1.5 text-sm" style={{ color: project.color[0] }}>
                                    View Code
                                </Text>
                            </Pressable>
                        </View>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        );
    };



    return (
        <AnimatedScreenWrapper screenName="projects">
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

                <SafeAreaView className="flex-1" edges={['bottom']}>
                    <Animated.ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingTop: 120, paddingBottom: 40 }}
                    >
                        <View className='m-4'>
                            <Text className='text-center text-purple-200 text-3xl font-bold'>Hackathon Projects</Text>
                        </View>
                        <View className="px-4">
                            <View className="flex-row flex-wrap justify-center">
                                {hackathonProjects.map((project) => (
                                    <HackathonProjectCard key={project.id} project={project} />
                                ))}
                            </View>
                        </View>
                        <View className='m-4'>
                            <Text className='text-center text-purple-200 text-3xl font-bold'>Project</Text>
                        </View>
                        <View className="px-4">
                            <View className="flex-row flex-wrap justify-center">
                                {personalProjects.map((project) => (
                                    <PersonalProjectCard key={project.id} project={project} />
                                ))}
                            </View>
                        </View>
                        {/* <View className="mt-8 px-6">
                        <LinearGradient
                            colors={['transparent', 'rgba(168, 85, 247, 0.1)', 'transparent']}
                            className="h-px w-full mb-6"
                        />
                        <Text className="text-center text-gray-500 text-sm">
                            More projects coming soon...
                        </Text>
                    </View> */}
                    </Animated.ScrollView>
                </SafeAreaView>
            </View>
        </AnimatedScreenWrapper>
    );
}
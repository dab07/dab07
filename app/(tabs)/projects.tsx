import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import PortfolioSection from '@/components/PortfolioSection';
import { GitHubRepo, fetchGitHubRepos } from '@/lib/api';
import { ExternalLink, Star, Clock, Github, Play, Video } from 'lucide-react-native';

export default function ProjectsScreen() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const username = process.env.EXPO_PUBLIC_GITHUB_USERNAME || 'alexthompson';
            const githubRepos = await fetchGitHubRepos(username);
            setRepos(githubRepos);
        } catch (err) {
            setError('Failed to load projects');
            console.error('Error loading projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const openProject = (url: string) => {
        Linking.openURL(url);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const getLanguageColor = (language: string) => {
        const colors: Record<string, string> = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Java': '#007396',
            'React': '#61dafb',
            'Node.js': '#339933',
            'Go': '#00add8',
            'Rust': '#000000',
            'C++': '#00599c',
            'HTML': '#e34f26',
            'CSS': '#1572b6',
        };
        return colors[language] || '#6b7280';
    };

    const hackathonProjects = [
        {
            id: 1,
            title: 'Aura Online',
            description: 'Built a gamified mobile app that turns real-life tasks into RPG-style quests, allowing users to earn and flex "Aura" points through solo or friend challenges. Implemented multi-phase challenges with Aura point flow management, rate limiting, and performance optimization.',
            link: 'https://auraonline.netlify.app/',
            github: 'https://github.com/dab07/Aura-Online',
            image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
            technologies: ['TypeScript', 'Next.js', 'Expo', 'Supabase', 'TailwindCSS'],
            videoDemo: 'https://youtube.com/shorts/HDKSEvWNoUg?si=Tw1UDe2iJXZvQOl6'
        },
        {
            id: 2,
            title: 'JirayaAi',
            description: 'Developed a full-stack AI web app that simulates real interview experiences using Gemini, ChatGPT, and ElevenLabs, supporting both voice and text responses. Integrated Supabase for user authentication, plan management, and interview tracking.',
            link: 'https://jirayaai.netlify.app',
            github: 'https://github.com/dab07/hackathon-jirayaai',
            image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
            technologies: ['TypeScript', 'Next.js', 'Expo', 'Supabase', 'TailwindCSS', 'ElevenLabs', 'Gemini'],
            videoDemo: 'https://youtu.be/RJOTt_o6y8A?si=e6FFf1t4A7XEjiOl'
        },
    ];

    // Create pairs for 2-column layout
    const projectPairs = [];
    for (let i = 0; i < hackathonProjects.length; i += 2) {
        projectPairs.push(hackathonProjects.slice(i, i + 2));
    }

    return (
        <View className="flex-1 bg-black">
            <SafeAreaView className="flex-1" edges={['bottom']}>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 120, paddingBottom: 40 }}
                >
                    <View className="mb-8 px-4">
                        <h1 className="text-3xl md:text-3xl font-meduim bg-gradient-to-r from-purple-900 via-fuchsia-600 to-blue-300 bg-clip-text text-transparent animate-gradient-x mb-6">Hackathon Projects</h1>
                        {projectPairs.map((pair, pairIndex) => (
                            <View key={pairIndex} className="flex-row gap-4 mb-6 mx-20">
                                {pair.map((project) => {
                                    const ProjectCard = () => {
                                        return (
                                            <Pressable
                                                onPress={() => openProject(project.link)}
                                                className="flex-1 group transition-all"
                                            >
                                                <View className="
                                                        rounded-2xl overflow-hidden border border-gray-700 bg-zinc-950
                                                            transition-all
                                                            group-hover:border-purple-500/70
                                                            group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                                                            group-hover:scale-[1.02]
                                                        ">
                                                    <Pressable
                                                        className="absolute top-3 right-3 z-10 bg-gray-800/80 p-2 rounded-full"
                                                        onPress={(e) => {
                                                            e.stopPropagation();
                                                            openProject(project.github);
                                                        }}
                                                    >
                                                        <Github size={24} color="#ffffff" />
                                                    </Pressable><View className="flex-row p-4">
                                                        {/* Image - Top Left */}
                                                        <View className="w-80 h-40 rounded-lg overflow-hidden mr-3">
                                                            <Image
                                                                source={{ uri: project.image }}
                                                                className="w-full h-full"
                                                                resizeMode="cover"
                                                            />
                                                        </View>
                                                        <View className="flex-1 pr-8">
                                                            <Text className="text-2xl font-bold text-white mb-2" numberOfLines={2}>
                                                                {project.title}
                                                            </Text>
                                                            <View className="flex-row flex-wrap gap-1 mb-2">
                                                                {project.technologies.map((tech, techIndex) => (
                                                                    <View key={techIndex} className="bg-purple-900/50 bg-clip-text mx-2">
                                                                        <Text className="text-sm text-purple-300 font-medium">{tech}</Text>
                                                                    </View>
                                                                ))}
                                                            </View>
                                                            <Pressable
                                                                className="flex-row items-center bg-red-600/20 px-2 py-1 rounded-md self-start"
                                                                onPress={(e) => {
                                                                    e.stopPropagation();
                                                                    openProject(project.videoDemo);
                                                                }}
                                                            >
                                                                <Video size={12} color="#ef4444" />
                                                                <Text className="text-xs text-red-400 font-medium ml-1">Watch Demo</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                    <View className="px-4 pb-4">
                                                        <Text className="text-xl text-gray-300 leading-5" numberOfLines={4}>
                                                            {project.description}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        );
                                    };

                                    return <ProjectCard key={project.id} />;
                                })}
                                {pair.length === 1 && <View className="flex-1" />}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
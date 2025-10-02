import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BlackHoleEffect from '@/components/BlackHoleEffect';
import PortfolioSection from '@/components/PortfolioSection';
import { GitHubRepo, fetchGitHubRepos } from '@/lib/api';
import { ExternalLink, Star, GitBranch, Clock, Github } from 'lucide-react-native';

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

    // Featured projects with images
    const featuredProjects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time inventory tracking.',
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: 'https://github.com/alexthompson/ecommerce-platform',
            demo: 'https://ecommerce-demo.vercel.app',
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.',
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['React Native', 'Firebase', 'TypeScript'],
            github: 'https://github.com/alexthompson/task-manager',
            demo: 'https://taskmanager-demo.vercel.app',
        },
        {
            id: 3,
            title: 'Weather Analytics Dashboard',
            description: 'A comprehensive weather analytics platform with interactive charts, historical data analysis, and predictive modeling using machine learning.',
            image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['Vue.js', 'Python', 'D3.js', 'AWS'],
            github: 'https://github.com/alexthompson/weather-dashboard',
            demo: 'https://weather-analytics.vercel.app',
        },
    ];

    return (
        <View className="flex-1">
            <BlackHoleEffect/>

            <SafeAreaView className="flex-1" edges={['bottom']}>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 120, paddingBottom: 40 }}
                >
                    <PortfolioSection>
                        <View className="mb-8">
                            <Text className="text-4xl font-bold text-gray-900 mb-2">Projects</Text>
                            <Text className="text-base text-gray-600">
                                A collection of my recent work and contributions
                            </Text>
                        </View>
                    </PortfolioSection>

                    {/* Featured Projects */}
                    <PortfolioSection delay={200}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</Text>

                            {featuredProjects.map((project, index) => (
                                <View key={project.id} className="mb-6">
                                    <View className="bg-white/90 rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            source={{ uri: project.image }}
                                            className="w-full h-48"
                                            resizeMode="cover"
                                        />

                                        <View className="p-6">
                                            <Text className="text-xl font-bold text-gray-900 mb-3">{project.title}</Text>
                                            <Text className="text-sm text-gray-600 leading-6 mb-4">
                                                {project.description}
                                            </Text>

                                            <View className="flex-row flex-wrap gap-2 mb-4">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <View key={techIndex} className="bg-blue-100 px-3 py-1 rounded-full">
                                                        <Text className="text-xs text-blue-700 font-medium">{tech}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            <View className="flex-row gap-3">
                                                <Pressable
                                                    className="flex-row items-center bg-gray-900 px-4 py-2 rounded-lg"
                                                    onPress={() => openProject(project.github)}
                                                >
                                                    <Github size={16} color="#ffffff" />
                                                    <Text className="text-white text-sm font-semibold ml-2">Code</Text>
                                                </Pressable>

                                                <Pressable
                                                    className="flex-row items-center bg-blue-600 px-4 py-2 rounded-lg"
                                                    onPress={() => openProject(project.demo)}
                                                >
                                                    <ExternalLink size={16} color="#ffffff" />
                                                    <Text className="text-white text-sm font-semibold ml-2">Live Demo</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </PortfolioSection>

                    {/* GitHub Repositories */}
                    <PortfolioSection delay={400}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-6">GitHub Repositories</Text>

                            {loading ? (
                                <View className="p-10 items-center">
                                    <Text className="text-base text-gray-600 font-medium">Loading projects...</Text>
                                </View>
                            ) : error ? (
                                <View className="p-10 items-center">
                                    <Text className="text-base text-red-600 font-medium mb-4 text-center">{error}</Text>
                                    <Pressable className="bg-blue-600 px-5 py-2 rounded-lg" onPress={loadProjects}>
                                        <Text className="text-white font-semibold">Retry</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                repos.map((repo, index) => (
                                    <Pressable
                                        key={repo.id}
                                        className="mb-5"
                                        onPress={() => openProject(repo.html_url)}
                                    >
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                                            className="p-5 rounded-2xl"
                                        >
                                            <View className="flex-row justify-between items-start mb-3">
                                                <Text className="text-lg font-bold text-gray-900 flex-1">{repo.name}</Text>
                                                <ExternalLink size={20} color="#3b82f6" />
                                            </View>

                                            <Text className="text-sm text-gray-600 leading-5 mb-4">
                                                {repo.description || 'No description available'}
                                            </Text>

                                            <View className="flex-row items-center gap-4 mb-4">
                                                <View className="flex-row items-center gap-1">
                                                    <Star size={16} color="#fbbf24" />
                                                    <Text className="text-xs text-gray-600 font-medium">{repo.stargazers_count}</Text>
                                                </View>

                                                {repo.language && (
                                                    <View className="flex-row items-center gap-1">
                                                        <View
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                                                        />
                                                        <Text className="text-xs text-gray-600 font-medium">{repo.language}</Text>
                                                    </View>
                                                )}

                                                <View className="flex-row items-center gap-1">
                                                    <Clock size={16} color="#6b7280" />
                                                    <Text className="text-xs text-gray-600 font-medium">{formatDate(repo.updated_at)}</Text>
                                                </View>
                                            </View>

                                            {repo.topics && repo.topics.length > 0 && (
                                                <View className="flex-row flex-wrap gap-2 mb-4">
                                                    {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                                                        <View key={topicIndex} className="bg-blue-100 px-2 py-1 rounded-lg">
                                                            <Text className="text-xs text-blue-700 font-medium">{topic}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}

                                            {repo.homepage && (
                                                <View className="items-start">
                                                    <Pressable
                                                        className="flex-row items-center bg-blue-600 px-4 py-2 rounded-lg"
                                                        onPress={() => openProject(repo.homepage!)}
                                                    >
                                                        <Text className="text-white text-sm font-semibold mr-2">Live Demo</Text>
                                                        <ExternalLink size={16} color="#ffffff" />
                                                    </Pressable>
                                                </View>
                                            )}
                                        </LinearGradient>
                                    </Pressable>
                                ))
                            )}
                        </View>
                    </PortfolioSection>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

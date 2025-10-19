import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler
} from 'react-native-reanimated';
import { Quote, Star, User, Send, MessageSquare } from 'lucide-react-native';
import CosmicParticles from '@/components/CosmicParticles';

import AnimatedScreenWrapper from '@/components/AnimatedScreenWrapper';
import { supabase } from '@/lib/supabase';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    created_at: string;
}

interface NewTestimonial {
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
}

export default function TestimonialsScreen() {
    const scrollY = useSharedValue(0);
    const [loading, setLoading] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState<NewTestimonial>({
        name: '',
        role: '',
        company: '',
        message: '',
        rating: 5
    });

    const { width } = Dimensions.get('window');
    const isTablet = width > 768;
    const containerWidth = isTablet ? '50%' : '90%';

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error loading testimonials:', error);
                setTestimonials([]);
            } else {
                setTestimonials(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
            setTestimonials([]);
        } finally {
            setLoading(false);
        }
    };

    const submitTestimonial = async () => {
        if (!newTestimonial.name.trim() || !newTestimonial.message.trim()) {
            Alert.alert('Error', 'Please fill in at least your name and message.');
            return;
        }

        try {
            setSubmitting(true);
            const { error } = await supabase
                .from('testimonials')
                .insert([newTestimonial]);

            if (error) {
                Alert.alert('Error', 'Failed to submit testimonial. Please try again.');
                console.error('Error submitting testimonial:', error);
            } else {
                Alert.alert('Success', 'Thank you for your testimonial!');
                setShowForm(false);
                setNewTestimonial({
                    name: '',
                    role: '',
                    company: '',
                    message: '',
                    rating: 5
                });
                loadTestimonials(); // Reload testimonials
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={16}
                color={index < rating ? "#FFA116" : "#374151"}
                fill={index < rating ? "#FFA116" : "transparent"}
            />
        ));
    };



    return (
        <AnimatedScreenWrapper screenName="testimonials">
            <View className="flex-1 bg-black">
                <CosmicParticles particleCount={25} />

            {/* Stars */}
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
                    {/* Centered Container */}
                    <View className="items-center px-4">
                        <View style={{ width: containerWidth, maxWidth: 800 }}>
                            {/* Header */}
                            <View className="mb-8">
                                <Text className="text-gray-400 text-base leading-6 text-center mb-6">
                                    What clients and colleagues say about working with me.
                                </Text>

                                {/* Add Testimonial Section */}
                                <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-6 mb-6">
                                    <LinearGradient
                                        colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                        className="absolute inset-0 rounded-2xl"
                                    />

                                    <View className="relative z-10">
                                        <View className="flex-row items-center mb-4">
                                            <MessageSquare size={24} color="#8B5CF6" />
                                            <Text className="text-white font-semibold text-lg ml-3">
                                                Share Your Experience
                                            </Text>
                                        </View>

                                        {!showForm ? (
                                            <Pressable
                                                onPress={() => setShowForm(true)}
                                                className="bg-purple-600/20 border border-purple-500/50 rounded-lg p-4"
                                            >
                                                <Text className="text-purple-300 text-center">
                                                    Click here to write a testimonial...
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <View>
                                                {/* Inline Form */}
                                                <View className="space-y-4">
                                                    {/* Name and Role Row */}
                                                    <View className="flex-row space-x-3">
                                                        <View className="flex-1">
                                                            <TextInput
                                                                value={newTestimonial.name}
                                                                onChangeText={(text) => setNewTestimonial({ ...newTestimonial, name: text })}
                                                                placeholder="Your name *"
                                                                placeholderTextColor="#6B7280"
                                                                className="bg-gray-800/50 text-white p-3 rounded-lg border border-gray-600/50 text-sm"
                                                            />
                                                        </View>
                                                        <View className="flex-1">
                                                            <TextInput
                                                                value={newTestimonial.role}
                                                                onChangeText={(text) => setNewTestimonial({ ...newTestimonial, role: text })}
                                                                placeholder="Your role"
                                                                placeholderTextColor="#6B7280"
                                                                className="bg-gray-800/50 text-white p-3 rounded-lg border border-gray-600/50 text-sm"
                                                            />
                                                        </View>
                                                    </View>

                                                    {/* Company */}
                                                    <TextInput
                                                        value={newTestimonial.company}
                                                        onChangeText={(text) => setNewTestimonial({ ...newTestimonial, company: text })}
                                                        placeholder="Company name"
                                                        placeholderTextColor="#6B7280"
                                                        className="bg-gray-800/50 text-white p-3 rounded-lg border border-gray-600/50 text-sm"
                                                    />

                                                    {/* Rating */}
                                                    <View>
                                                        <Text className="text-white font-medium mb-2 text-sm">Rating</Text>
                                                        <View className="flex-row">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Pressable
                                                                    key={star}
                                                                    onPress={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                                                                    className="mr-2"
                                                                >
                                                                    <Star
                                                                        size={24}
                                                                        color={star <= newTestimonial.rating ? "#FFA116" : "#374151"}
                                                                        fill={star <= newTestimonial.rating ? "#FFA116" : "transparent"}
                                                                    />
                                                                </Pressable>
                                                            ))}
                                                        </View>
                                                    </View>

                                                    {/* Message */}
                                                    <TextInput
                                                        value={newTestimonial.message}
                                                        onChangeText={(text) => setNewTestimonial({ ...newTestimonial, message: text })}
                                                        placeholder="Share your experience working with me... *"
                                                        placeholderTextColor="#6B7280"
                                                        multiline
                                                        numberOfLines={4}
                                                        textAlignVertical="top"
                                                        className="bg-gray-800/50 text-white p-3 rounded-lg border border-gray-600/50 h-24 text-sm"
                                                    />

                                                    {/* Action Buttons */}
                                                    <View className="flex-row space-x-3">
                                                        <Pressable
                                                            onPress={() => {
                                                                setShowForm(false);
                                                                setNewTestimonial({
                                                                    name: '',
                                                                    role: '',
                                                                    company: '',
                                                                    message: '',
                                                                    rating: 5
                                                                });
                                                            }}
                                                            className="flex-1 bg-gray-600 p-3 rounded-lg"
                                                        >
                                                            <Text className="text-white text-center font-medium">Cancel</Text>
                                                        </Pressable>
                                                        <Pressable
                                                            onPress={submitTestimonial}
                                                            disabled={submitting}
                                                            className={`flex-1 flex-row items-center justify-center p-3 rounded-lg ${submitting ? 'bg-gray-600' : 'bg-purple-600'
                                                                }`}
                                                        >
                                                            <Send size={16} color="white" />
                                                            <Text className="text-white font-medium ml-2">
                                                                {submitting ? 'Submitting...' : 'Submit'}
                                                            </Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Testimonials List */}
                            {testimonials.length > 0 ? (
                                <View className="space-y-6">
                                    {testimonials.map((testimonial) => (
                                        <View key={testimonial.id} className="mb-6">
                                            <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-6">
                                                <LinearGradient
                                                    colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                                    className="absolute inset-0 rounded-2xl"
                                                />

                                                <View className="relative z-10">
                                                    {/* Quote Icon */}
                                                    <View className="mb-4">
                                                        <Quote size={24} color="#8B5CF6" />
                                                    </View>

                                                    {/* Message */}
                                                    <Text className="text-gray-300 text-base leading-7 mb-6">
                                                        "{testimonial.message}"
                                                    </Text>

                                                    {/* Rating */}
                                                    <View className="flex-row mb-4">
                                                        {renderStars(testimonial.rating)}
                                                    </View>

                                                    {/* Author Info */}
                                                    <View className="flex-row items-center">
                                                        <View className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full items-center justify-center mr-4">
                                                            <User size={20} color="white" />
                                                        </View>
                                                        <View className="flex-1">
                                                            <Text className="text-white font-semibold text-lg">
                                                                {testimonial.name}
                                                            </Text>
                                                            <Text className="text-blue-400 text-sm">
                                                                {testimonial.role}
                                                            </Text>
                                                            <Text className="text-gray-400 text-sm">
                                                                {testimonial.company}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View className="bg-gray-900/30 border border-gray-600/50 rounded-2xl p-8 text-center">
                                    <Text className="text-gray-400 text-center text-base">
                                        No testimonials yet. Be the first to share your experience!
                                    </Text>
                                </View>
                            )}

                            {/* Stats Section */}
                            {/* <View className="mt-8">
                                <View className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-6">
                                    <LinearGradient
                                        colors={['rgba(15, 15, 35, 0.95)', 'rgba(5, 5, 15, 0.98)']}
                                        className="absolute inset-0 rounded-2xl"
                                    />
                                    
                                    <View className="relative z-10">
                                        <Text className="text-2xl font-bold text-white mb-6 text-center">
                                            Client Satisfaction
                                        </Text>
                                        
                                        <View className="flex-row justify-around">
                                            <View className="items-center">
                                                <Text className="text-3xl font-bold text-purple-400">50+</Text>
                                                <Text className="text-gray-400 text-sm">Projects</Text>
                                            </View>
                                            <View className="items-center">
                                                <Text className="text-3xl font-bold text-pink-400">98%</Text>
                                                <Text className="text-gray-400 text-sm">Satisfaction</Text>
                                            </View>
                                            <View className="items-center">
                                                <Text className="text-3xl font-bold text-cyan-400">24/7</Text>
                                                <Text className="text-gray-400 text-sm">Support</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View> */}

                            {/* Footer */}
                            <View className="mt-8">
                                <LinearGradient
                                    colors={['transparent', 'rgba(168, 85, 247, 0.1)', 'transparent']}
                                    className="h-px w-full mb-6"
                                />
                                <Text className="text-center text-gray-500 text-sm">
                                    Ready to work together? Let's create something amazing!
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        </View>
        </AnimatedScreenWrapper>
    );
}
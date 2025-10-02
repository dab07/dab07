import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BlackHoleEffect from '../../components/BlackHoleEffect';
import PortfolioSection from '../..//components/PortfolioSection';
import { supabase } from '../..//lib/supabase';
import { trackEvent } from '../..//lib/api';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react-native';

export default function ContactScreen () {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            newErrors.email = 'Invalid details';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([{
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }]);

            if (error) throw error;

            // Track the contact form submission
            await trackEvent('contact_form_submit', 'contact');

            Alert.alert(
                'Success!',
                'Thank you for your message. I\'ll get back to you soon!',
                [{ text: 'OK', onPress: () => {
                        setFormData({ email: '', subject: '', message: '' });
                        setErrors({});
                    }}]
            );
        } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert(
                'Error',
                'Failed to send message. Please try again or contact me directly.'
            );
        } finally {
            setLoading(false);
        }
    };

    const openEmail = () => {
        Alert.alert('Email', 'alex.thompson@example.com');
    };

    const openLinkedIn = () => {
        Alert.alert('LinkedIn', 'Coming soon!');
    };

    const openGitHub = () => {
        Alert.alert('GitHub', 'Coming soon!');
    };
    return (
        <View className='flex-1'>
            <BlackHoleEffect />

            <SafeAreaView className="flex-1" edges={['bottom']}>
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 120, paddingBottom: 40 }}
                >
                    <PortfolioSection>
                        <View className="mb-8">
                            <Text className="text-4xl font-bold text-gray-900 mb-2">Get in Touch</Text>
                            <Text className="text-base text-gray-600">
                                Let&apos;s discuss your next project or just say hello!
                            </Text>
                        </View>
                    </PortfolioSection>

                    {/* Contact Info */}
                    <PortfolioSection delay={200}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-4">Contact Information</Text>

                            <View className="space-y-4">
                                <Pressable className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4" onPress={openEmail}>
                                    <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center">
                                        <Mail size={20} color="#3b82f6" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900">Email</Text>
                                        <Text className="text-sm text-gray-600">alex.thompson@example.com</Text>
                                    </View>
                                </Pressable>

                                <View className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4">
                                    <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center">
                                        <Phone size={20} color="#10b981" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900">Phone</Text>
                                        <Text className="text-sm text-gray-600">+1 (555) 123-4567</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center bg-white/80 p-4 rounded-xl space-x-4">
                                    <View className="w-12 h-12 bg-yellow-100 rounded-xl items-center justify-center">
                                        <MapPin size={20} color="#f59e0b" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900">Location</Text>
                                        <Text className="text-sm text-gray-600">San Francisco, CA</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </PortfolioSection>

                    {/* Social Links */}
                    <PortfolioSection delay={300}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-4">Connect with Me</Text>

                            <View className="flex-row flex-wrap gap-3">
                                <Pressable className="flex-row items-center bg-gray-900 px-5 py-3 rounded-xl space-x-2" onPress={openGitHub}>
                                    <Github size={20} color="#ffffff" />
                                    <Text className="text-white text-base font-semibold">GitHub</Text>
                                </Pressable>

                                <Pressable className="flex-row items-center bg-blue-600 px-5 py-3 rounded-xl space-x-2" onPress={openLinkedIn}>
                                    <Linkedin size={20} color="#ffffff" />
                                    <Text className="text-white text-base font-semibold">LinkedIn</Text>
                                </Pressable>
                            </View>
                        </View>
                    </PortfolioSection>

                    {/* Contact Form */}
                    <PortfolioSection delay={400}>
                        <View className="mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-6">Send a Message</Text>

                            <LinearGradient
                                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                                className="p-5 rounded-2xl"
                            >
                                <View className="mb-5">
                                    <Text className="text-base font-semibold text-gray-900 mb-2">Email</Text>
                                    <TextInput
                                        className={`border border-gray-300 rounded-lg p-3 text-base text-gray-900 bg-white ${errors.email ? 'border-red-500' : ''}`}
                                        value={formData.email}
                                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                                        placeholder="your.email@example.com"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>}
                                </View>

                                <View className="mb-5">
                                    <Text className="text-base font-semibold text-gray-900 mb-2">Subject</Text>
                                    <TextInput
                                        className={`border border-gray-300 rounded-lg p-3 text-base text-gray-900 bg-white ${errors.subject ? 'border-red-500' : ''}`}
                                        value={formData.subject}
                                        onChangeText={(text) => setFormData({ ...formData, subject: text })}
                                        placeholder="What's this about?"
                                        placeholderTextColor="#9ca3af"
                                    />
                                    {errors.subject && <Text className="text-red-500 text-sm mt-1">{errors.subject}</Text>}
                                </View>

                                <View className="mb-5">
                                    <Text className="text-base font-semibold text-gray-900 mb-2">Message</Text>
                                    <TextInput
                                        className={`border border-gray-300 rounded-lg p-3 text-base text-gray-900 bg-white h-32 ${errors.message ? 'border-red-500' : ''}`}
                                        value={formData.message}
                                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                                        placeholder="Tell me about your project or just say hello!"
                                        placeholderTextColor="#9ca3af"
                                        multiline
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                    />
                                    {errors.message && <Text className="text-red-500 text-sm mt-1">{errors.message}</Text>}
                                </View>

                                <Pressable
                                    className={`flex-row items-center justify-center p-4 rounded-xl space-x-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    <Send size={20} color="#ffffff" />
                                    <Text className="text-white text-base font-semibold">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                    </PortfolioSection>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database schema
export interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export interface Analytics {
    id: string;
    event_type: string;
    page: string;
    user_agent?: string;
    created_at: string;
}

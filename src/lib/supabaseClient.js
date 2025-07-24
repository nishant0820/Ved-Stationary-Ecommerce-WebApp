import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hrctadnebekjmyevztxe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3RhZG5lYmVram15ZXZ6dHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MjI5ODYsImV4cCI6MjA2MzQ5ODk4Nn0.9_jUG1lx6teR_31BbARZD35MciXdk3lQHGfnTZRKDWA';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
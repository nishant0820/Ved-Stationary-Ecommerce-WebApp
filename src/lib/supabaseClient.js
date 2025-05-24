import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrctadnebekjmyevztxe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3RhZG5lYmVram15ZXZ6dHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MjI5ODYsImV4cCI6MjA2MzQ5ODk4Nn0.9_jUG1lx6teR_31BbARZD35MciXdk3lQHGfnTZRKDWA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
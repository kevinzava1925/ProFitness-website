import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client (browser-safe)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file');
}

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Server-side Supabase client (for API routes)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase server environment variables are not set');
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}





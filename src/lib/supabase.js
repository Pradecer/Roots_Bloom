import { createClient } from '@supabase/supabase-js';

// Supabase Project Credentials for Roots_Bloom
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || 
  'https://knxmsxstgahjlbitltdw.supabase.co';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || 
  'sb_publishable_9snuPnOi8EEpl0dCat5X8Q_RipgI17m';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

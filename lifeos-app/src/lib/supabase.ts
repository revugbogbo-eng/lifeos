
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl === 'paste_your_supabase_url_here') {
  console.warn('⚠️ Supabase URL not configured. Add it to .env.local')
}

const isPlaceholder = !supabaseUrl || supabaseUrl === 'paste_your_supabase_url_here'

export const supabase = createClient(
  isPlaceholder ? 'https://xyz123placeholder.supabase.co' : supabaseUrl,
  isPlaceholder ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder' : supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export type { User, Session } from '@supabase/supabase-js'
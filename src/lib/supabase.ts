import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase env vars')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export type Lead = {
  id?: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  topic: 'general' | 'pricing' | 'new-website' | 'relaunch' | 'seo' | 'other'
  message: string
  source: string
  created_at?: string
  // Neue Felder (v23):
  package_interest?: 'starter' | 'business' | 'premium' | 'unsure' | null
  existing_website?: string | null
}

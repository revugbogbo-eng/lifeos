// ============================================
// LIFEOS TYPE DEFINITIONS
// Every data shape used in the app
// ============================================

// User
export interface UserProfile {
  id: string
  email: string
  full_name: string
  username: string
  avatar_emoji: string
  bio?: string
  location?: string
  date_of_birth?: string
  currency: string
  language: string
  theme: 'dark' | 'light' | 'amoled'
  life_score: number
  created_at: string
}

// Finance
export interface Account {
  id: string; user_id: string; name: string
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash'
  balance: number; currency: string; bank_name: string
  account_number_masked?: string; color: string; created_at: string
}

export interface Transaction {
  id: string; user_id: string; account_id: string
  merchant_name: string; amount: number; type: 'income' | 'expense' | 'transfer'
  category: string; date: string; notes?: string
  is_recurring: boolean; created_at: string
}

export interface Budget {
  id: string; user_id: string; category: string
  limit_amount: number; spent_amount: number; month: string
}

export interface Bill {
  id: string; user_id: string; name: string
  amount: number; due_date: string; frequency: string
  category: string; is_autopay: boolean; is_paid: boolean
  account_id?: string; notes?: string
}

// Investments
export interface Investment {
  id: string; user_id: string; type: 'crypto' | 'stock'
  symbol: string; name: string; quantity: number
  avg_buy_price: number; current_price: number
  logo_emoji: string; created_at: string
}

// Documents
export interface Document {
  id: string; user_id: string; name: string
  category: string; issuing_authority?: string
  issue_date?: string; expiry_date?: string
  document_number?: string; notes?: string
  is_shared_family: boolean; created_at: string
}

// Health
export interface Medication {
  id: string; user_id: string; name: string
  dosage: string; frequency: string; times: string[]
  remaining_count: number; refill_date?: string
  prescribing_doctor?: string; created_at: string
}

export interface Appointment {
  id: string; user_id: string; title: string
  doctor_name?: string; specialty?: string
  date_time: string; location?: string
  type: 'in-person' | 'virtual'; notes?: string
  family_member_id?: string
}

export interface VitalLog {
  id: string; user_id: string; date: string
  blood_pressure_systolic?: number; blood_pressure_diastolic?: number
  heart_rate?: number; weight?: number; blood_sugar?: number
  temperature?: number; oxygen_level?: number
}

export interface MoodLog {
  id: string; user_id: string; date: string
  mood: 1 | 2 | 3 | 4 | 5; energy: 1 | 2 | 3 | 4 | 5
  label?: string; notes?: string
}

// Goals
export interface Goal {
  id: string; user_id: string; title: string
  description?: string; category: string
  target_date: string; progress: number
  status: 'active' | 'paused' | 'completed' | 'abandoned'
  priority: 'low' | 'normal' | 'high' | 'critical'
  is_public: boolean; cover_emoji: string; created_at: string
}

export interface Milestone {
  id: string; goal_id: string; title: string
  is_completed: boolean; due_date?: string; order_index: number
}

export interface Habit {
  id: string; user_id: string; name: string
  icon: string; category: string; frequency: string
  target_days: string[]; streak: number; best_streak: number
  last_logged?: string; created_at: string
}

// Community
export interface Post {
  id: string; user_id: string; content: string
  image_url?: string; topic_tag?: string
  mood_emoji?: string; likes_count: number
  comments_count: number; is_liked_by_me: boolean
  author: { name: string; username: string; avatar_emoji: string }
  created_at: string
}

export interface Message {
  id: string; conversation_id: string
  sender_id: string; content: string
  is_read: boolean; created_at: string
}

// Family
export interface FamilyMember {
  id: string; user_id: string; name: string
  relationship: string; date_of_birth?: string
  avatar_emoji: string; blood_type?: string; allergies?: string
}

// Career
export interface Job {
  id: string; user_id: string; company_name: string
  job_title: string; start_date: string; end_date?: string
  employment_type: string; salary?: number; achievements?: string
  is_current: boolean
}

// Notifications
export interface AppNotification {
  id: string; user_id: string; type: string; category: string
  title: string; body: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  is_read: boolean; action_url?: string; created_at: string
}

// Rewards
export interface Badge {
  id: string; name: string; description: string
  icon: string; category: string; earned_at?: string
  is_earned: boolean
}
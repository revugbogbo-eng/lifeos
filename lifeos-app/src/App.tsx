import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAppStore } from './store'
import { supabase } from './lib/supabase'
import { AppShell } from './components/layout/AppShell'
import { Auth } from './pages/Auth'
import { LifeScore } from './pages/LifeScore'
import { Dashboard } from './pages/Dashboard' 
import { Finance } from './pages/Finance'
import { Goals } from './pages/Goals'
import { Admin } from './pages/Admin'
import { Health } from './pages/Health'
import { Learning } from './pages/Learning'
import { Career } from './pages/Career'
import { Knowledge } from './pages/Knowledge'
import { Community } from './pages/Community'
import { Family } from './pages/Family'
import { Giving } from './pages/Giving'
import { AiAssistant } from './pages/AIAssistant'
import { Rewards } from './pages/Rewards'
import { Settings } from './pages/Settings'
import { SkeletonLoader } from './components/ui/SkeletonLoader'
import { Investments } from './pages/Investments'
import { Marketplace } from './pages/Marketplace'
import { HomeProperty } from './pages/HomeProperty'
import { Travel } from './pages/Travel'
import { DigitalIdentity } from './pages/DigitalIdentity'
import { MentalWellness } from './pages/MentalWellness'
import { Emergency } from './pages/Emergency'
import { Sustainability } from './pages/Sustainability'

// Simple Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, setIsLoading, setUser } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Mocking profile fields matching UserProfile interface
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'LifeOS User',
          username: session.user.user_metadata?.username || 'user',
          avatar_emoji: '⚡',
          currency: 'USD',
          language: 'en',
          theme: 'dark',
          life_score: 75,
          created_at: session.user.created_at,
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'LifeOS User',
          username: session.user.user_metadata?.username || 'user',
          avatar_emoji: '⚡',
          currency: 'USD',
          language: 'en',
          theme: 'dark',
          life_score: 75,
          created_at: session.user.created_at,
        })
      } else {
        setUser(null)
        navigate('/auth')
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setIsLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#07070f]">
        <div className="w-full max-w-md p-6">
          <p className="text-los-purple text-center mb-4 font-semibold animate-pulse">Securing session...</p>
          <SkeletonLoader variant="card" />
        </div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />
}

// Temporary view component to act as a placeholder for the 22 pages
const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="p-6 glass-card text-los-text">
    <h1 className="text-2xl font-bold mb-2 text-los-purple">{title}</h1>
    <p className="text-los-text2">This module is fully registered in the App routing shell. Ready for interface injection.</p>
  </div>
)

export const App = () => {
  return (
    <Routes>
      {/* Auth Route */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected App Routes Layout */}
      <Route path="/" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="life-score" element={<LifeScore />} />
        <Route path="finance" element={<Finance />} />
        <Route path="investments" element={<Investments />} />
        <Route path="home-property" element={<HomeProperty />} />
        <Route path="documents" element={<Admin />} />
        <Route path="travel" element={<Travel />} />
        <Route path="digital-identity" element={<DigitalIdentity />} />
        <Route path="health" element={<Health />} />
        <Route path="wellness" element={<MentalWellness />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="goals" element={<Goals />} />
        <Route path="career" element={<Career />} />
        <Route path="learning" element={<Learning />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="community" element={<Community />} />
        <Route path="family" element={<Family />} />
        <Route path="giving" element={<Giving />} />
        <Route path="ai-assistant" element={<AiAssistant />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="sustainability" element={<Sustainability />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="settings" element={<Settings />} />

      </Route>

      {/* Fallback Catch All */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
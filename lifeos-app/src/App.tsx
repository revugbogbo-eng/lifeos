import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAppStore } from './store'
import { supabase } from './lib/supabase'
import { AppShell } from './components/layout/AppShell'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard' 
import { SkeletonLoader } from './components/ui/SkeletonLoader'

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
        <Route path="life-score" element={<PagePlaceholder title="Life Score Tracking" />} />
        <Route path="finance" element={<PagePlaceholder title="Finance Hub" />} />
        <Route path="investments" element={<PagePlaceholder title="Investment Portfolio" />} />
        <Route path="documents" element={<PagePlaceholder title="Document Vault" />} />
        <Route path="home-property" element={<PagePlaceholder title="Home & Property" />} />
        <Route path="travel" element={<PagePlaceholder title="Travel Hub" />} />
        <Route path="digital-identity" element={<PagePlaceholder title="Digital Identity" />} />
        <Route path="health" element={<PagePlaceholder title="Health Center" />} />
        <Route path="wellness" element={<PagePlaceholder title="Mental Wellness" />} />
        <Route path="emergency" element={<PagePlaceholder title="Emergency & Safety" />} />
        <Route path="goals" element={<PagePlaceholder title="Life Goals & Milestones" />} />
        <Route path="career" element={<PagePlaceholder title="Career Management Hub" />} />
        <Route path="learning" element={<PagePlaceholder title="Skill Acquisition & Learning" />} />
        <Route path="knowledge" element={<PagePlaceholder title="Knowledge Base Wiki" />} />
        <Route path="community" element={<PagePlaceholder title="Social Interaction Node" />} />
        <Route path="family" element={<PagePlaceholder title="Family Hub Connections" />} />
        <Route path="giving" element={<PagePlaceholder title="Legacy & Giving Vault" />} />
        <Route path="ai-assistant" element={<PagePlaceholder title="Automated AI Core" />} />
        <Route path="rewards" element={<PagePlaceholder title="Gamified Rewards System" />} />
        <Route path="sustainability" element={<PagePlaceholder title="Eco-Footprint Optimization" />} />
        <Route path="marketplace" element={<PagePlaceholder title="E-Commerce Hub" />} />
        <Route path="settings" element={<PagePlaceholder title="Global System Settings" />} />
      </Route>

      {/* Fallback Catch All */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
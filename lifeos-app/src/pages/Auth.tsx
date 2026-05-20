import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { toast } from '../store'
import { useNavigate } from 'react-router-dom'
import { isValidEmail } from '../lib/security'
import { supabase } from '../lib/supabase' // Standard top-level import to clear typescript errors
import { Shield, Mail, Lock, User, Sparkles } from 'lucide-react'

export const Auth = () => {
  const { signIn, signUp, loading, authError } = useAuth()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  // MONITOR FORCE GATE: Check session on load and actively watch for state changes
  useEffect(() => {
    // 1. Immediate validation of existing local storage tokens
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      }
    })

    // 2. Active subscription listener to forward the user the moment sign-in succeeds
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    // Basic Form Validations using security utilities
    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.')
      return
    }

    if (isSignUp && !fullName.trim()) {
      setValidationError('Please enter your full name.')
      return
    }

    if (isSignUp) {
      await signUp(email, password, fullName)
    } else {
      await signIn(email, password)
    }
  }

  const handleMockGoogleLogin = () => {
    toast.info('Google Auth', 'OAuth2 single sign-on redirect simulation initiated.')
  }

  return (
    <div className="min-h-screen bg-[#07070f] text-[#f1f1f8] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* Background Decorative Nebula Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-los-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-los-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Brand Architecture Identification Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-los-purple to-los-purple2 flex items-center justify-center font-black text-white tracking-wider text-xl shadow-xl shadow-los-purple/20 mx-auto mb-3.5 animate-float">
            Ω
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-los-text2 bg-clip-text text-transparent">
            Life<span className="text-los-purple">OS</span>
          </h1>
          <p className="text-[11px] text-los-text3 tracking-wider uppercase mt-1">
            Personal Sovereignty Management Subsystem
          </p>
        </div>

        {/* Core Auth Panel Card Wrapper */}
        <Card className="border-white/[0.08] shadow-2xl p-6 bg-[#0f0f1a]/90 backdrop-blur-xl">
          <div className="mb-5 select-none">
            <h2 className="text-xs font-bold tracking-wider text-los-text uppercase">
              {isSignUp ? 'Initialize Profile Matrix' : 'Establish Secure Session'}
            </h2>
            <p className="text-[11px] text-los-text2 mt-0.5">
              {isSignUp ? 'Create credentials to provision an encrypted local sandbox.' : 'Provide authorized tokens to sync core data clusters.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wide text-los-text3 uppercase">Full Name</label>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-3.5 text-los-text3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g., John Doe"
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-xs text-los-text placeholder:text-los-text3 focus:border-los-purple/50 focus:bg-white/[0.04] outline-none transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wide text-los-text3 uppercase">Email Protocol Link</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-3.5 text-los-text3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="identity@domain.com"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-xs text-los-text placeholder:text-los-text3 focus:border-los-purple/50 focus:bg-white/[0.04] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wide text-los-text3 uppercase">Cipher Password</label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-3.5 text-los-text3" />
                <input
                  type="password"
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-xs text-los-text placeholder:text-los-text3 focus:border-los-purple/50 focus:bg-white/[0.04] outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Error Message Diagnostics Overlays */}
            {(validationError || authError) && (
              <div className="p-2.5 rounded-xl bg-los-red/10 border border-los-red/20 text-los-red text-[10px] font-medium leading-relaxed">
                <span>{validationError || authError}</span>
              </div>
            )}

            {/* Submit Actions Panel */}
            <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-xs mt-2">
              {isSignUp ? 'Provision Node' : 'Authenticate Entry'}
            </Button>
          </form>

          <div className="relative my-5 select-none">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.04]" /></div>
            <div className="relative flex justify-center text-[9px] font-bold tracking-wider text-los-text3 uppercase">
              <span className="bg-[#0f0f1a] px-2.5">Alternative Handshake</span>
            </div>
          </div>

          {/* Third-Party Federation OAuth Mock Integration */}
          <button
            onClick={handleMockGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-semibold text-los-text2 hover:bg-white/[0.05] hover:text-los-text transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Federate via Google Identity</span>
          </button>
        </Card>

        {/* Matrix Mode Switch Controller Anchor */}
        <div className="text-center mt-4 select-none">
          <button
            onClick={() => { setIsSignUp(!isSignUp); setValidationError(null); }}
            className="text-[11px] text-los-text3 hover:text-los-purple transition-all duration-150 inline-flex items-center gap-1.5"
          >
            <Sparkles size={11} className="text-los-purple animate-pulse" />
            <span>
              {isSignUp ? 'Already mapped? Request session validation access.' : 'New node cluster? Register unique profile schema parameters.'}
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore, toast } from '../store'
import { isRateLimited } from '../lib/security'
import type { UserProfile } from '../types'

export const useAuth = () => {
  const { setUser, setIsLoading } = useAppStore()
  const [authError, setAuthError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Sign In function with built-in security rate limiting
  const signIn = async (email: string, password: string) => {
    setAuthError(null)
    
    // Prevent brute-force attacks locally
    if (isRateLimited('login_attempt', 5, 60000)) {
      const errMsg = 'Too many login attempts. Please try again in 1 minute.'
      setAuthError(errMsg)
      toast.error('Security Block', errMsg)
      return false
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session?.user) {
        toast.success('Welcome Back!', 'Access granted to LifeOS.')
        return true
      }
      return false
    } catch (err: any) {
      const errMsg = err.message || 'Failed to sign in'
      setAuthError(errMsg)
      toast.error('Authentication Failed', errMsg)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Sign Up function to register new profiles
  const signUp = async (email: string, password: string, fullName: string) => {
    setAuthError(null)
    setLoading(true)
    try {
      const username = email.split('@')[0].toLowerCase() + Math.floor(Math.random() * 1000)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        toast.success('Registration Successful', 'Check your email for a confirmation link if required.')
        return true
      }
      return false
    } catch (err: any) {
      const errMsg = err.message || 'Failed to sign up'
      setAuthError(errMsg)
      toast.error('Registration Failed', errMsg)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Sign Out function
  const signOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      toast.info('Logged Out', 'You have been securely signed out.')
    } catch (err: any) {
      toast.error('Sign Out Error', err.message || 'Failed to log out')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signIn,
    signUp,
    signOut,
    loading,
    authError,
  }
}

/**
 * LifeOS Security Utilities
 * Use these everywhere user input is handled
 */

// Clean text to prevent attacks
export const sanitize = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()

// Check email is valid format
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Password strength checker (returns 0-5)
export const passwordStrength = (password: string): {
  score: number; label: string; color: string
} => {
  let score = 0
  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { score: 0, label: 'Too weak',  color: '#ff4d6d' },
    { score: 1, label: 'Weak',      color: '#f97316' },
    { score: 2, label: 'Fair',      color: '#f59e0b' },
    { score: 3, label: 'Good',      color: '#22c55e' },
    { score: 4, label: 'Strong',    color: '#00d4aa' },
    { score: 5, label: 'Very Strong', color: '#7c6fff' },
  ]
  return map[Math.min(score, 5)]
}

// Safe keys allowed in localStorage
const SAFE_KEYS = [
  'lifeos_theme', 'lifeos_currency', 'lifeos_language',
  'lifeos_sidebar', 'lifeos_onboarded', 'lifeos_push_dismissed'
]

export const safeStore = {
  set: (key: string, value: string): void => {
    if (!SAFE_KEYS.includes(key)) return
    localStorage.setItem(key, value)
  },
  get: (key: string): string | null => {
    if (!SAFE_KEYS.includes(key)) return null
    return localStorage.getItem(key)
  },
  remove: (key: string): void => {
    if (!SAFE_KEYS.includes(key)) return
    localStorage.removeItem(key)
  }
}

// Simple rate limiter
const rateLimits = new Map<string, number[]>()
export const isRateLimited = (
  action: string,
  max = 5,
  windowMs = 60000
): boolean => {
  const now = Date.now()
  const hits = (rateLimits.get(action) || []).filter(t => now - t < windowMs)
  if (hits.length >= max) return true
  rateLimits.set(action, [...hits, now])
  return false
}
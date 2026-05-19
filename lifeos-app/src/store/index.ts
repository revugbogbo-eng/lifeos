
import { create } from 'zustand'
import type { UserProfile, AppNotification } from '../types'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
}

interface AppStore {
  // User
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void

  // Navigation
  activePage: string
  setActivePage: (page: string) => void

  // Sidebar
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void

  // Theme
  theme: 'dark' | 'light' | 'amoled'
  setTheme: (theme: 'dark' | 'light' | 'amoled') => void

  // Notifications
  notifications: AppNotification[]
  setNotifications: (n: AppNotification[]) => void
  unreadCount: number
  setUnreadCount: (n: number) => void

  // Toasts (popup messages)
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // Loading
  isLoading: boolean
  setIsLoading: (v: boolean) => void

  // Search
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  sidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  unreadCount: 0,
  setUnreadCount: (n) => set({ unreadCount: n }),

  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    // Auto-remove after 4 seconds
    setTimeout(() => get().removeToast(id), 4000)
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  isLoading: false,
  setIsLoading: (v) => set({ isLoading: v }),

  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),
}))

// Helper function to show toasts from anywhere
export const toast = {
  success: (title: string, message?: string) =>
    useAppStore.getState().addToast({ type: 'success', title, message }),
  error: (title: string, message?: string) =>
    useAppStore.getState().addToast({ type: 'error', title, message }),
  warning: (title: string, message?: string) =>
    useAppStore.getState().addToast({ type: 'warning', title, message }),
  info: (title: string, message?: string) =>
    useAppStore.getState().addToast({ type: 'info', title, message }),
}
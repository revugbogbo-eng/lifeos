import React, { useState } from 'react'
import { useAppStore, toast } from '../../store'
import { useAuth } from '../../hooks/useAuth'
import { Search, Bell, LogOut, User, Settings, Award } from 'lucide-react'

export const Topbar = () => {
  const { user, setSearchOpen, unreadCount } = useAppStore()
  const { signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMockSearch = () => {
    setSearchOpen(true)
    toast.info('Global Search', 'Index scanning overlay activated.')
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 md:px-6 z-30 select-none">
      
      {/* Brand Identity / Logo Frame */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-los-purple to-los-purple2 flex items-center justify-center font-black text-white tracking-wider text-sm shadow-lg shadow-los-purple/20">
          Ω
        </div>
        <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white to-los-text2 bg-clip-text text-transparent">
          Life<span className="text-los-purple">OS</span>
        </span>
      </div>

      {/* Center Command Search Trigger Interface Bar */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div 
          onClick={handleMockSearch}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-los-text3 hover:text-los-text2 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
        >
          <Search size={14} className="text-los-text3" />
          <span className="text-xs">Search files, financial modules, logs... (Press Ctrl+K)</span>
        </div>
      </div>

      {/* Right Core Action Widgets Panel */}
      <div className="flex items-center gap-3">
        
        {/* Dynamic Life Score Performance Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-los-purple/10 border border-los-purple/20 text-los-purple text-xs font-semibold cursor-help">
          <Award size={13} className="animate-pulse" />
          <span>LQ: {user?.life_score || 0}</span>
        </div>

        {/* System Alert / Push Notification Anchor Node */}
        <button 
          onClick={() => toast.info('System Notifications', 'No unread push payloads pending matching your profile schema.')}
          className="p-2 rounded-xl text-los-text2 hover:bg-white/[0.03] hover:text-los-text relative transition-all duration-150"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-los-red animate-ping" />
          )}
        </button>

        {/* User Account Menu Controller Dropdown Element */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/[0.03] transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-lg bg-los-card2 border border-white/[0.08] flex items-center justify-center text-sm shadow-inner">
              {user?.avatar_emoji || '👤'}
            </div>
          </button>

          {dropdownOpen && (
            <>
              {/* Backplane screen mask listener to auto-close menu on clear touch */}
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              
              <div className="absolute right-0 mt-2 w-52 glass-card bg-[#141428]/95 border border-white/[0.08] shadow-2xl p-1.5 z-50 text-xs animate-fade-in animate-scale-up">
                <div className="px-2.5 py-2 border-b border-white/[0.04] mb-1">
                  <p className="font-semibold text-los-text truncate">{user?.full_name}</p>
                  <p className="text-[10px] text-los-text3 truncate mt-0.5">{user?.email}</p>
                </div>

                <button 
                  onClick={() => { setDropdownOpen(false); toast.info('Profile Node', 'Redirecting identity module context.'); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-los-text2 hover:bg-white/[0.03] hover:text-los-text transition-all duration-150 text-left"
                >
                  <User size={13} />
                  <span>My Identity Profile</span>
                </button>

                <button 
                  onClick={() => { setDropdownOpen(false); toast.info('System Matrix', 'Accessing platform diagnostics parameters.'); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-los-text2 hover:bg-white/[0.03] hover:text-los-text transition-all duration-150 text-left"
                >
                  <Settings size={13} />
                  <span>Account Configuration</span>
                </button>

                <div className="h-px bg-white/[0.04] my-1" />

                <button
                  onClick={() => { setDropdownOpen(false); signOut(); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-los-red hover:bg-los-red/10 transition-all duration-150 text-left font-medium"
                >
                  <LogOut size={13} />
                  <span>Terminate Session</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  )
}
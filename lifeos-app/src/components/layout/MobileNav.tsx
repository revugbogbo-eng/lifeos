import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, DollarSign, Heart, Users, MessageSquare } from 'lucide-react'

interface MobileNavItem {
  path: string
  label: string
  icon: React.ReactNode
}

export const MobileNav = () => {
  const location = useLocation()

  const navItems: MobileNavItem[] = [
    { path: '/dashboard', label: 'Home', icon: <Home size={20} /> },
    { path: '/finance', label: 'Finance', icon: <DollarSign size={20} /> },
    { path: '/health', label: 'Health', icon: <Heart size={20} /> },
    { path: '/community', label: 'Community', icon: <Users size={20} /> },
    { path: '/ai-assistant', label: 'AI Core', icon: <MessageSquare size={20} /> },
  ]

  return (
    <div className="h-full w-full flex items-center justify-around px-2 select-none bg-[#0f0f1a]/95">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={idx}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all duration-200 relative ${
              isActive ? 'text-los-purple font-semibold' : 'text-los-text2 hover:text-los-text'
            }`}
          >
            {/* Top glowing active line indicator */}
            {isActive && (
              <span className="absolute top-0 left-2 right-2 h-[2px] bg-los-purple rounded-full shadow-lg shadow-los-purple/50" />
            )}
            
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight truncate">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
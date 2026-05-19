import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../../store'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarItem {
  path: string
  label: string
  emoji: string
}

interface SidebarGroup {
  title: string
  items: SidebarItem[]
}

export const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore()
  const location = useLocation()

  const menuGroups: SidebarGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', label: 'Dashboard', emoji: '📊' },
        { path: '/life-score', label: 'Life Score', emoji: '⚡' },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { path: '/finance', label: 'Finance Hub', emoji: '💰' },
        { path: '/investments', label: 'Investments', emoji: '📈' },
        { path: '/marketplace', label: 'Marketplace', emoji: '🛒' },
      ],
    },
    {
      title: 'LIFE',
      items: [
        { path: '/documents', label: 'Document Vault', emoji: '📂' },
        { path: '/home-property', label: 'Home & Property', emoji: '🏠' },
        { path: '/travel', label: 'Travel Hub', emoji: '✈️' },
        { path: '/digital-identity', label: 'Digital Identity', emoji: '🔑' },
      ],
    },
    {
      title: 'HEALTH',
      items: [
        { path: '/health', label: 'Health Center', emoji: '🏥' },
        { path: '/wellness', label: 'Mental Wellness', emoji: '🧠' },
        { path: '/emergency', label: 'Emergency & Safety', emoji: '🚨' },
      ],
    },
    {
      title: 'GROWTH',
      items: [
        { path: '/goals', label: 'Life Goals', emoji: '🎯' },
        { path: '/career', label: 'Career Hub', emoji: '💼' },
        { path: '/learning', label: 'Learning Hub', emoji: '🎓' },
        { path: '/knowledge', label: 'Knowledge Base', emoji: '📚' },
      ],
    },
    {
      title: 'COMMUNITY',
      items: [
        { path: '/community', label: 'Community', emoji: '🤝' },
        { path: '/family', label: 'Family Hub', emoji: '👨‍👩‍👧‍👦' },
        { path: '/giving', label: 'Giving & Legacy', emoji: '🎁' },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { path: '/ai-assistant', label: 'AI Assistant', emoji: '🤖' },
        { path: '/rewards', label: 'Rewards', emoji: '🏆' },
        { path: '/sustainability', label: 'Sustainability', emoji: '🌱' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/settings', label: 'Settings', emoji: '⚙️' },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col justify-between p-3 select-none">
      {/* Scrollable links viewport area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 space-y-6 scrollbar-thin">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {!sidebarCollapsed && (
              <h4 className="text-[10px] font-bold tracking-wider text-los-text3 px-3 uppercase">
                {group.title}
              </h4>
            )}
            <div className="space-y-0.5">
              {group.items.map((item, iIdx) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={iIdx}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-los-purple/10 text-los-purple font-medium border-l-2 border-los-purple pl-[10px] rounded-l-none'
                        : 'text-los-text2 hover:bg-white/[0.03] hover:text-los-text'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    {!sidebarCollapsed && (
                      <span className="text-xs truncate transition-all duration-200">
                        {item.label}
                      </span>
                    )}

                    {/* Tooltip box on collapsed layout hover state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-14 bg-los-card2 text-los-text border border-white/[0.06] text-[11px] px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:left-16 transition-all duration-200 whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse structural toggle controls at base of sidebar frame */}
      <div className="pt-2 border-t border-white/[0.04]">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl text-los-text3 hover:text-los-text2 hover:bg-white/[0.03] transition-all duration-200"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  )
}
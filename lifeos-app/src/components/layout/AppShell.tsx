import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppStore } from '../../store'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { MobileNav } from './MobileNav'

export const AppShell = () => {
  const { sidebarCollapsed } = useAppStore()

  return (
    <div className="min-h-screen bg-[#07070f] text-[#f1f1f8] flex flex-col font-sans selection:bg-los-purple/30">
      {/* Top Navigation Bar */}
      <Topbar />

      <div className="flex flex-1 pt-16 pb-16 md:pb-0">
        {/* Sidebar Layout - Hidden on mobile, visible on medium screens and up */}
        <aside 
          className={`fixed left-0 top-16 bottom-0 hidden md:block z-20 transition-all duration-300 border-r border-white/[0.06] bg-[#0f0f1a]/80 backdrop-blur-xl ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <Sidebar />
        </aside>

        {/* Main Panel App Content Dynamic Injection Viewport */}
        <main 
          className={`flex-1 w-full transition-all duration-300 min-h-[calc(100vh-4rem)] ${
            sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom Nav Bar - Visible on mobile screens, hidden on desktop */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 md:hidden z-30 border-t border-white/[0.06] bg-[#0f0f1a]/90 backdrop-blur-xl">
        <MobileNav />
      </nav>
    </div>
  )
}
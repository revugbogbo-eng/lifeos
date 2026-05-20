import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, User, Palette, Bell, Shield, 
  Database, Smartphone, Key, Download, Trash2, CheckCircle2 
} from 'lucide-react'

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({ email: true, push: false, weeklyReport: true })

  const tabs = [
    { id: 'profile', label: 'Identity Matrix', icon: <User size={16} /> },
    { id: 'appearance', label: 'Interface & Theme', icon: <Palette size={16} /> },
    { id: 'notifications', label: 'Alert Protocols', icon: <Bell size={16} /> },
    { id: 'security', label: 'Security & Access', icon: <Shield size={16} /> },
    { id: 'data', label: 'Data Sovereignty', icon: <Database size={16} /> },
  ]

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <SettingsIcon size={28} className="text-los-text3" /> System Configuration
          </h1>
          <p className="text-los-text2 text-sm mt-1">Calibrate your LifeOS environment and security parameters.</p>
        </div>
        <button className="px-5 py-2 rounded-xl bg-los-purple text-white text-xs font-bold hover:bg-los-purple/80 transition-all shadow-lg shadow-los-purple/20">
          Save Configuration
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* 2. SETTINGS NAVIGATION (Left Sidebar) */}
        <motion.div variants={itemVariants} className="md:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-los-purple/10 text-los-purple border border-los-purple/20' 
                  : 'text-los-text3 hover:text-los-text hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* 3. SETTINGS CONTENT (Right Area) */}
        <motion.div variants={itemVariants} className="md:col-span-3 glass-card bg-[#0f0f1a]/80 border border-white/[0.06] rounded-2xl min-h-[500px]">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-6">Identity Matrix</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-los-purple to-los-teal p-1">
                  <div className="w-full h-full bg-[#0f0f1a] rounded-full flex items-center justify-center text-xl font-black text-white">
                    Ω
                  </div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg text-xs font-bold text-white transition-colors mb-2">
                    Upload New Avatar
                  </button>
                  <p className="text-[10px] text-los-text3">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider">Display Name</label>
                    <input type="text" defaultValue="Daniel Ewarami" className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-purple outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider">Operating Location</label>
                    <input type="text" defaultValue="Nigeria" className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-purple outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider">System Bio</label>
                  <textarea rows={3} defaultValue="Undergraduate Researcher & Tech Entrepreneur. Building systems for waste-to-wealth and AI automation." className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-purple outline-none resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-6">Interface & Theme</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider block mb-3">Core Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Cyberpunk Dark', 'Midnight Minimal', 'Light Mode'].map((theme, i) => (
                      <button key={i} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${i === 0 ? 'bg-los-purple/10 border-los-purple text-white' : 'bg-white/[0.02] border-white/[0.05] text-los-text2 hover:border-white/[0.2]'}`}>
                        <div className={`w-full h-12 rounded-lg ${i === 0 ? 'bg-[#07070f]' : i === 1 ? 'bg-gray-900' : 'bg-gray-100'} border border-white/[0.1]`} />
                        <span className="text-xs font-bold">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider block mb-3">Accent Energy</label>
                  <div className="flex gap-3">
                    {['#7c6fff', '#00d4aa', '#ffb703', '#ff4d6d'].map((color, i) => (
                      <button key={i} className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${i === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0f0f1a]' : ''}`} style={{ backgroundColor: color }}>
                        {i === 0 && <CheckCircle2 size={14} className="text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-6">Security & Access</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-los-teal/10 text-los-teal"><Key size={18} /></div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Update Cipher Key</h3>
                      <p className="text-[10px] text-los-text2 mt-0.5">Change your master login password.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg text-xs font-bold text-white transition-colors">
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-los-purple/10 text-los-purple"><Smartphone size={18} /></div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h3>
                      <p className="text-[10px] text-los-text2 mt-0.5">Secure your OS with an authenticator app.</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-white/[0.1] rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-los-text3 rounded-full absolute left-0 shadow-md transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <div className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-6">Data Sovereignty</h2>
              
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2"><Download size={16} className="text-los-teal"/> Export OS Data</h3>
                  <p className="text-xs text-los-text2 mb-4 leading-relaxed">
                    Download a complete JSON payload of your entire LifeOS database, including all journals, tasks, and financial logs. Your data belongs to you.
                  </p>
                  <button className="px-4 py-2 bg-los-teal/10 text-los-teal border border-los-teal/20 rounded-lg text-xs font-bold hover:bg-los-teal hover:text-[#0f0f1a] transition-all">
                    Initiate Download
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-los-red/20 bg-los-red/5 mt-8">
                  <h3 className="text-sm font-bold text-los-red flex items-center gap-2 mb-2"><Trash2 size={16} /> Terminate Account</h3>
                  <p className="text-xs text-los-text2 mb-4 leading-relaxed">
                    Permanently delete your account and wipe all data clusters from the Supabase servers. This action cannot be reversed.
                  </p>
                  <button className="px-4 py-2 bg-los-red text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors">
                    Delete My Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </motion.div>
  )
}
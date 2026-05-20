import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, CheckCircle2, XCircle, ChevronDown, ChevronUp, Trophy, Zap, Wallet, Heart, Target, FileText, Brain, Users } from 'lucide-react'

// --- MOCK DATA ---
const scoreHistory = [
  { month: 'Nov', score: 650 }, { month: 'Dec', score: 680 },
  { month: 'Jan', score: 695 }, { month: 'Feb', score: 710 },
  { month: 'Mar', score: 712 }, { month: 'Apr', score: 724 },
]

const domains = [
  {
    id: 'financial', title: 'Financial Health', icon: <Wallet size={18} />, color: 'gold', score: 165, max: 200,
    helping: ['Bills paid on time this month', 'Savings rate > 20%'],
    hurting: ['Slight overspend in Dining out'],
    actions: ['Review upcoming Sallah budget', 'Automate next savings transfer', 'Cancel unused Spotify sub']
  },
  {
    id: 'health', title: 'Health & Wellness', icon: <Heart size={18} />, color: 'green', score: 140, max: 200,
    helping: ['Perfect medication streak', 'Hit 10k steps 4x this week'],
    hurting: ['Sleep average < 6 hours', 'Skipped annual checkup'],
    actions: ['Schedule dentist appointment', 'Set a 10PM sleep alarm', 'Log today\'s water intake']
  },
  {
    id: 'goals', title: 'Goal Progress', icon: <Target size={18} />, color: 'purple', score: 120, max: 150,
    helping: ['Emergency fund goal on track', 'Consistent reading habit'],
    hurting: ['Python course milestone overdue'],
    actions: ['Complete 1 Python module today', 'Update Q2 goals', 'Check off habit tracker']
  },
  {
    id: 'admin', title: 'Life Admin', icon: <FileText size={18} />, color: 'blue', score: 135, max: 150,
    helping: ['All identity docs valid', 'Car maintenance up to date'],
    hurting: ['Passport expires in 45 days'],
    actions: ['Start passport renewal process', 'Pay upcoming DSTV bill', 'Backup laptop files']
  },
  {
    id: 'growth', title: 'Growth & Learning', icon: <Brain size={18} />, color: 'teal', score: 95, max: 150,
    helping: ['Read 2 books this month'],
    hurting: ['No new courses started', 'Low weekly learning hours'],
    actions: ['Enroll in Advanced React course', 'Listen to finance podcast', 'Update resume skills']
  },
  {
    id: 'community', title: 'Community & Giving', icon: <Users size={18} />, color: 'red', score: 69, max: 150,
    helping: ['Donated to local orphanage'],
    hurting: ['Low community engagement this week'],
    actions: ['Message Tunde to catch up', 'Share latest milestone', 'Find volunteer opportunity']
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export const LifeScore = () => {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null)

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* HEADER & MAIN SCORE */}
      <motion.div variants={itemVariants} className="text-center space-y-2 mt-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Your Life Score</h1>
        <p className="text-xs text-los-text2 uppercase tracking-widest">Holistic System Status</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-los-purple to-los-teal opacity-20 rounded-full blur-[80px] pointer-events-none" />
        <div className="glass-card bg-[#0f0f1a]/80 border border-white/[0.08] p-10 rounded-full w-64 h-64 flex flex-col items-center justify-center relative shadow-[0_0_40px_rgba(124,111,255,0.15)]">
          {/* Animated SVG Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <motion.circle 
              cx="128" cy="128" r="120" fill="none" stroke="url(#scoreGradient)" strokeWidth="6" 
              strokeDasharray="753.6" strokeDashoffset="200" strokeLinecap="round"
              initial={{ strokeDashoffset: 753.6 }}
              animate={{ strokeDashoffset: 206 }} // Represents 72.4% of the circle
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c6fff" />
                <stop offset="100%" stopColor="#00d4aa" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-6xl font-black bg-gradient-to-b from-white to-los-text2 bg-clip-text text-transparent mb-2">724</span>
          <span className="text-xs font-bold text-los-green flex items-center bg-los-green/10 px-3 py-1 rounded-full border border-los-green/20">
            <TrendingUp size={14} className="mr-1.5" /> +12 this week
          </span>
        </div>
      </motion.div>

      {/* STATS & COMPARISON */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-1">Peer Comparison</h3>
            <p className="text-sm font-medium text-los-text">You score higher than <span className="text-los-teal font-bold">68%</span> of users</p>
          </div>
          <Users className="text-los-teal/50" size={32} />
        </div>
        <div className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-1">Next Milestone</h3>
            <p className="text-sm font-medium text-los-text"><span className="text-los-gold font-bold">750:</span> Diamond Tier Status</p>
          </div>
          <Trophy className="text-los-gold/50" size={32} />
        </div>
      </motion.div>

      {/* HISTORY CHART */}
      <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
        <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-6">Score History (6 Months)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#55556a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#00d4aa' }}
              />
              <Line type="monotone" dataKey="score" stroke="#00d4aa" strokeWidth={3} dot={{ r: 4, fill: '#00d4aa', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* DOMAIN PANELS */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-4 px-2">Domain Breakdown</h3>
        
        {domains.map((domain) => {
          const isExpanded = expandedDomain === domain.id
          const percentage = Math.round((domain.score / domain.max) * 100)
          
          return (
            <div key={domain.id} className="glass-card bg-[#141428]/80 border border-white/[0.04] rounded-xl overflow-hidden transition-colors hover:bg-white/[0.03]">
              
              {/* Panel Header (Clickable) */}
              <button 
                onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                className="w-full p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className={`p-2.5 rounded-lg bg-los-${domain.color}/10 text-los-${domain.color} border border-los-${domain.color}/20`}>
                    {domain.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-los-text">{domain.title}</h4>
                    <p className="text-[10px] text-los-text2 uppercase tracking-wider mt-0.5">{domain.score} / {domain.max} pts</p>
                  </div>
                </div>

                <div className="hidden md:flex flex-1 mx-8 items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-los-${domain.color} rounded-full`} 
                      initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs text-los-text3 font-medium w-8 text-right">{percentage}%</span>
                </div>

                <div className="text-los-text3 transition-transform duration-200">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/[0.04]"
                  >
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20">
                      
                      {/* Pros & Cons */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-2 flex items-center gap-1.5"><CheckCircle2 size={12} className="text-los-green"/> What's Helping</h5>
                          <ul className="space-y-1.5">
                            {domain.helping.map((item, i) => (
                              <li key={i} className="text-xs text-los-text2 flex items-start gap-2">
                                <span className="text-los-green mt-0.5">•</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-2 flex items-center gap-1.5"><XCircle size={12} className="text-los-red"/> What's Hurting</h5>
                          <ul className="space-y-1.5">
                            {domain.hurting.map((item, i) => (
                              <li key={i} className="text-xs text-los-text2 flex items-start gap-2">
                                <span className="text-los-red mt-0.5">•</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* AI Action Plan */}
                      <div className="bg-los-purple/5 border border-los-purple/10 rounded-xl p-4">
                        <h5 className="text-[10px] font-bold text-los-purple uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Zap size={12} className="fill-los-purple" /> AI Action Plan
                        </h5>
                        <div className="space-y-2">
                          {domain.actions.map((action, i) => (
                            <button key={i} className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-los-text hover:bg-los-purple hover:border-los-purple transition-all duration-200">
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>

    </motion.div>
  )
}
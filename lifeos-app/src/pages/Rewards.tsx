import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Shield, Zap, Target, Crown, Award, Unlock, Lock, ArrowRight, Shirt, TestTube } from 'lucide-react'

// --- MOCK DATA ---
const userLevel = {
  current: 12,
  title: 'System Architect',
  xp: 8450,
  nextLevelXp: 10000,
  rank: 'Platinum Tier'
}

const recentAchievements = [
  { id: 1, title: 'Code Warrior', description: '7-day coding streak maintained.', icon: <Zap size={20} className="text-los-teal" />, color: 'teal', date: 'Today' },
  { id: 2, title: 'Capital Allocator', description: 'Saved ₦500,000 in emergency fund.', icon: <Shield size={20} className="text-los-gold" />, color: 'gold', date: 'May 15' },
  { id: 3, title: 'Apparel Artisan', description: 'Completed first batch of customized luxury apparel.', icon: <Shirt size={20} className="text-los-orange" />, color: 'orange', date: 'May 10' },
  { id: 4, title: 'Lab Rat', description: 'Processed 50 abattoir wastewater samples.', icon: <TestTube size={20} className="text-los-purple" />, color: 'purple', date: 'May 05' },
]

const activeQuests = [
  { id: 1, title: 'Deep Work Protocol', task: 'Log 4 hours of uninterrupted study time.', reward: '+250 XP', progress: 65, status: 'Active' },
  { id: 2, title: 'Network Expansion', task: 'Follow up with 3 pending contacts in CRM.', reward: '+150 XP', progress: 33, status: 'Active' },
  { id: 3, title: 'Fitness Vanguard', task: 'Complete 3 HIIT workouts this week.', reward: '+300 XP', progress: 100, status: 'Claim Reward' },
]

const unlockableRewards = [
  { id: 1, title: 'Weekend Gaming Pass', cost: '1,500 XP', type: 'Leisure', isUnlocked: true },
  { id: 2, title: 'Buy New Tech Gadget', cost: '5,000 XP', type: 'Purchase', isUnlocked: true },
  { id: 3, title: 'Cheat Meal (Fine Dining)', cost: '10,000 XP', type: 'Lifestyle', isUnlocked: false },
]

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export const Rewards = () => {
  const progressPercent = (userLevel.xp / userLevel.nextLevelXp) * 100

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Trophy size={28} className="text-los-gold" /> Rewards & XP
          </h1>
          <p className="text-los-text2 text-sm mt-1">Gamify your reality. Turn discipline into digital achievements.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. LEVEL & PROGRESS (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-los-gold/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              
              {/* Level Badge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <motion.circle 
                    cx="64" cy="64" r="58" fill="none" stroke="#ffb703" strokeWidth="8" 
                    strokeDasharray="364" strokeDashoffset="364" strokeLinecap="round"
                    initial={{ strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 364 - (364 * progressPercent) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-los-gold font-bold tracking-widest uppercase">LVL</span>
                  <span className="text-4xl font-black text-white">{userLevel.current}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
                  <Crown size={18} className="text-los-gold" />
                  <h2 className="text-xl font-bold text-white tracking-wide">{userLevel.title}</h2>
                </div>
                <p className="text-xs text-los-text2 font-bold uppercase tracking-wider mb-6">{userLevel.rank}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-los-text">Experience Points</span>
                    <span className="text-los-gold">{userLevel.xp.toLocaleString()} / {userLevel.nextLevelXp.toLocaleString()} XP</span>
                  </div>
                  <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-los-orange to-los-gold rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 2 }}
                    />
                  </div>
                  <p className="text-[10px] text-los-text3 text-right mt-1">1,550 XP to Level 13</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Active Quests */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Target size={16} className="text-los-teal" /> Daily Quests
              </h3>
            </div>
            
            <div className="space-y-4">
              {activeQuests.map(quest => (
                <div key={quest.id} className={`p-4 rounded-xl border transition-all ${
                  quest.status === 'Claim Reward' 
                    ? 'bg-los-teal/10 border-los-teal/30 hover:bg-los-teal/20 cursor-pointer' 
                    : 'bg-white/[0.02] border-white/[0.04]'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className={`text-sm font-bold ${quest.status === 'Claim Reward' ? 'text-los-teal' : 'text-white'}`}>
                        {quest.title}
                      </h4>
                      <p className="text-[10px] text-los-text2 mt-1">{quest.task}</p>
                    </div>
                    <span className="text-xs font-black text-los-gold bg-los-gold/10 px-2.5 py-1 rounded-lg">
                      {quest.reward}
                    </span>
                  </div>
                  
                  {quest.status !== 'Claim Reward' && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-los-teal rounded-full"
                          initial={{ width: 0 }} animate={{ width: `${quest.progress}%` }} transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-los-text3 w-8 text-right">{quest.progress}%</span>
                    </div>
                  )}
                  {quest.status === 'Claim Reward' && (
                    <div className="text-[10px] font-bold text-los-teal uppercase tracking-wider text-center mt-2 animate-pulse">
                      Tap to Claim XP
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. BADGES & STORE (Right Column) */}
        <div className="space-y-6">
          
          {/* Recent Badges */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-los-purple" /> Recent Badges
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text transition-colors">
                View Gallery
              </button>
            </div>
            
            <div className="space-y-3">
              {recentAchievements.map(badge => (
                <div key={badge.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div className={`p-3 rounded-xl bg-los-${badge.color}/10 border border-los-${badge.color}/20 shrink-0`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-los-text">{badge.title}</h4>
                    <p className="text-[9px] text-los-text3 leading-tight mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rewards Store */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Star size={16} className="text-los-orange" /> Rewards Store
            </h3>
            
            <div className="space-y-3">
              {unlockableRewards.map(reward => (
                <div key={reward.id} className={`flex items-center justify-between p-3 rounded-xl border ${
                  reward.isUnlocked ? 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]' : 'bg-black/20 border-white/[0.02] opacity-60'
                } transition-all`}>
                  <div className="flex items-center gap-3">
                    <div className="text-los-text3">
                      {reward.isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${reward.isUnlocked ? 'text-los-text' : 'text-los-text3'}`}>{reward.title}</h4>
                      <span className="text-[9px] text-los-text3 uppercase tracking-wider">{reward.type}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black ${reward.isUnlocked ? 'text-los-gold' : 'text-los-text3'}`}>
                    {reward.cost}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-2.5 bg-los-gold/10 text-los-gold border border-los-gold/20 rounded-xl text-xs font-bold hover:bg-los-gold/20 transition-colors">
              Add Custom Reward
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
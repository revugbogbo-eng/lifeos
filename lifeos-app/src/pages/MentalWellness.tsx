import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Wind, BookHeart, Smile, Meh, Frown, Sparkles, Activity, ArrowRight, Plus } from 'lucide-react'

// --- MOCK DATA ---
const wellnessStats = [
  { label: 'Current Mood', value: 'Optimistic', icon: <Smile size={16} className="text-los-green" />, color: 'green' },
  { label: 'Stress Level', value: 'Elevated', icon: <Activity size={16} className="text-los-orange" />, color: 'orange' },
  { label: 'Mindful Minutes', value: '45 mins', icon: <Wind size={16} className="text-los-teal" />, color: 'teal' },
]

const journalEntries = [
  { 
    id: 1, 
    date: 'Today, 8:00 AM', 
    mood: 'optimistic', 
    title: 'Morning Brain Dump', 
    excerpt: 'Feeling a bit overwhelmed juggling the abattoir wastewater data analysis and coordinating the Ugbowo tech bootcamp tutors. Need to prioritize deep work blocks today to get the stats regression done.',
    tags: ['Research', 'Business', 'Focus']
  },
  { 
    id: 2, 
    date: 'Yesterday, 9:30 PM', 
    mood: 'relieved', 
    title: 'CAC Progress', 
    excerpt: 'The business registrations are finally moving forward in the portal. Big relief. Took a 15-minute walk to clear my head before bed.',
    tags: ['Wins', 'Relief']
  },
  { 
    id: 3, 
    date: 'May 16, 2026', 
    mood: 'tired', 
    title: 'Burnout Warning', 
    excerpt: 'Coding the e-commerce front-end took way longer than expected. Eyes are strained. Skipping the gym to rest my nervous system.',
    tags: ['Fatigue', 'Rest']
  }
]

const mindfulnessSessions = [
  { id: 1, title: 'NSDR / Yoga Nidra', duration: '20 mins', focus: 'Deep Rest', icon: <Wind size={18} className="text-los-teal" /> },
  { id: 2, title: 'Box Breathing', duration: '5 mins', focus: 'Acute Stress', icon: <Activity size={18} className="text-los-purple" /> },
  { id: 3, title: 'Unguided Meditation', duration: '15 mins', focus: 'Clarity', icon: <Brain size={18} className="text-los-gold" /> },
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

export const MentalWellness = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Mental Wellness</h1>
          <p className="text-los-text2 text-sm mt-1">Track cognitive load, mood patterns, and mental clarity.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Wind size={14} /> Breathe
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-purple to-los-teal text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-purple/20">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wellnessStats.map((stat, i) => (
          <div key={i} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
            <div className={`p-3 rounded-xl bg-los-${stat.color}/10 border border-los-${stat.color}/20`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-los-text3 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-black text-white mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. PRIVATE JOURNAL (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <BookHeart size={16} className="text-los-purple" /> Cognitive Journal
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View All <ArrowRight size={12}/>
              </button>
            </div>

            <div className="space-y-4">
              {journalEntries.map(entry => (
                <div key={entry.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all flex flex-col group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-bold text-white group-hover:text-los-purple transition-colors">{entry.title}</h4>
                    <span className="text-[10px] text-los-text3 flex items-center gap-1">
                      {entry.mood === 'optimistic' || entry.mood === 'relieved' ? <Smile size={12} className="text-los-green" /> : <Frown size={12} className="text-los-orange" />}
                      {entry.date}
                    </span>
                  </div>
                  
                  <p className="text-xs text-los-text2 leading-relaxed mb-4">
                    {entry.excerpt}
                  </p>
                  
                  <div className="flex gap-2 mt-auto pt-4 border-t border-white/[0.04]">
                    {entry.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-medium px-2 py-1 rounded bg-white/[0.03] text-los-text3 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. MINDFULNESS & INSIGHTS (Right Column) */}
        <div className="space-y-6">
          
          {/* Mindfulness Practices */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-los-teal" /> Neuro-Reset Protocols
            </h3>
            
            <div className="space-y-3">
              {mindfulnessSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#0f0f1a] border border-white/[0.05]">
                      {session.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-los-text group-hover:text-white transition-colors">{session.title}</h4>
                      <p className="text-[9px] text-los-text3 uppercase tracking-wider mt-0.5">Focus: {session.focus}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-white/[0.05] px-2 py-1 rounded">
                    {session.duration}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Cognitive Analysis */}
          <motion.div variants={itemVariants} className="glass-card bg-gradient-to-br from-[#0f0f1a] to-los-orange/5 border border-los-orange/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-los-orange/10 rounded-full blur-[40px] pointer-events-none" />
            <h3 className="text-[10px] font-bold text-los-orange uppercase tracking-wider mb-2">AI Cognitive Insight</h3>
            <p className="text-xs text-los-text2 leading-relaxed relative z-10 mb-4">
              Your journal sentiment over the last 72 hours indicates elevated stress levels linked to "Bootcamp Logistics" and "Research Data". 
            </p>
            <div className="p-3 bg-los-orange/10 rounded-lg border border-los-orange/20 text-xs font-bold text-los-orange flex items-center justify-center gap-2">
              <Activity size={14} /> Suggestion: Schedule 30m NSDR today.
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
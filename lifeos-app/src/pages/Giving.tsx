import React from 'react'
import { motion } from 'framer-motion'
import { Gift, HeartHandshake, Globe, Leaf, Clock, Target, ArrowRight, Plus, Award, CheckCircle2 } from 'lucide-react'

// --- MOCK DATA ---
const impactStats = [
  { label: 'Total Given (YTD)', value: '₦185,000', icon: <Gift size={16} className="text-los-gold" />, color: 'gold' },
  { label: 'Volunteer Hours', value: '45h', icon: <Clock size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Lives Impacted', value: '~120', icon: <Globe size={16} className="text-los-purple" />, color: 'purple' },
]

const legacyProjects = [
  {
    id: 1,
    title: 'Ugbowo Tech Bootcamp',
    focus: 'Youth Empowerment',
    description: 'Providing free AI automation and web development training to students in Benin City.',
    progress: 75,
    status: 'Active',
    icon: <Target size={20} className="text-los-teal" />,
    color: 'teal'
  },
  {
    id: 2,
    title: 'Waste-to-Wealth Initiative',
    focus: 'Environmental Sustainability',
    description: 'Developing frameworks for utilizing cultivatable fungi to break down agricultural waste.',
    progress: 40,
    status: 'Research Phase',
    icon: <Leaf size={20} className="text-los-green" />,
    color: 'green'
  }
]

const donations = [
  { id: 1, organization: 'Local Orphanage Trust', category: 'Charity', amount: '₦50,000', date: 'May 02, 2026', type: 'One-time' },
  { id: 2, organization: 'Monthly Tithe', category: 'Religious', amount: '₦110,000', date: 'April 28, 2026', type: 'Recurring' },
  { id: 3, organization: 'Clean Water Africa', category: 'Environment', amount: '₦25,000', date: 'March 15, 2026', type: 'One-time' },
]

const volunteerLog = [
  { id: 1, role: 'Lead Tech Instructor', organization: 'Ugbowo Initiative', hours: 12, date: 'Last Week' },
  { id: 2, role: 'Environmental Audit Rep', organization: 'FUPRE Community', hours: 8, date: 'April 2026' },
  { id: 3, role: 'Mentorship Call', organization: 'Junior Dev Network', hours: 2, date: 'Two Weeks Ago' },
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

export const Giving = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Giving & Legacy</h1>
          <p className="text-los-text2 text-sm mt-1">Track your impact, generosity, and long-term footprint.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Clock size={14} /> Log Hours
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-gold to-los-orange text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-gold/20">
            <Gift size={16} /> Record Donation
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactStats.map((stat, i) => (
          <div key={i} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-2xl flex items-center gap-4">
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
        
        {/* 3. LEGACY PROJECTS (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Globe size={16} className="text-los-teal" /> Long-Term Legacy Projects
              </h3>
              <button className="text-[10px] font-bold text-los-teal hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                <Plus size={12}/> New Initiative
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legacyProjects.map(project => (
                <div key={project.id} className="p-5 rounded-xl bg-[#141428]/60 border border-white/[0.04] hover:bg-white/[0.03] transition-all flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2.5 rounded-lg bg-los-${project.color}/10 border border-los-${project.color}/20`}>
                      {project.icon}
                    </div>
                    <span className={`text-[9px] font-bold bg-los-${project.color}/10 text-los-${project.color} px-2 py-1 rounded-md tracking-wider uppercase`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-los-text">{project.title}</h4>
                  <p className="text-[10px] text-los-text3 font-medium uppercase tracking-wider mt-1 mb-3">{project.focus}</p>
                  <p className="text-xs text-los-text2 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-[9px] font-bold text-los-text3 uppercase tracking-wider mb-1.5">
                      <span>Impact Goal</span>
                      <span className={`text-los-${project.color}`}>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-los-${project.color} rounded-full`}
                        initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1.5 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Volunteer Log */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-5">
              <HeartHandshake size={16} className="text-los-purple" /> Recent Volunteer Work
            </h3>
            <div className="space-y-3">
              {volunteerLog.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-los-purple/10 text-los-purple">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{log.role}</h4>
                      <p className="text-[10px] text-los-text3 mt-0.5">{log.organization} • {log.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-los-purple">+{log.hours} hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. FINANCIAL GIVING (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Gift size={16} className="text-los-gold" /> Financial Giving
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                History <ArrowRight size={12}/>
              </button>
            </div>
            
            <div className="space-y-4">
              {donations.map(donation => (
                <div key={donation.id} className="p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all group border-b border-white/[0.02] pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{donation.organization}</h4>
                      <p className="text-[10px] text-los-text3 mt-0.5">{donation.category}</p>
                    </div>
                    <CheckCircle2 size={14} className="text-los-green" />
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <span className="text-[9px] text-los-text2 uppercase tracking-wider bg-white/[0.03] px-2 py-1 rounded">
                      {donation.type}
                    </span>
                    <span className="text-sm font-bold text-los-gold">
                      {donation.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 border border-dashed border-los-gold/30 text-los-gold rounded-xl text-xs font-bold hover:bg-los-gold/10 transition-all">
              Set Up Recurring Gift
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
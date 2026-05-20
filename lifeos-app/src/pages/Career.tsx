import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Building, Code2, TrendingUp, Calendar, CheckCircle2, Circle, Plus, ArrowRight, FileSignature, Shirt, GraduationCap } from 'lucide-react'

// --- MOCK DATA ---
const stats = [
  { label: 'Active Ventures', value: '3', icon: <Building size={16} className="text-los-gold" />, color: 'gold' },
  { label: 'Pending Registrations', value: '2', icon: <FileSignature size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Client Meetings', value: '4', icon: <Calendar size={16} className="text-los-teal" />, color: 'teal' },
]

const activeProjects = [
  { 
    id: 1, 
    title: 'Tech & Automation Bootcamp', 
    subtitle: 'Ugbowo Initiative', 
    status: 'In Progress', 
    progress: 75, 
    icon: <Code2 size={20} className="text-los-teal" />, 
    color: 'teal',
    tasks: ['Recruit AI & Web Dev Tutors', 'Secure venue logistics', 'Finalize curriculum'] 
  },
  { 
    id: 2, 
    title: 'Luxury Apparel Retail', 
    subtitle: 'Sourcing & Customization Line', 
    status: 'Planning', 
    progress: 40, 
    icon: <Shirt size={20} className="text-los-orange" />, 
    color: 'orange',
    tasks: ['Finalize blank apparel suppliers', 'Test custom embroidery designs', 'Setup e-commerce front-end'] 
  },
  { 
    id: 3, 
    title: 'Divine Brothers Real Estate', 
    subtitle: 'CAC Registration & Setup', 
    status: 'Pending Auth', 
    progress: 90, 
    icon: <Building size={20} className="text-los-gold" />, 
    color: 'gold',
    tasks: ['Draft Objects of Memorandum', 'Configure share capital', 'Submit final CAC portal docs'] 
  },
  { 
    id: 4, 
    title: 'Wastewater E. coli Research', 
    subtitle: 'Final Year Project Data', 
    status: 'Data Analysis', 
    progress: 60, 
    icon: <GraduationCap size={20} className="text-los-purple" />, 
    color: 'purple',
    tasks: ['Complete susceptibility testing', 'Run statistical regression', 'Draft Chapter 3'] 
  }
]

const recentDeliverables = [
  { id: 1, name: 'Akraft Engineering Letterhead', client: 'Corporate Client', date: 'May 16, 2026', amount: '₦45,000', status: 'Completed' },
  { id: 2, name: 'E-commerce UI Layout', client: 'Retail Startup', date: 'May 12, 2026', amount: '₦120,000', status: 'Completed' },
  { id: 3, name: 'Network Security Audit', client: 'Local NGO', date: 'Pending Review', amount: '₦85,000', status: 'In Review' },
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

export const Career = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Career & Business Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Manage ventures, client projects, and professional growth.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Briefcase size={14} /> New Client
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-gold to-los-orange text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-gold/20">
            <Plus size={16} /> Launch Project
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
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
        
        {/* 3. ACTIVE PROJECTS & VENTURES (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={16} className="text-los-teal" /> Active Ventures & Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProjects.map(project => (
                <div key={project.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-lg bg-los-${project.color}/10 border border-los-${project.color}/20`}>
                      {project.icon}
                    </div>
                    <span className="text-[9px] font-bold text-los-text bg-white/[0.05] px-2 py-1 rounded-md tracking-wider uppercase">
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="text-sm font-bold text-los-text">{project.title}</h4>
                    <p className="text-[10px] text-los-text2 mt-0.5">{project.subtitle}</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[9px] font-bold text-los-text3 uppercase tracking-wider mb-1.5">
                      <span>Completion</span>
                      <span className={`text-los-${project.color}`}>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-los-${project.color} rounded-full`}
                        initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Micro Tasks */}
                  <div className="space-y-2 mt-auto pt-4 border-t border-white/[0.04]">
                    {project.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Circle size={10} className="text-los-text3 mt-1 shrink-0" />
                        <p className="text-[10px] text-los-text2 leading-tight">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. CLIENTS & DELIVERABLES (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <FileSignature size={16} className="text-los-gold" /> Recent Deliverables
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View All <ArrowRight size={12}/>
              </button>
            </div>
            
            <div className="space-y-4">
              {recentDeliverables.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{item.name}</h4>
                      <p className="text-[10px] text-los-text3 mt-0.5">{item.client}</p>
                    </div>
                    {item.status === 'Completed' ? (
                      <CheckCircle2 size={14} className="text-los-green" />
                    ) : (
                      <Circle size={14} className="text-los-orange" />
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/[0.04]">
                    <span className="text-[9px] text-los-text2">{item.date}</span>
                    <span className={`text-xs font-bold ${item.status === 'Completed' ? 'text-white' : 'text-los-orange'}`}>
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              + Generate Invoice
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Recycle, Wind, Droplet, Sprout, TestTube, ArrowRight, Activity, Beaker } from 'lucide-react'

// --- MOCK DATA ---
const impactStats = [
  { label: 'Carbon Offset YTD', value: '1.2 Tons', icon: <Wind size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Waste Recycled', value: '45 kg', icon: <Recycle size={16} className="text-los-green" />, color: 'green' },
  { label: 'Eco-Score', value: '94/100', icon: <Leaf size={16} className="text-los-gold" />, color: 'gold' },
]

const activeResearch = [
  {
    id: 1,
    title: 'Cultivatable Fungi for Food Security',
    focus: 'Waste-to-Wealth / Mycology',
    status: 'Drafting Seminar',
    progress: 80,
    icon: <Sprout size={20} className="text-los-green" />,
    color: 'green',
    tasks: ['Finalize APA citations', 'Review Chapter 5 conclusions', 'Submit to faculty']
  },
  {
    id: 2,
    title: 'Abattoir Wastewater E. coli Analysis',
    focus: 'Environmental Toxicology',
    status: 'Data Analysis',
    progress: 60,
    icon: <TestTube size={20} className="text-los-purple" />,
    color: 'purple',
    tasks: ['Analyze antibiotic susceptibility patterns', 'Draft Statement of Problem', 'Collate isolate data']
  }
]

const resourceTracking = [
  { id: 1, resource: 'Water Consumption', unit: 'Liters/Day', current: 120, target: 100, status: 'warning', icon: <Droplet size={16} className="text-los-blue" /> },
  { id: 2, resource: 'Power Usage (Grid)', unit: 'kWh/Month', current: 145, target: 150, status: 'optimal', icon: <Activity size={16} className="text-los-orange" /> },
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

export const Sustainability = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Leaf size={28} className="text-los-green" /> Sustainability Hub
          </h1>
          <p className="text-los-text2 text-sm mt-1">Track environmental research, ecological impact, and resource efficiency.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Beaker size={14} /> Log Lab Data
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactStats.map((stat, i) => (
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
        
        {/* 3. ACTIVE RESEARCH (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Beaker size={16} className="text-los-teal" /> Active Environmental Research
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeResearch.map(project => (
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
                    <p className="text-[10px] text-los-text2 mt-0.5">{project.focus}</p>
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
                        <div className={`w-1.5 h-1.5 rounded-full bg-los-${project.color} mt-1.5 shrink-0`} />
                        <p className="text-[10px] text-los-text2 leading-tight">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. RESOURCE TRACKING (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Activity size={16} className="text-los-orange" /> Resource Consumption
            </h3>
            
            <div className="space-y-5">
              {resourceTracking.map(resource => (
                <div key={resource.id} className="p-4 rounded-xl bg-[#0f0f1a]/50 border border-white/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-white/[0.05] text-los-text2`}>
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{resource.resource}</h4>
                      <p className="text-[9px] text-los-text3 mt-0.5">{resource.unit}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xl font-black text-white">{resource.current}</span>
                    <span className="text-[10px] text-los-text3 font-medium">Target: {resource.target}</span>
                  </div>
                  
                  <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${resource.status === 'warning' ? 'bg-los-orange' : 'bg-los-green'}`} 
                      style={{ width: `${(resource.current / (resource.target * 1.5)) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              View Analytics Report
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
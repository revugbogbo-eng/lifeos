import React from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Wrench, Zap, Wifi, Droplet, Key, Plus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'

// --- MOCK DATA ---
const propertyStats = [
  { label: 'Total Properties', value: '2', icon: <Home size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Active Leases', value: '1', icon: <Key size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Monthly Overhead', value: '₦70,000', icon: <Zap size={16} className="text-los-orange" />, color: 'orange' },
]

const properties = [
  {
    id: 1,
    name: 'Lekki Apartment',
    type: 'Residential Lease',
    status: 'Active',
    financials: '₦2,500,000 / yr',
    renewal: 'Feb 1, 2027',
    icon: <Home size={24} className="text-los-teal" />,
    color: 'teal'
  },
  {
    id: 2,
    name: 'Divine Brothers HQ',
    type: 'Commercial Asset',
    status: 'Owned',
    financials: 'Market Value: ₦45M',
    renewal: 'N/A',
    icon: <Building2 size={24} className="text-los-gold" />,
    color: 'gold'
  }
]

const utilities = [
  { id: 1, name: 'EKEDC Power (Prepaid)', status: 'Low Units', amount: '₦15,000 needed', date: 'Urgent', icon: <Zap size={16} className="text-los-orange" />, color: 'orange' },
  { id: 2, name: 'MTN 5G Broadband', status: 'Active', amount: '₦20,000', date: 'May 25, 2026', icon: <Wifi size={16} className="text-los-blue" />, color: 'blue' },
  { id: 3, name: 'Estate Water & Security', status: 'Paid', amount: '₦35,000', date: 'Jun 01, 2026', icon: <ShieldCheck size={16} className="text-los-green" />, color: 'green' },
]

const maintenanceLog = [
  { id: 1, task: 'AC Servicing (Living Room)', location: 'Lekki Apartment', date: 'Today, 2:00 PM', status: 'Scheduled' },
  { id: 2, task: 'Plumbing Inspection', location: 'Divine Brothers HQ', date: 'May 18, 2026', status: 'Completed' },
  { id: 3, task: 'Renew Fire Extinguishers', location: 'Divine Brothers HQ', date: 'Next Month', status: 'Pending' },
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

export const HomeProperty = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Home & Property</h1>
          <p className="text-los-text2 text-sm mt-1">Manage real estate assets, leases, utilities, and maintenance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Wrench size={14} /> Request Repair
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-teal to-blue-500 text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-teal/20">
            <Plus size={16} /> Add Property
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {propertyStats.map((stat, i) => (
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
        
        {/* 3. PORTFOLIO & MAINTENANCE (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Building2 size={16} className="text-los-teal" /> Property Portfolio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {properties.map(prop => (
                <div key={prop.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-los-${prop.color}/10 border border-los-${prop.color}/20`}>
                      {prop.icon}
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                      prop.status === 'Owned' ? 'bg-los-gold/10 text-los-gold' : 'bg-los-teal/10 text-los-teal'
                    }`}>
                      {prop.status}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="text-sm font-bold text-white mb-1">{prop.name}</h4>
                    <p className="text-[10px] text-los-text3 uppercase tracking-wider">{prop.type}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/[0.04] mt-auto space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-los-text2">Financials</span>
                      <span className="font-bold text-white">{prop.financials}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-los-text2">Next Renewal</span>
                      <span className="font-bold text-white">{prop.renewal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Wrench size={16} className="text-los-purple" /> Maintenance Log
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View All <ArrowRight size={12}/>
              </button>
            </div>
            
            <div className="space-y-3">
              {maintenanceLog.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div>
                    <p className="text-xs font-bold text-los-text">{log.task}</p>
                    <p className="text-[10px] text-los-text3 mt-0.5">{log.location} • {log.date}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                    log.status === 'Completed' ? 'bg-los-green/10 text-los-green' : 
                    log.status === 'Scheduled' ? 'bg-los-blue/10 text-los-blue' : 'bg-white/[0.05] text-los-text2'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. UTILITIES & BILLS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Zap size={16} className="text-los-orange" /> Utilities & Bills
            </h3>
            
            <div className="space-y-4">
              {utilities.map(utility => (
                <div key={utility.id} className={`p-4 rounded-xl border transition-all ${
                  utility.status === 'Low Units' ? 'bg-los-orange/5 border-los-orange/30' : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-los-${utility.color}/10 text-los-${utility.color}`}>
                      {utility.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{utility.name}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        {utility.status === 'Low Units' && <AlertCircle size={10} className="text-los-orange" />}
                        <p className={`text-[9px] uppercase tracking-wider ${
                          utility.status === 'Low Units' ? 'text-los-orange font-bold' : 'text-los-text3'
                        }`}>{utility.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                    <span className={`text-[10px] ${utility.status === 'Low Units' ? 'text-los-orange font-bold' : 'text-los-text2'}`}>
                      {utility.date}
                    </span>
                    <span className="text-xs font-bold text-white">{utility.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              Add Utility Bill
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
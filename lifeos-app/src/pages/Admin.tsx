import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ShieldCheck, AlertTriangle, UploadCloud, CreditCard, Home, Car, Key, ArrowRight, MoreVertical, Plus, FileCheck2, Clock } from 'lucide-react'

// --- MOCK DATA ---
const vaultDocuments = [
  { id: 1, name: 'Intl. Passport (NGN)', category: 'Identity', expiry: '2026-07-03', status: 'expiring', icon: <FileText size={18} /> },
  { id: 2, name: 'National ID (NIN)', category: 'Identity', expiry: 'Never', status: 'valid', icon: <ShieldCheck size={18} /> },
  { id: 3, name: 'Driver\'s License', category: 'Identity', expiry: '2028-11-14', status: 'valid', icon: <Car size={18} /> },
  { id: 4, name: 'Lekki Apartment Lease', category: 'Property', expiry: '2027-02-01', status: 'valid', icon: <Home size={18} /> },
]

const subscriptions = [
  { id: 1, name: 'DSTV Premium', cost: '₦29,500', frequency: 'Monthly', nextBill: 'Tomorrow', icon: <CreditCard size={16} />, color: 'blue' },
  { id: 2, name: 'MTN 5G Broadband', cost: '₦20,000', frequency: 'Monthly', nextBill: 'May 25', icon: <Clock size={16} />, color: 'gold' },
  { id: 3, name: 'Netflix Premium', cost: '₦5,000', frequency: 'Monthly', nextBill: 'Jun 02', icon: <CreditCard size={16} />, color: 'red' },
  { id: 4, name: 'Gym Membership', cost: '₦15,000', frequency: 'Monthly', nextBill: 'Jun 10', icon: <Clock size={16} />, color: 'green' },
]

const assets = [
  { id: 1, name: 'Toyota Camry 2021', type: 'Vehicle', nextMaintenance: 'Oil Change - Jun 15', status: 'upcoming', icon: <Car size={20} className="text-los-teal" /> },
  { id: 2, name: 'MacBook Pro M3', type: 'Electronics', nextMaintenance: 'AppleCare Active', status: 'secure', icon: <Key size={20} className="text-los-purple" /> },
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

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('vault')

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'expiring': return 'bg-los-red/10 text-los-red border-los-red/20'
      case 'valid': return 'bg-los-green/10 text-los-green border-los-green/20'
      case 'secure': return 'bg-los-purple/10 text-los-purple border-los-purple/20'
      case 'upcoming': return 'bg-los-orange/10 text-los-orange border-los-orange/20'
      default: return 'bg-white/[0.05] text-los-text2'
    }
  }

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Life Admin & Vault</h1>
          <p className="text-los-text2 text-sm mt-1">Secure documents, manage subscriptions, and track assets.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-blue to-teal-500 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-blue/20">
            <UploadCloud size={14} /> Upload Document
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. SECURE VAULT (Left Column - Takes 2 cols on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl relative overflow-hidden">
            {/* Glowing background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-los-blue/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-los-blue" /> Digital Vault
              </h3>
              <div className="flex bg-white/[0.03] p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('vault')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${activeTab === 'vault' ? 'bg-white/[0.08] text-white' : 'text-los-text3 hover:text-los-text'}`}
                >
                  Documents
                </button>
                <button 
                  onClick={() => setActiveTab('passwords')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${activeTab === 'passwords' ? 'bg-white/[0.08] text-white' : 'text-los-text3 hover:text-los-text'}`}
                >
                  Passwords
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {vaultDocuments.map(doc => (
                <div key={doc.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group flex items-start gap-4">
                  <div className={`p-3 rounded-lg border ${getStatusColor(doc.status)}`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-los-text">{doc.name}</h4>
                    <p className="text-[10px] text-los-text3 uppercase tracking-wider mt-0.5">{doc.category}</p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-los-text2 flex items-center gap-1">
                        <Clock size={10} /> {doc.expiry}
                      </span>
                      {doc.status === 'expiring' && (
                        <span className="text-[9px] font-bold text-los-red bg-los-red/10 px-2 py-0.5 rounded-md animate-pulse">
                          RENEW SOON
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="text-los-text3 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all flex items-center justify-center gap-2">
              <Plus size={14} /> Add New Document
            </button>
          </motion.div>

          {/* Assets & Maintenance */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-5">
              <Home size={16} className="text-los-teal" /> Asset Maintenance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assets.map(asset => (
                <div key={asset.id} className="p-4 rounded-xl bg-[#0f0f1a]/50 border border-white/[0.04] flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    {asset.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-los-text">{asset.name}</h4>
                    <p className={`text-[10px] font-medium mt-1 ${asset.status === 'upcoming' ? 'text-los-orange' : 'text-los-text3'}`}>
                      {asset.nextMaintenance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. SUBSCRIPTIONS & BILLS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Active Subs</h3>
              <span className="text-[10px] font-bold text-los-text bg-white/[0.05] px-2 py-1 rounded-md">₦69,500/mo</span>
            </div>
            
            <div className="space-y-3 flex-1">
              {subscriptions.map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-los-${sub.color}/10 text-los-${sub.color}`}>
                      {sub.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-los-text">{sub.name}</p>
                      <p className="text-[9px] text-los-text3 uppercase tracking-wider mt-0.5">Due: {sub.nextBill}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">{sub.cost}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.04]">
              <div className="p-4 rounded-xl bg-los-red/10 border border-los-red/20 flex gap-3">
                <AlertTriangle size={16} className="text-los-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-los-red mb-1">Unused Subscription Detected</h4>
                  <p className="text-[10px] text-los-text2 leading-relaxed">
                    You haven't logged into Netflix in 3 weeks. Consider pausing to save ₦5,000 this month.
                  </p>
                  <button className="mt-2 text-[10px] font-bold bg-los-red text-white px-3 py-1.5 rounded hover:bg-los-red/80 transition-colors">
                    Review Subs
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import { Fingerprint, ShieldCheck, Globe, Key, AlertTriangle, CheckCircle2, Lock,  Mail, Server, ArrowRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

// --- MOCK DATA ---
const digitalStats = [
  { label: 'Security Score', value: '92%', icon: <ShieldCheck size={16} className="text-los-green" />, color: 'green' },
  { label: 'Active Domains', value: '3', icon: <Globe size={16} className="text-los-blue" />, color: 'blue' },
  { label: 'Compromised', value: '0', icon: <Lock size={16} className="text-los-purple" />, color: 'purple' },
]

const digitalAssets = [
  { id: 1, name: 'divinebrothers.com.ng', type: 'Domain', expiry: 'Jan 15, 2027', status: 'Active', autoRenew: true, icon: <Globe size={18} className="text-los-blue" /> },
  { id: 2, name: 'ugbowo-tech.org', type: 'Domain', expiry: 'Oct 02, 2026', status: 'Active', autoRenew: true, icon: <Globe size={18} className="text-los-teal" /> },
  { id: 3, name: 'AWS Cloud Hosting', type: 'Infrastructure', expiry: 'Monthly', status: 'Running', autoRenew: true, icon: <Server size={18} className="text-los-orange" /> },
]

const connectedAccounts = [
  { id: 1, platform: 'Google Workspace', email: 'daniel@divinebros.ng', status: 'Connected', mfa: true, icon: <Mail size={16} className="text-red-400" /> },
  { id: 2, platform: 'GitHub', email: 'ewarami-dev', status: 'Connected', mfa: true, icon: <FaGithub size={16} className="text-gray-300" /> },
  { id: 3, platform: 'LinkedIn', email: 'Daniel Ewarami', status: 'Connected', mfa: false, icon: <FaLinkedin size={16} className="text-blue-500" /> },
]

const securityAlerts = [
  { id: 1, title: 'LinkedIn MFA Disabled', description: 'Enable Two-Factor Authentication to secure your professional network.', severity: 'medium' },
  { id: 2, title: 'Stale Password', description: 'Your Binance account password hasn\'t been changed in 180 days.', severity: 'low' },
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

export const DigitalIdentity = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Digital Identity</h1>
          <p className="text-los-text2 text-sm mt-1">Govern your digital footprint, web assets, and security posture.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Key size={14} /> Password Vault
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-blue to-los-purple text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-blue/20">
            <ShieldCheck size={16} /> Run Security Audit
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {digitalStats.map((stat, i) => (
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
        
        {/* 3. DIGITAL ASSETS & INFRASTRUCTURE (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Globe size={16} className="text-los-blue" /> Web Assets & Infrastructure
              </h3>
              <button className="text-[10px] font-bold text-los-blue hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                Manage DNS <ArrowRight size={12}/>
              </button>
            </div>

            <div className="space-y-3">
              {digitalAssets.map(asset => (
                <div key={asset.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#141428] border border-white/[0.05]">
                      {asset.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{asset.name}</h4>
                      <p className="text-[10px] text-los-text2 mt-0.5">{asset.type} • Expires: {asset.expiry}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-los-green/10 text-los-green mb-2">
                      {asset.status}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-los-text3">
                      Auto-Renew: {asset.autoRenew ? <CheckCircle2 size={12} className="text-los-green" /> : <AlertTriangle size={12} className="text-los-orange" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Alerts */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-5">
              <Fingerprint size={16} className="text-los-orange" /> Active Security Alerts
            </h3>
            <div className="space-y-3">
              {securityAlerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <AlertTriangle size={16} className={`mt-0.5 shrink-0 ${alert.severity === 'medium' ? 'text-los-orange' : 'text-los-gold'}`} />
                  <div>
                    <h4 className="text-xs font-bold text-los-text">{alert.title}</h4>
                    <p className="text-[10px] text-los-text2 mt-1 leading-relaxed">{alert.description}</p>
                    <button className="mt-3 text-[10px] font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 rounded transition-colors">
                      Resolve Issue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. CONNECTED ACCOUNTS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Lock size={16} className="text-los-purple" /> Connected Accounts
              </h3>
            </div>
            
            <div className="space-y-4 flex-1">
              {connectedAccounts.map(account => (
                <div key={account.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.05]">
                      {account.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-los-text">{account.platform}</p>
                      <p className="text-[9px] text-los-text3 mt-0.5">{account.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-los-green bg-los-green/10 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5">
                      {account.status}
                    </span>
                    {account.mfa ? (
                      <span className="text-[9px] text-los-text3 flex items-center gap-1"><ShieldCheck size={10} className="text-los-green"/> MFA On</span>
                    ) : (
                      <span className="text-[9px] text-los-orange flex items-center gap-1"><AlertTriangle size={10}/> No MFA</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-bold text-los-text hover:bg-white/[0.05] transition-colors">
              Manage SSO Integrations
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
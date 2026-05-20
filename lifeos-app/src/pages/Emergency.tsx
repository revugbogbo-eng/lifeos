import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, HeartPulse, Phone, ShieldAlert, FileText, MapPin, Activity, Siren, ShieldCheck } from 'lucide-react'

// --- MOCK DATA ---
const emergencyStats = [
  { label: 'System Status', value: 'Secure', icon: <ShieldCheck size={16} className="text-los-green" />, color: 'green' },
  { label: 'Active Alerts', value: '1', icon: <AlertTriangle size={16} className="text-los-orange" />, color: 'orange' },
  { label: 'Blood Type', value: 'O+', icon: <HeartPulse size={16} className="text-los-red" />, color: 'red' },
]

const medicalProfile = {
  name: 'Daniel',
  dob: '1999-05-14',
  bloodType: 'O+',
  allergies: 'None known',
  conditions: 'None',
  insurance: 'Hygeia HMO - #HYG98765432'
}

const emergencyContacts = [
  { id: 1, name: 'National Emergency', role: 'Police / Ambulance', number: '112', type: 'official', icon: <Siren size={18} className="text-los-red" /> },
  { id: 2, name: 'Sarah', role: 'Spouse / Next of Kin', number: '+234 800 000 0000', type: 'personal', icon: <Phone size={18} className="text-pink-500" /> },
  { id: 3, name: 'Dr. Chuks', role: 'Primary Physician', number: '+234 811 111 1111', type: 'medical', icon: <Activity size={18} className="text-los-teal" /> },
  { id: 4, name: 'Lekki Estate Security', role: 'Local Security', number: '01 234 5678', type: 'official', icon: <ShieldAlert size={18} className="text-los-blue" /> },
]

const activeAlerts = [
  { id: 1, title: 'Heavy Rainfall Warning', location: 'Benin City / Ugbowo', description: 'Flash flooding possible in low-lying areas over the next 24 hours. Secure equipment.', severity: 'medium', time: '2 hours ago' },
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

export const Emergency = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & SOS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert size={28} className="text-los-red" /> Emergency & Safety
          </h1>
          <p className="text-los-text2 text-sm mt-1">Critical information, medical ID, and crisis protocols.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-los-red/10 border border-los-red/30 text-los-red text-sm font-black tracking-widest uppercase hover:bg-los-red hover:text-white transition-all shadow-[0_0_15px_rgba(255,77,109,0.2)] hover:shadow-[0_0_25px_rgba(255,77,109,0.5)] flex items-center justify-center gap-2">
            <AlertTriangle size={18} /> SOS Panic Button
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {emergencyStats.map((stat, i) => (
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
        
        {/* 3. MEDICAL ID & ALERTS (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          <motion.div variants={itemVariants} className="glass-card bg-gradient-to-br from-[#0f0f1a]/80 to-los-red/5 border border-white/[0.06] p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-los-red/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-los-red" /> Digital Medical ID
              </h3>
              <button className="text-[10px] font-bold bg-white/[0.05] text-white px-3 py-1.5 rounded transition-colors hover:bg-white/[0.1]">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">Legal Name</p>
                  <p className="text-sm font-bold text-white">{medicalProfile.name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="text-sm font-bold text-white">{medicalProfile.dob}</p>
                </div>
                <div>
                  <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">Health Insurance</p>
                  <p className="text-sm font-bold text-white">{medicalProfile.insurance}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-los-red/10 border border-los-red/20">
                  <p className="text-[9px] text-los-red uppercase tracking-wider font-bold mb-1">Allergies</p>
                  <p className="text-sm font-bold text-white">{medicalProfile.allergies}</p>
                </div>
                <div className="p-3 rounded-xl bg-los-orange/10 border border-los-orange/20">
                  <p className="text-[9px] text-los-orange uppercase tracking-wider font-bold mb-1">Medical Conditions</p>
                  <p className="text-sm font-bold text-white">{medicalProfile.conditions}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-5">
              <MapPin size={16} className="text-los-orange" /> Local Advisories & Alerts
            </h3>
            
            <div className="space-y-4">
              {activeAlerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-xl bg-white/[0.02] border border-los-orange/20 flex gap-4 items-start">
                  <AlertTriangle size={20} className="text-los-orange shrink-0 mt-1" />
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                      <span className="text-[9px] text-los-text3">{alert.time}</span>
                    </div>
                    <p className="text-[10px] text-los-orange uppercase tracking-wider font-bold mb-2">{alert.location}</p>
                    <p className="text-xs text-los-text2 leading-relaxed">{alert.description}</p>
                  </div>
                </div>
              ))}
              {activeAlerts.length === 0 && (
                <p className="text-xs text-los-text3 p-4 text-center border border-dashed border-white/[0.1] rounded-xl">
                  No active local alerts at this time.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* 4. EMERGENCY CONTACTS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full flex flex-col">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Phone size={16} className="text-los-teal" /> Emergency Directory
            </h3>
            
            <div className="space-y-3 flex-1">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#141428] border border-white/[0.05]">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{contact.name}</h4>
                      <p className="text-[9px] text-los-text3 mt-0.5">{contact.role}</p>
                    </div>
                  </div>
                  
                  <a href={`tel:${contact.number}`} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors group-hover:bg-los-teal/10">
                    <Phone size={12} className="text-white group-hover:text-los-teal transition-colors" />
                    <span className="text-[10px] font-bold text-white group-hover:text-los-teal transition-colors">Call</span>
                  </a>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              Add New Contact
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
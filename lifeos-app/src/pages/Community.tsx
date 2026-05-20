import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, MessageCircle, UserPlus, Phone, Mail, Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

// --- MOCK DATA ---
const networkStats = [
  { label: 'Active Connections', value: '124', icon: <Users size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Pending Follow-ups', value: '5', icon: <Clock size={16} className="text-los-orange" />, color: 'orange' },
  { label: 'Upcoming Meetings', value: '3', icon: <Calendar size={16} className="text-los-purple" />, color: 'purple' },
]

const contacts = [
  { 
    id: 1, 
    name: 'Dr. Tekevwe', 
    role: 'Academic Supervisor', 
    organization: 'University Faculty',
    lastContact: '2 days ago', 
    status: 'Needs Follow-up',
    avatar: 'bg-los-purple/20 text-los-purple border-los-purple/30',
    initials: 'DT'
  },
  { 
    id: 2, 
    name: 'Tunde', 
    role: 'Logistics Partner', 
    organization: 'Tech Bootcamp Initiative',
    lastContact: 'Yesterday', 
    status: 'Active',
    avatar: 'bg-los-teal/20 text-los-teal border-los-teal/30',
    initials: 'T'
  },
  { 
    id: 3, 
    name: 'AI Automation Tutor', 
    role: 'Candidate', 
    organization: 'Ugbowo Initiative',
    lastContact: '5 days ago', 
    status: 'Interviewing',
    avatar: 'bg-los-orange/20 text-los-orange border-los-orange/30',
    initials: 'AT'
  },
  { 
    id: 4, 
    name: 'Corporate Affairs Comm.', 
    role: 'Registrar Agent', 
    organization: 'CAC Nigeria',
    lastContact: '1 week ago', 
    status: 'Waiting on them',
    avatar: 'bg-los-blue/20 text-los-blue border-los-blue/30',
    initials: 'CA'
  }
]

const upcomingEvents = [
  { id: 1, title: 'Final Year Project Review', time: 'Tomorrow, 10:00 AM', type: 'Academic', icon: <Users size={16} className="text-los-purple" /> },
  { id: 2, title: 'Tutor Recruitment Interviews', time: 'Friday, 2:00 PM', type: 'Business', icon: <MessageCircle size={16} className="text-los-teal" /> },
  { id: 3, title: 'Akraft Branding Sync', time: 'Monday, 11:30 AM', type: 'Client', icon: <Phone size={16} className="text-los-gold" /> },
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

export const Community = () => {
  const [activeTab, setActiveTab] = useState('All Contacts')

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Community Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Manage your network, stakeholders, and personal relationships.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Calendar size={14} /> Schedule Event
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-teal to-los-blue text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-teal/20 shrink-0">
            <UserPlus size={16} /> Add Contact
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {networkStats.map((stat, i) => (
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
        
        {/* 3. CRM / CONTACT LIST (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Users size={16} className="text-los-teal" /> Network Directory
              </h3>
              <div className="flex bg-white/[0.03] p-1 rounded-lg w-fit">
                {['All Contacts', 'Business', 'Academic'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-colors ${activeTab === tab ? 'bg-white/[0.08] text-white' : 'text-los-text3 hover:text-los-text'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="p-4 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] hover:bg-white/[0.03] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs shadow-inner ${contact.avatar}`}>
                      {contact.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-los-teal transition-colors">{contact.name}</h4>
                      <p className="text-[10px] text-los-text2 mt-0.5">{contact.role} • <span className="text-los-text3">{contact.organization}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                    <div className="text-left sm:text-right">
                      <p className={`text-[10px] font-bold tracking-wider uppercase ${contact.status.includes('Follow-up') ? 'text-los-orange' : 'text-los-text3'}`}>
                        {contact.status}
                      </p>
                      <p className="text-[10px] text-los-text3 mt-0.5 flex items-center sm:justify-end gap-1">
                        <Clock size={10} /> {contact.lastContact}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-los-text3 hover:text-white hover:bg-white/[0.1] transition-all">
                        <Mail size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-los-text3 hover:text-white hover:bg-white/[0.1] transition-all">
                        <Phone size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              Load More Contacts
            </button>
          </motion.div>
        </div>

        {/* 4. UPCOMING EVENTS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={16} className="text-los-purple" /> Upcoming
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                Calendar <ArrowRight size={12}/>
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-los-text">{event.title}</h4>
                    <p className="text-[10px] text-los-text2 mt-1">{event.time}</p>
                    <span className="inline-block mt-2 text-[9px] bg-white/[0.05] px-2 py-0.5 rounded text-los-text3 uppercase tracking-wider">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bg-gradient-to-br from-[#141428]/60 to-los-purple/5 border border-white/[0.04] p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-los-purple/10 rounded-full blur-[40px] pointer-events-none" />
            <h3 className="text-[10px] font-bold text-los-purple uppercase tracking-wider mb-2">Relationship AI</h3>
            <p className="text-xs text-los-text2 leading-relaxed relative z-10">
              It has been 2 weeks since you checked in with the <strong className="text-los-text">Ugbowo Initiative Tutors</strong>. A quick sync message is recommended to keep engagement high.
            </p>
            <button className="mt-4 px-4 py-2 bg-los-purple/10 text-los-purple border border-los-purple/20 rounded-lg text-xs font-bold hover:bg-los-purple hover:text-white transition-colors relative z-10">
              Draft Message
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
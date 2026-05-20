import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Home, Calendar, Gift, Image as ImageIcon, Plus, CheckCircle2, Circle, Clock, MessageSquareHeart } from 'lucide-react'

// --- MOCK DATA ---
const familyMembers = [
  { id: 1, name: 'Sarah', role: 'Spouse', birthday: 'Oct 12', nextMilestone: 'Anniversary in 45 days', color: 'pink', avatar: 'bg-pink-500/20 text-pink-500 border-pink-500/30', initials: 'S' },
  { id: 2, name: 'David', role: 'Brother', birthday: 'Mar 04', nextMilestone: 'Graduation next month', color: 'blue', avatar: 'bg-los-blue/20 text-los-blue border-los-blue/30', initials: 'D' },
  { id: 3, name: 'Mom', role: 'Parent', birthday: 'Jan 22', nextMilestone: 'Retirement party planning', color: 'purple', avatar: 'bg-los-purple/20 text-los-purple border-los-purple/30', initials: 'M' },
]

const householdTasks = [
  { id: 1, task: 'Renew Home Insurance', assignee: 'Me', due: 'Friday', status: 'pending' },
  { id: 2, task: 'Call Plumber (Kitchen Sync)', assignee: 'Sarah', due: 'Tomorrow', status: 'pending' },
  { id: 3, task: 'Pay Electricity Bill', assignee: 'Me', due: 'Today', status: 'completed' },
  { id: 4, task: 'Grocery Run (Weekend)', assignee: 'Shared', due: 'Saturday', status: 'pending' },
]

const importantDates = [
  { id: 1, title: 'Parents Anniversary', date: 'June 15, 2026', type: 'Anniversary', icon: <Heart size={16} className="text-pink-500" /> },
  { id: 2, title: 'Family Dinner @ Lekki', date: 'Sunday, 6:00 PM', type: 'Gathering', icon: <Home size={16} className="text-los-teal" /> },
  { id: 3, title: 'David\'s Birthday', date: 'March 04, 2027', type: 'Birthday', icon: <Gift size={16} className="text-los-gold" /> },
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

export const Family = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Family Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Your inner circle. Shared life, tasks, and memories.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <ImageIcon size={14} /> Add Memory
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/20 shrink-0">
            <Plus size={16} /> Invite Member
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. INNER CIRCLE (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Heart size={16} className="text-pink-500" /> Inner Circle
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {familyMembers.map(member => (
                <div key={member.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <button className="text-los-text3 hover:text-white transition-colors p-1"><MessageSquareHeart size={14}/></button>
                  </div>
                  
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-xl shadow-inner mb-3 ${member.avatar}`}>
                    {member.initials}
                  </div>
                  
                  <h4 className="text-sm font-bold text-white mb-0.5">{member.name}</h4>
                  <p className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-3">{member.role}</p>
                  
                  <div className="w-full pt-3 border-t border-white/[0.04] mt-auto">
                    <p className="text-[9px] text-los-text2 leading-tight">
                      <strong className="text-los-text block mb-0.5"><Gift size={10} className="inline mr-1 text-los-gold"/> {member.birthday}</strong>
                      {member.nextMilestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Household Management */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Home size={16} className="text-los-teal" /> Shared Household Tasks
              </h3>
              <button className="text-[10px] font-bold text-los-purple hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                <Plus size={12}/> New Task
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {householdTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all group">
                  <div className="flex items-center gap-3">
                    {task.status === 'completed' ? (
                      <CheckCircle2 size={16} className="text-los-green shrink-0" />
                    ) : (
                      <Circle size={16} className="text-los-text3 group-hover:text-los-text transition-colors shrink-0 cursor-pointer" />
                    )}
                    <div>
                      <p className={`text-xs font-bold ${task.status === 'completed' ? 'text-los-text3 line-through' : 'text-los-text'}`}>{task.task}</p>
                      <p className="text-[9px] text-los-text3 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {task.due}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-md bg-white/[0.05] ${task.assignee === 'Me' ? 'text-los-teal' : 'text-los-text2'}`}>
                    {task.assignee}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. IMPORTANT DATES (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Calendar size={16} className="text-los-orange" /> Upcoming Dates
            </h3>
            
            <div className="space-y-4">
              {importantDates.map(date => (
                <div key={date.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    {date.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-los-text">{date.title}</h4>
                    <p className="text-[10px] text-los-text2 mt-1">{date.date}</p>
                    <span className="inline-block mt-2 text-[9px] bg-white/[0.05] px-2 py-0.5 rounded text-los-text3 uppercase tracking-wider">
                      {date.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 border border-dashed border-white/[0.1] rounded-xl text-xs font-bold text-los-text3 hover:text-los-text hover:bg-white/[0.02] hover:border-white/[0.2] transition-all">
              View Full Calendar
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
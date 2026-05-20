import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Flame, Calendar, CheckCircle2, Circle, Plus, Trophy, ArrowRight, ChevronDown, ChevronUp, MoreHorizontal, Activity } from 'lucide-react'

// --- MOCK DATA ---
const stats = [
  { label: 'Active Goals', value: '4', icon: <Target size={16} className="text-los-purple" />, bg: 'bg-los-purple/10', border: 'border-los-purple/20' },
  { label: 'Habits Tracked', value: '6', icon: <Activity size={16} className="text-los-teal" />, bg: 'bg-los-teal/10', border: 'border-los-teal/20' },
  { label: 'Longest Streak', value: '14 Days', icon: <Flame size={16} className="text-los-orange" />, bg: 'bg-los-orange/10', border: 'border-los-orange/20' },
]

const goals = [
  {
    id: 1,
    title: 'Build Emergency Fund',
    category: 'Finance',
    deadline: 'Dec 2026',
    progress: 65,
    color: 'gold',
    milestones: [
      { text: 'Save first ₦500k', completed: true },
      { text: 'Hit ₦1M milestone', completed: true },
      { text: 'Reach ₦2M safety net', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Master React & Next.js',
    category: 'Career',
    deadline: 'Aug 2026',
    progress: 40,
    color: 'teal',
    milestones: [
      { text: 'Complete React core concepts', completed: true },
      { text: 'Build 3 portfolio projects', completed: false },
      { text: 'Learn Next.js App Router', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Run a Half Marathon',
    category: 'Health',
    deadline: 'Oct 2026',
    progress: 25,
    color: 'green',
    milestones: [
      { text: 'Run 5km without stopping', completed: true },
      { text: 'Complete 10km race', completed: false },
      { text: 'Follow 12-week half marathon plan', completed: false },
    ]
  }
]

const dailyHabits = [
  { id: 1, name: 'Read 10 Pages', streak: 12, completed: true, color: 'teal' },
  { id: 2, name: 'Drink 2L Water', streak: 4, completed: true, color: 'blue' },
  { id: 3, name: 'Code for 4 Hours', streak: 14, completed: false, color: 'purple' },
  { id: 4, name: 'Meditate 10 Mins', streak: 0, completed: false, color: 'gold' },
  { id: 5, name: 'Stretch / Yoga', streak: 2, completed: false, color: 'green' },
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

export const Goals = () => {
  const [expandedGoal, setExpandedGoal] = useState<number | null>(1)
  const [habits, setHabits] = useState(dailyHabits)

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 } : habit
    ))
  }

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Goals & Habits</h1>
          <p className="text-los-text2 text-sm mt-1">Design your future, execute your present.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Plus size={14} /> New Habit
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-purple to-los-purple2 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-purple/20">
            <Target size={14} /> Create Goal
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
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
        
        {/* 3. MACRO: LONG-TERM GOALS (Left Column) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-los-text uppercase tracking-wider">Active Goals</h2>
            <button className="text-[10px] text-los-text3 hover:text-los-text transition-colors flex items-center gap-1 uppercase font-bold tracking-wider">
              View Completed <ArrowRight size={12}/>
            </button>
          </div>

          {goals.map((goal) => {
            const isExpanded = expandedGoal === goal.id
            return (
              <motion.div variants={itemVariants} key={goal.id} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Goal Header (Clickable) */}
                <button 
                  onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
                  className="w-full p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md bg-los-${goal.color}/10 text-los-${goal.color} uppercase tracking-wider`}>
                        {goal.category}
                      </span>
                      <span className="text-[10px] text-los-text3 flex items-center gap-1">
                        <Calendar size={10}/> {goal.deadline}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{goal.title}</h3>
                  </div>

                  <div className="w-full md:w-48 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-los-text2">Progress</span>
                      <span className={`text-los-${goal.color}`}>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-los-${goal.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="hidden md:block text-los-text3">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Goal Milestones (Expandable) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/[0.04] bg-[#141428]/40"
                    >
                      <div className="p-5 space-y-3">
                        <h4 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Trophy size={12}/> Milestones
                        </h4>
                        {goal.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-start gap-3 group">
                            <div className="mt-0.5">
                              {milestone.completed ? (
                                <CheckCircle2 size={16} className={`text-los-${goal.color}`} />
                              ) : (
                                <Circle size={16} className="text-los-text3 group-hover:text-los-text transition-colors" />
                              )}
                            </div>
                            <p className={`text-xs ${milestone.completed ? 'text-los-text3 line-through' : 'text-los-text'} transition-colors`}>
                              {milestone.text}
                            </p>
                          </div>
                        ))}
                        <button className="mt-2 text-[10px] font-bold text-los-purple hover:text-los-purple2 transition-colors flex items-center gap-1 uppercase tracking-wider">
                          <Plus size={12}/> Add Milestone
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* 4. MICRO: DAILY HABITS (Right Column) */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-los-text uppercase tracking-wider">Today's Habits</h2>
            <button className="p-1 text-los-text3 hover:text-los-text transition-colors">
              <MoreHorizontal size={16}/>
            </button>
          </div>

          <div className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] rounded-2xl p-2">
            {habits.map((habit) => (
              <div 
                key={habit.id} 
                onClick={() => toggleHabit(habit.id)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${
                  habit.completed ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02] hover:border-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    whileTap={{ scale: 0.8 }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      habit.completed 
                        ? `bg-los-${habit.color}/20 border-los-${habit.color} text-los-${habit.color}` 
                        : 'border-white/[0.1] text-transparent'
                    }`}
                  >
                    <CheckCircle2 size={14} className={habit.completed ? 'opacity-100' : 'opacity-0'} />
                  </motion.div>
                  <span className={`text-sm font-medium transition-colors ${habit.completed ? 'text-los-text3 line-through decoration-los-text3/50' : 'text-los-text'}`}>
                    {habit.name}
                  </span>
                </div>
                
                <div className={`flex items-center gap-1.5 text-xs font-bold ${habit.streak > 0 ? 'text-los-orange' : 'text-los-text3'}`}>
                  {habit.streak} <Flame size={14} className={habit.streak > 0 ? 'fill-los-orange text-los-orange' : ''} />
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl text-center">
             <p className="text-xs text-los-text2 leading-relaxed">
               You are currently on a <span className="text-los-orange font-bold">14-day tracking streak!</span> Keep executing to maintain your system sovereignty.
             </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
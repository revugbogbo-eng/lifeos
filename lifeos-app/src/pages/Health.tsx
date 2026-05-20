import React from 'react'
import { motion } from 'framer-motion'
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, CartesianGrid } from 'recharts'
import { Heart, Activity, Utensils, Moon, Flame, Plus, ArrowRight, Droplet, Apple, Scale, Thermometer } from 'lucide-react'

// --- MOCK DATA ---
const activityRings = [
  { name: 'Stand', value: 80, fill: '#38bdf8', max: 100 },   // Blue
  { name: 'Exercise', value: 65, fill: '#00d4aa', max: 100 }, // Teal
  { name: 'Move', value: 85, fill: '#ff4d6d', max: 100 },     // Pink
]

const sleepData = [
  { day: 'Mon', hours: 6.5 }, { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 5.8 }, { day: 'Thu', hours: 8.1 },
  { day: 'Fri', hours: 7.5 }, { day: 'Sat', hours: 9.0 },
  { day: 'Sun', hours: 7.8 },
]

const vitals = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: <Heart size={16} className="text-los-red" />, color: 'red' },
  { label: 'Blood Pressure', value: '118/75', unit: 'mmHg', status: 'Optimal', icon: <Activity size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Body Weight', value: '78.5', unit: 'kg', status: '-1.2kg', icon: <Scale size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Hydration', value: '1.8', unit: 'L', status: 'Goal: 3L', icon: <Droplet size={16} className="text-los-blue" />, color: 'blue' },
]

const meals = [
  { id: 1, type: 'Breakfast', name: 'Oats & Boiled Eggs', cals: 450, time: '08:30 AM', icon: '🍳' },
  { id: 2, type: 'Lunch', name: 'Jollof Rice & Grilled Chicken', cals: 850, time: '01:45 PM', icon: '🍛' },
  { id: 3, type: 'Dinner', name: 'Greek Salad', cals: 320, time: '07:15 PM', icon: '🥗' },
]

const workouts = [
  { id: 1, name: 'HIIT Cardio', duration: '45 mins', calories: 420, date: 'Today', icon: <Flame size={16} className="text-los-orange" /> },
  { id: 2, name: 'Upper Body Strength', duration: '60 mins', calories: 380, date: 'Yesterday', icon: <Activity size={16} className="text-los-purple" /> },
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

export const Health = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Health & Wellness</h1>
          <p className="text-los-text2 text-sm mt-1">Monitor your biological metrics and physical output.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-1.5">
            <Utensils size={14} /> Log Meal
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-1.5">
            <Thermometer size={14} /> Add Vitals
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-green to-los-teal text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-green/20">
            <Activity size={16} /> Start Workout
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. ACTIVITY RINGS & SLEEP (Left/Main Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Activity Rings */}
            <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider absolute top-6 left-6">Daily Activity</h3>
              <div className="w-48 h-48 mt-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={12} data={activityRings}>
                    <RadialBar background clockWise dataKey="value" cornerRadius={10} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Flame className="text-los-orange mb-1" size={20} />
                  <span className="text-sm font-bold text-white">850</span>
                  <span className="text-[9px] text-los-text3 uppercase tracking-wider">Kcal</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 w-full justify-center">
                <div className="text-center"><div className="w-2 h-2 rounded-full bg-los-pink mb-1 mx-auto"/><span className="text-[10px] text-los-text2 uppercase">Move</span></div>
                <div className="text-center"><div className="w-2 h-2 rounded-full bg-los-teal mb-1 mx-auto"/><span className="text-[10px] text-los-text2 uppercase">Exercise</span></div>
                <div className="text-center"><div className="w-2 h-2 rounded-full bg-los-blue mb-1 mx-auto"/><span className="text-[10px] text-los-text2 uppercase">Stand</span></div>
              </div>
            </motion.div>

            {/* Sleep Tracking */}
            <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Moon size={14} className="text-los-purple" /> Sleep Recovery
                </h3>
                <p className="text-2xl font-black text-white mt-2">7h 24m <span className="text-xs font-normal text-los-text2">avg</span></p>
              </div>
              <div className="h-32 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sleepData}>
                    <defs>
                      <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c6fff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c6fff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="hours" stroke="#7c6fff" strokeWidth={2} fillOpacity={1} fill="url(#colorSleep)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Vitals Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitals.map((vital, i) => (
              <div key={i} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-4 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg bg-los-${vital.color}/10 border border-los-${vital.color}/20`}>
                    {vital.icon}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-1">{vital.label}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-lg font-black text-white">{vital.value}</p>
                  <p className="text-[10px] text-los-text2">{vital.unit}</p>
                </div>
                <p className={`text-[10px] mt-2 font-medium ${vital.status === 'Normal' || vital.status === 'Optimal' ? 'text-los-green' : 'text-los-text2'}`}>
                  {vital.status}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* 3. NUTRITION & WORKOUTS (Right Column) */}
        <div className="space-y-6">
          
          {/* Nutrition Log */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Apple size={14} className="text-los-green" /> Today's Fuel
              </h3>
              <span className="text-[10px] font-bold text-los-text bg-white/[0.05] px-2 py-1 rounded-md">1,620 Kcal</span>
            </div>
            <div className="space-y-3">
              {meals.map(meal => (
                <div key={meal.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{meal.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-los-text">{meal.name}</p>
                      <p className="text-[9px] text-los-text3 uppercase tracking-wider mt-0.5">{meal.type} • {meal.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-los-green">{meal.cals}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Workouts */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Recent Workouts</h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                History <ArrowRight size={12}/>
              </button>
            </div>
            <div className="space-y-3">
              {workouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-white/[0.02] hover:border-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      {workout.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-los-text">{workout.name}</p>
                      <p className="text-[10px] text-los-text3 mt-0.5">{workout.date} • {workout.duration}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-los-orange">{workout.calories} kcal</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { 
  LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, 
  ResponsiveContainer, Tooltip, XAxis 
} from 'recharts'
import { 
  Plus, Edit3, Target, MessageSquare, Sparkles, AlertTriangle, 
  ArrowRight, Activity, BookOpen, Wallet, Heart, Flame, ShieldAlert,
  TrendingUp, CheckCircle2, Clock, Calendar
} from 'lucide-react'

// --- MOCK DATA (Nigerian Context) ---
const netWorthData = [
  { name: 'Jan', value: 850000 }, { name: 'Feb', value: 920000 },
  { name: 'Mar', value: 1050000 }, { name: 'Apr', value: 1150000 },
  { name: 'May', value: 1250000 },
]

const lifeScoreData = [
  { name: 'Admin', value: 80, fill: '#38bdf8' },
  { name: 'Community', value: 75, fill: '#ff4d6d' },
  { name: 'Growth', value: 60, fill: '#00d4aa' },
  { name: 'Goals', value: 85, fill: '#7c6fff' },
  { name: 'Health', value: 70, fill: '#22c55e' },
  { name: 'Finance', value: 90, fill: '#f59e0b' },
]

const recentActivity = [
  { id: 1, type: 'finance', text: 'Logged expense: Uber to Lekki (₦4,500)', time: '2 hours ago', icon: <Wallet size={14} className="text-los-gold" /> },
  { id: 2, type: 'health', text: 'Completed 30m HIIT Workout', time: '5 hours ago', icon: <Heart size={14} className="text-los-green" /> },
  { id: 3, type: 'goals', text: 'Milestone reached: Save ₦500k', time: 'Yesterday', icon: <Target size={14} className="text-los-purple" /> },
]

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

// --- MAIN DASHBOARD COMPONENT ---
export const Dashboard = () => {
  const { user } = useAppStore()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    setDateStr(new Date().toLocaleDateString('en-NG', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    }))
  }, [])

  return (
    <motion.div 
      className="space-y-6 pb-20 select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. GREETING HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {greeting}, {user?.full_name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-los-text2 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} /> {dateStr}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-los-card border border-white/[0.08] text-xs font-semibold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-1.5"><Plus size={14}/> Expense</button>
          <button className="px-3 py-1.5 rounded-lg bg-los-card border border-white/[0.08] text-xs font-semibold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-1.5"><Edit3 size={14}/> Note</button>
          <button className="px-3 py-1.5 rounded-lg bg-los-card border border-white/[0.08] text-xs font-semibold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-1.5"><Target size={14}/> Goal</button>
          <button onClick={() => navigate('/ai-assistant')} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-los-purple to-los-purple2 text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-1.5 shadow-lg shadow-los-purple/20"><Sparkles size={14}/> Ask AI</button>
        </div>
      </motion.div>

      {/* 2. LIFE SCORE HERO CARD */}
      <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-los-purple/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-los-text3 tracking-wider uppercase mb-1">Current Life Score</h2>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black bg-gradient-to-r from-white to-los-text2 bg-clip-text text-transparent">
                  {user?.life_score || 724}
                </span>
                <span className="text-los-green text-sm font-bold flex items-center mb-1">
                  <TrendingUp size={16} className="mr-1" /> +12 pts this week
                </span>
              </div>
            </div>
            <p className="text-xs text-los-text2 leading-relaxed max-w-md">
              Your financial health and goal progress are driving your score up this week. Focus on learning hours to break the 750 threshold.
            </p>
            <Link to="/life-score" className="inline-flex items-center gap-2 text-xs font-bold text-los-purple hover:text-los-purple2 transition-colors">
              Analyze Score Breakdown <ArrowRight size={14} />
            </Link>
          </div>

          <div className="w-full md:w-64 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={8} data={lifeScoreData}>
                <RadialBar background clockWise dataKey="value" cornerRadius={10} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="text-los-purple animate-pulse" size={24} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. SUMMARY STATS ROW */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Net Worth', value: '₦1.25M', icon: <Wallet size={16} className="text-los-gold" />, bg: 'bg-los-gold/10', border: 'border-los-gold/20' },
          { label: 'Cash Flow', value: '+₦150k', icon: <TrendingUp size={16} className="text-los-green" />, bg: 'bg-los-green/10', border: 'border-los-green/20' },
          { label: 'Active Goals', value: '3/5 Track', icon: <Target size={16} className="text-los-purple" />, bg: 'bg-los-purple/10', border: 'border-los-purple/20' },
          { label: 'Health Score', value: '82/100', icon: <Activity size={16} className="text-los-teal" />, bg: 'bg-los-teal/10', border: 'border-los-teal/20' },
          { label: 'Urgent Alerts', value: '2 Pending', icon: <ShieldAlert size={16} className="text-los-red" />, bg: 'bg-los-red/10', border: 'border-los-red/20' },
          { label: 'Streak', value: '14 Days', icon: <Flame size={16} className="text-los-orange" />, bg: 'bg-los-orange/10', border: 'border-los-orange/20' },
        ].map((stat, i) => (
          <div key={i} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-4 rounded-xl flex flex-col justify-between hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-los-text3 uppercase tracking-wider">{stat.label}</span>
              <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.border} border`}>{stat.icon}</div>
            </div>
            <span className="text-sm font-bold text-los-text">{stat.value}</span>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 4. URGENT ALERTS PANEL */}
        <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-5 rounded-xl space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2 text-los-red mb-2">
            <AlertTriangle size={16} className="animate-pulse" />
            <h3 className="text-xs font-bold tracking-wider uppercase">Action Required</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-los-orange/10 border border-los-orange/20 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-los-text">DSTV Subscription</p>
                <p className="text-[10px] text-los-orange mt-0.5">₦16,500 due tomorrow</p>
              </div>
              <button className="text-[10px] font-bold bg-los-orange text-white px-2.5 py-1.5 rounded-md hover:bg-los-orange/80 transition-colors">Pay</button>
            </div>
            <div className="p-3 rounded-xl bg-los-red/10 border border-los-red/20 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-los-text">Intl. Passport Expiring</p>
                <p className="text-[10px] text-los-red mt-0.5">Expires in 45 days</p>
              </div>
              <button className="text-[10px] font-bold bg-los-red text-white px-2.5 py-1.5 rounded-md hover:bg-los-red/80 transition-colors">Renew</button>
            </div>
          </div>
        </motion.div>

        {/* 5. TODAY'S AI PRIORITIES */}
        <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-los-purple/20 shadow-[0_0_15px_rgba(124,111,255,0.05)] p-5 rounded-xl lg:col-span-2">
          <div className="flex items-center gap-2 text-los-purple mb-4">
            <Sparkles size={16} />
            <h3 className="text-xs font-bold tracking-wider uppercase">AI Daily Directives</h3>
          </div>
          <div className="space-y-2.5">
            {[
              { text: "Review budget for upcoming Sallah weekend", time: "10m", tag: "Finance", color: "gold" },
              { text: "Log yesterday's meals to maintain your streak", time: "5m", tag: "Health", color: "green" },
              { text: "Read Chapter 3 of 'Atomic Habits'", time: "25m", tag: "Growth", color: "teal" },
            ].map((task, i) => (
              <div key={i} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border border-los-text3 flex items-center justify-center group-hover:border-los-purple transition-colors" />
                  <p className="text-xs text-los-text2 group-hover:text-los-text transition-colors">{task.text}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md bg-los-${task.color}/10 text-los-${task.color} uppercase tracking-wider`}>{task.tag}</span>
                  <span className="text-[10px] text-los-text3 flex items-center gap-1"><Clock size={10}/> {task.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 6. WIDGETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wealth Widget */}
        <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl h-48 flex flex-col">
          <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-2">30-Day Wealth Trend</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }} />
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Goals Widget */}
        <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl h-48 overflow-hidden">
          <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-4">Top Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-los-text font-medium">Emergency Fund</span><span className="text-los-text2">85%</span></div>
              <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden"><div className="bg-los-gold h-full rounded-full" style={{ width: '85%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-los-text font-medium">Learn Python</span><span className="text-los-text2">40%</span></div>
              <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden"><div className="bg-los-teal h-full rounded-full" style={{ width: '40%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-los-text font-medium">Gym Consistency</span><span className="text-los-text2">60%</span></div>
              <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden"><div className="bg-los-green h-full rounded-full" style={{ width: '60%' }} /></div>
            </div>
          </div>
        </motion.div>

        {/* Habits Widget */}
        <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-xl h-48">
          <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-4">Daily Habits</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-los-text2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-los-teal" /> Read 10 pages</span>
              <CheckCircle2 size={16} className="text-los-teal" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-los-text2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-los-green" /> Drink 2L Water</span>
              <div className="w-4 h-4 rounded-full border border-los-text3" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-los-text2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-los-purple" /> Meditate 10m</span>
              <div className="w-4 h-4 rounded-full border border-los-text3" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 7. ACTIVITY FEED */}
      <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/50 border border-white/[0.06] p-5 rounded-xl">
        <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-4">Recent Activity</h3>
        <div className="space-y-1">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-2 hover:bg-white/[0.02] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  {activity.icon}
                </div>
                <p className="text-xs text-los-text font-medium">{activity.text}</p>
              </div>
              <span className="text-[10px] text-los-text3 hidden sm:block">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity, Briefcase, Plus, ArrowUpRight, ArrowDownRight, Building2, Coins, LineChart } from 'lucide-react'

// --- MOCK DATA ---
const portfolioStats = [
  { label: 'Total Portfolio Value', value: '₦8,450,000', icon: <Briefcase size={16} className="text-los-gold" />, color: 'gold' },
  { label: '24h Return', value: '+₦125,000', icon: <TrendingUp size={16} className="text-los-green" />, color: 'green' },
  { label: 'Best Performer', value: 'Bitcoin (BTC)', icon: <Coins size={16} className="text-los-orange" />, color: 'orange' },
]

const allocationData = [
  { name: 'Crypto', value: 45, color: '#f59e0b' },      // Orange
  { name: 'Real Estate', value: 35, color: '#7c6fff' }, // Purple
  { name: 'Stocks', value: 15, color: '#00d4aa' },      // Teal
  { name: 'Cash/Liquidity', value: 5, color: '#3b82f6' }, // Blue
]

const assets = [
  { id: 1, name: 'Bitcoin', ticker: 'BTC', balance: '0.125', fiatValue: '₦3,800,000', change: '+2.4%', isPositive: true, type: 'Crypto', icon: <Coins size={18} className="text-los-orange" /> },
  { id: 2, name: 'Divine Bros Real Estate', ticker: 'DBRE-01', balance: '1 Unit', fiatValue: '₦2,950,000', change: '+0.0%', isPositive: true, type: 'Private Equity', icon: <Building2 size={18} className="text-los-purple" /> },
  { id: 3, name: 'MTN Nigeria', ticker: 'MTNN', balance: '1,500', fiatValue: '₦1,250,000', change: '-1.2%', isPositive: false, type: 'Stock', icon: <LineChart size={18} className="text-los-teal" /> },
  { id: 4, name: 'Stanbic Money Market', ticker: 'SMMF', balance: '450,000', fiatValue: '₦450,000', change: '+0.1%', isPositive: true, type: 'Mutual Fund', icon: <DollarSign size={18} className="text-los-blue" /> },
]

const recentMoves = [
  { id: 1, action: 'Bought', asset: 'BTC', amount: '₦50,000', date: 'Today, 10:30 AM', type: 'buy' },
  { id: 2, action: 'Dividend', asset: 'MTNN', amount: '₦12,500', date: 'Yesterday', type: 'earn' },
  { id: 3, action: 'Sold', asset: 'USDT', amount: '₦150,000', date: 'May 18, 2026', type: 'sell' },
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

export const Investments = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Investments</h1>
          <p className="text-los-text2 text-sm mt-1">Track portfolio allocation, private equity, and market assets.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Activity size={14} /> Market Watch
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-green to-teal-500 text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-green/20">
            <Plus size={16} /> Log Asset
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portfolioStats.map((stat, i) => (
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
        
        {/* 3. ASSET LIST (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Asset Breakdown</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded text-[10px] font-bold text-white transition-colors">All</button>
                <button className="px-3 py-1 text-los-text3 hover:text-white rounded text-[10px] font-bold transition-colors">Crypto</button>
                <button className="px-3 py-1 text-los-text3 hover:text-white rounded text-[10px] font-bold transition-colors">Stocks</button>
              </div>
            </div>

            <div className="space-y-3">
              {assets.map(asset => (
                <div key={asset.id} className="p-4 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.04] hover:bg-white/[0.03] transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#141428] border border-white/[0.05]">
                      {asset.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {asset.name} <span className="text-[9px] bg-white/[0.05] px-1.5 py-0.5 rounded text-los-text3 uppercase">{asset.ticker}</span>
                      </h4>
                      <p className="text-[10px] text-los-text2 mt-0.5">{asset.balance} {asset.type === 'Crypto' ? asset.ticker : 'Units'}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{asset.fiatValue}</p>
                    <p className={`text-[10px] font-bold flex items-center justify-end gap-1 mt-0.5 ${asset.isPositive ? 'text-los-green' : 'text-los-red'}`}>
                      {asset.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {asset.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. ALLOCATION & MOVES (Right Column) */}
        <div className="space-y-6">
          
          {/* Allocation Chart */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl flex flex-col items-center">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider w-full mb-2">Portfolio Allocation</h3>
            
            <div className="w-full h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-black text-white">4</span>
                <span className="text-[9px] text-los-text3 uppercase tracking-wider">Asset Classes</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-2">
              {allocationData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-los-text2">{item.name}</span>
                  <span className="text-[10px] font-bold text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Moves */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-5">Recent Moves</h3>
            
            <div className="space-y-4">
              {recentMoves.map(move => (
                <div key={move.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      move.type === 'buy' ? 'bg-los-blue/10 text-los-blue' : 
                      move.type === 'sell' ? 'bg-los-red/10 text-los-red' : 
                      'bg-los-green/10 text-los-green'
                    }`}>
                      {move.type === 'buy' ? <ArrowDownRight size={14} /> : move.type === 'sell' ? <ArrowUpRight size={14} /> : <DollarSign size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-los-text">
                        {move.action} {move.asset}
                      </p>
                      <p className="text-[9px] text-los-text3 mt-0.5">{move.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${
                    move.type === 'buy' || move.type === 'earn' ? 'text-los-green' : 'text-los-text'
                  }`}>
                    {move.type === 'buy' ? '-' : '+'}{move.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
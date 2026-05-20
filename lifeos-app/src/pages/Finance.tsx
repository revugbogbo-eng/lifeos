import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Building, Coins, CreditCard, Search, Filter, MoreHorizontal, Receipt } from 'lucide-react'

// --- MOCK DATA ---
const accounts = [
  { id: 1, name: 'GTBank Checking', type: 'Bank', balance: 450000, icon: <Building size={18} />, color: 'blue' },
  { id: 2, name: 'Stanbic Savings', type: 'Bank', balance: 1200000, icon: <Wallet size={18} />, color: 'green' },
  { id: 3, name: 'Binance USDT', type: 'Crypto', balance: 850000, icon: <Coins size={18} />, color: 'gold' },
]

const transactions = [
  { id: 1, merchant: 'Uber Technologies', category: 'Transport', amount: -4500, date: 'Today, 2:30 PM', status: 'completed' },
  { id: 2, merchant: 'TechCorp Salary', category: 'Income', amount: 850000, date: 'Yesterday', status: 'completed' },
  { id: 3, merchant: 'Shoprite Lekki', category: 'Groceries', amount: -32000, date: 'May 16, 2026', status: 'completed' },
  { id: 4, merchant: 'MTN Airtime', category: 'Utilities', amount: -5000, date: 'May 15, 2026', status: 'completed' },
  { id: 5, merchant: 'Netflix Subscription', category: 'Entertainment', amount: -4800, date: 'May 14, 2026', status: 'completed' },
  { id: 6, merchant: 'Transfer to Tunde', category: 'Transfer', amount: -15000, date: 'May 12, 2026', status: 'pending' },
]

const budgets = [
  { category: 'Food & Dining', spent: 85000, limit: 120000, color: 'teal' },
  { category: 'Transportation', spent: 42000, limit: 50000, color: 'purple' },
  { category: 'Entertainment', spent: 30000, limit: 40000, color: 'gold' },
  { category: 'Utilities', spent: 45000, limit: 45000, color: 'red' },
]

const cashFlowData = [
  { name: 'Jan', Income: 800000, Expenses: 450000 },
  { name: 'Feb', Income: 850000, Expenses: 480000 },
  { name: 'Mar', Income: 850000, Expenses: 520000 },
  { name: 'Apr', Income: 900000, Expenses: 410000 },
  { name: 'May', Income: 1100000, Expenses: 600000 },
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

export const Finance = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Finance Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Manage wealth, budgets, and cash flow.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <ArrowUpRight size={14} className="text-los-green" /> Receive
          </button>
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <ArrowDownRight size={14} className="text-los-red" /> Send
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-gold to-los-orange text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-gold/20">
            <Plus size={16} /> Log Expense
          </button>
        </div>
      </motion.div>

      {/* 2. OVERVIEW CARDS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Net Worth */}
        <div className="glass-card bg-[#0f0f1a]/80 border border-white/[0.08] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-los-gold/10 rounded-full blur-[50px] group-hover:bg-los-gold/20 transition-all duration-500" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
              <Wallet size={14} /> Total Net Worth
            </h3>
          </div>
          <p className="text-3xl font-black text-white">{formatCurrency(totalBalance)}</p>
          <p className="text-xs font-bold text-los-green mt-2 flex items-center">
            <TrendingUp size={14} className="mr-1" /> +4.2% from last month
          </p>
        </div>

        {/* Monthly Income */}
        <div className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-4">
            <ArrowDownRight size={14} className="text-los-green" /> May Income
          </h3>
          <p className="text-2xl font-black text-los-text">{formatCurrency(1100000)}</p>
          <p className="text-xs text-los-text2 mt-2">1 pending invoice (₦150k)</p>
        </div>

        {/* Monthly Expenses */}
        <div className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2 mb-4">
            <ArrowUpRight size={14} className="text-los-red" /> May Expenses
          </h3>
          <p className="text-2xl font-black text-los-text">{formatCurrency(600000)}</p>
          <div className="w-full bg-white/[0.05] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-los-red h-full rounded-full" style={{ width: '65%' }} />
          </div>
          <p className="text-[10px] text-los-text3 mt-1 text-right">65% of budget used</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. CASH FLOW CHART & ACCOUNTS (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/50 border border-white/[0.06] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-6">Cash Flow Analytics</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                  <XAxis dataKey="name" stroke="#55556a" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#8b8b9d' }} />
                  <Bar dataKey="Income" fill="#00d4aa" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Expenses" fill="#ff4d6d" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Accounts List */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/50 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Active Accounts</h3>
              <button className="text-los-gold text-xs font-bold hover:text-los-orange transition-colors">+ Link Account</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {accounts.map(acc => (
                <div key={acc.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <div className={`p-2 rounded-lg bg-los-${acc.color}/10 text-los-${acc.color} w-fit mb-3 group-hover:scale-110 transition-transform`}>
                    {acc.icon}
                  </div>
                  <p className="text-xs text-los-text2 mb-1">{acc.name}</p>
                  <p className="text-sm font-bold text-los-text">{formatCurrency(acc.balance)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. BUDGETS & TRANSACTIONS (Right Column) */}
        <div className="space-y-6">
          
          {/* Budgets */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-5">Monthly Budgets</h3>
            <div className="space-y-5">
              {budgets.map((budget, i) => {
                const percentage = Math.min(100, Math.round((budget.spent / budget.limit) * 100))
                const isOver = percentage >= 100
                
                return (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-xs font-medium text-los-text">{budget.category}</span>
                      <span className="text-[10px] font-bold text-los-text2">
                        {formatCurrency(budget.spent)} <span className="text-los-text3 font-normal">/ {formatCurrency(budget.limit)}</span>
                      </span>
                    </div>
                    <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${isOver ? 'bg-los-red shadow-[0_0_10px_rgba(255,77,109,0.5)]' : `bg-los-${budget.color}`}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl flex-1">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Recent Transactions</h3>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md hover:bg-white/[0.05] text-los-text3 transition-colors"><Search size={14}/></button>
                <button className="p-1.5 rounded-md hover:bg-white/[0.05] text-los-text3 transition-colors"><Filter size={14}/></button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.amount > 0 ? 'bg-los-green/10 text-los-green' : 'bg-white/[0.03] text-los-text2'}`}>
                      {tx.amount > 0 ? <TrendingDown size={14} /> : <Receipt size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-los-text">{tx.merchant}</p>
                      <p className="text-[10px] text-los-text3 mt-0.5">{tx.date} • {tx.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${tx.amount > 0 ? 'text-los-green' : 'text-los-text'}`}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                    {tx.status === 'pending' && <p className="text-[9px] text-los-orange uppercase tracking-wider mt-0.5">Pending</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-xs font-bold text-los-text3 hover:text-los-text border border-white/[0.04] rounded-lg hover:bg-white/[0.02] transition-all">
              View All Transactions
            </button>
          </motion.div>

        </div>
      </div>

    </motion.div>
  )
}
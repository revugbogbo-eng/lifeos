import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Package, TrendingUp, Search, Plus, Filter, Tag, ArrowRight, Shirt, Code2, PenTool, CheckCircle2, Clock } from 'lucide-react'

// --- MOCK DATA ---
const marketStats = [
  { label: 'Active Listings', value: '8', icon: <Tag size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Pending Orders', value: '4', icon: <ShoppingCart size={16} className="text-los-orange" />, color: 'orange' },
  { label: '30-Day Revenue', value: '₦425,000', icon: <TrendingUp size={16} className="text-los-green" />, color: 'green' },
]

const products = [
  {
    id: 1,
    name: 'Heavyweight Luxury Hoodie',
    category: 'Apparel',
    description: 'Custom embroidered premium blanks. Size L & XL available.',
    price: '₦45,000',
    stock: 12,
    status: 'In Stock',
    icon: <Shirt size={24} className="text-los-orange" />,
    color: 'orange'
  },
  {
    id: 2,
    name: 'Ugbowo Bootcamp Ticket',
    category: 'Service / Tech',
    description: '6-week intensive AI automation & web development training.',
    price: '₦80,000',
    stock: 25,
    status: 'Selling Fast',
    icon: <Code2 size={24} className="text-los-teal" />,
    color: 'teal'
  },
  {
    id: 3,
    name: 'Corporate Brand Identity',
    category: 'Consulting',
    description: 'Full suite: Letterhead, logo, and business card layout.',
    price: '₦120,000',
    stock: 'Unlimited',
    status: 'Available',
    icon: <PenTool size={24} className="text-los-purple" />,
    color: 'purple'
  }
]

const recentOrders = [
  { id: 'ORD-089', client: 'Michael T.', item: 'Luxury Hoodie (Black, L)', amount: '₦45,000', date: 'Today, 2:15 PM', status: 'Processing' },
  { id: 'ORD-088', client: 'Sarah O.', item: 'Bootcamp Registration', amount: '₦80,000', date: 'Yesterday', status: 'Completed' },
  { id: 'ORD-087', client: 'Akraft Eng.', item: 'Letterhead Revisions', amount: '₦15,000', date: 'May 18, 2026', status: 'Completed' },
  { id: 'ORD-086', client: 'David E.', item: 'Luxury Tee (White, M)', amount: '₦25,000', date: 'May 17, 2026', status: 'Shipped' },
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

export const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Marketplace</h1>
          <p className="text-los-text2 text-sm mt-1">Manage physical inventory, digital services, and client orders.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Filter size={14} /> Filter Sales
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-orange to-los-purple text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-orange/20">
            <Plus size={16} /> New Listing
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketStats.map((stat, i) => (
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
        
        {/* 3. PRODUCT CATALOG (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Package size={16} className="text-los-purple" /> Active Listings
              </h3>
              <div className="relative flex-1 sm:max-w-xs">
                <Search size={14} className="absolute left-3 top-2.5 text-los-text3" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-los-text focus:border-los-purple outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(product => (
                <div key={product.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all flex flex-col group h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-los-${product.color}/10 border border-los-${product.color}/20`}>
                      {product.icon}
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                      product.status === 'In Stock' || product.status === 'Available' ? 'bg-los-green/10 text-los-green' : 'bg-los-orange/10 text-los-orange'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">{product.category}</p>
                    <h4 className="text-sm font-bold text-white mb-1">{product.name}</h4>
                    <p className="text-[10px] text-los-text2 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                    <span className="text-lg font-black text-white">{product.price}</span>
                    <span className="text-[10px] font-medium text-los-text3 bg-white/[0.05] px-2 py-1 rounded">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. RECENT ORDERS (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <ShoppingCart size={16} className="text-los-orange" /> Recent Orders
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View All <ArrowRight size={12}/>
              </button>
            </div>
            
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="p-3 rounded-xl bg-[#0f0f1a]/50 border border-transparent hover:border-white/[0.04] transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-los-text">{order.client}</h4>
                      <p className="text-[10px] text-los-text3 mt-0.5">{order.item}</p>
                    </div>
                    {order.status === 'Completed' ? (
                      <CheckCircle2 size={14} className="text-los-green" />
                    ) : order.status === 'Shipped' ? (
                      <Package size={14} className="text-los-teal" />
                    ) : (
                      <Clock size={14} className="text-los-orange" />
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/[0.02]">
                    <span className="text-[9px] text-los-text3">{order.id} • {order.date}</span>
                    <span className="text-xs font-bold text-white">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-bold text-los-text hover:bg-white/[0.05] transition-colors">
              Export Sales CSV
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
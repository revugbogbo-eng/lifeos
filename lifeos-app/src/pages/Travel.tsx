import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Calendar, Luggage, Ticket, Globe, CheckCircle2, Circle, Compass, ArrowRight, Map } from 'lucide-react'

// --- MOCK DATA ---
const travelStats = [
  { label: 'Upcoming Trips', value: '1', icon: <Plane size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Countries Visited', value: '4', icon: <Globe size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Reward Miles', value: '12,450', icon: <Ticket size={16} className="text-los-gold" />, color: 'gold' },
]

const activeTrip = {
  destination: 'Abuja, Nigeria',
  purpose: 'CAC Business Registration & Networking',
  dates: 'May 28 - Jun 02, 2026',
  status: 'Upcoming',
  flights: [
    { type: 'Departure', flightNo: 'AW 114', time: '08:30 AM', date: 'May 28', airport: 'LOS ➔ ABV' },
    { type: 'Return', flightNo: 'AW 205', time: '16:45 PM', date: 'Jun 02', airport: 'ABV ➔ LOS' }
  ],
  accommodation: {
    name: 'Transcorp Hilton Abuja',
    checkIn: 'May 28, 2:00 PM',
    checkOut: 'Jun 02, 11:00 AM'
  }
}

const packingList = [
  { id: 1, item: 'Intl. Passport & ID', category: 'Documents', status: 'packed' },
  { id: 2, item: 'MacBook Pro & Charger', category: 'Tech', status: 'packed' },
  { id: 3, item: 'Business Cards (Akraft)', category: 'Business', status: 'pending' },
  { id: 4, item: 'Power Bank', category: 'Tech', status: 'pending' },
  { id: 5, item: 'Luxury Brand Samples', category: 'Business', status: 'pending' },
]

const pastTrips = [
  { id: 1, destination: 'Accra, Ghana', purpose: 'Tech Conference', date: 'Nov 2025' },
  { id: 2, destination: 'Kigali, Rwanda', purpose: 'Vacation', date: 'Jan 2025' },
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

export const Travel = () => {
  const [checklist, setChecklist] = useState(packingList)

  const toggleItem = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, status: item.status === 'packed' ? 'pending' : 'packed' } : item
    ))
  }

  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Travel Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Manage itineraries, flight logs, and packing lists.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <Compass size={14} /> Explore
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-teal to-blue-500 text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-teal/20">
            <Plane size={16} /> Plan Trip
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {travelStats.map((stat, i) => (
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
        
        {/* 3. ACTIVE ITINERARY (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-los-teal/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-los-teal/10 text-los-teal uppercase tracking-wider mb-3 inline-block">
                  Next Destination
                </span>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <MapPin size={20} className="text-los-orange" /> {activeTrip.destination}
                </h3>
                <p className="text-xs text-los-text2 mt-1 flex items-center gap-1.5">
                  <Calendar size={12} /> {activeTrip.dates}
                </p>
              </div>
              <p className="text-[10px] font-medium text-los-text3 text-right max-w-[120px]">
                {activeTrip.purpose}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {/* Flights */}
              <div className="p-4 rounded-xl bg-[#141428]/60 border border-white/[0.04] space-y-4">
                <h4 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Plane size={14} className="text-los-teal" /> Flight Details
                </h4>
                {activeTrip.flights.map((flight, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/[0.02] pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-[9px] text-los-text3 uppercase">{flight.type}</p>
                      <p className="text-xs font-bold text-white">{flight.flightNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-los-text">{flight.airport}</p>
                      <p className="text-[10px] text-los-text2">{flight.date} • {flight.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accommodation */}
              <div className="p-4 rounded-xl bg-[#141428]/60 border border-white/[0.04]">
                <h4 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                  <Map size={14} className="text-los-purple" /> Accommodation
                </h4>
                <p className="text-sm font-bold text-white mb-3">{activeTrip.accommodation.name}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-los-text3">Check-in</span>
                    <span className="text-los-text">{activeTrip.accommodation.checkIn}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-los-text3">Check-out</span>
                    <span className="text-los-text">{activeTrip.accommodation.checkOut}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Past Trips Mini-Log */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider">Travel History</h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View Log <ArrowRight size={12}/>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {pastTrips.map(trip => (
                <div key={trip.id} className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.05] text-los-text2"><MapPin size={14}/></div>
                  <div>
                    <h4 className="text-xs font-bold text-los-text">{trip.destination}</h4>
                    <p className="text-[9px] text-los-text3 mt-0.5">{trip.date} • {trip.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. PACKING CHECKLIST (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <Luggage size={16} className="text-los-orange" /> Packing Checklist
              </h3>
            </div>
            
            <div className="space-y-2 flex-1">
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    item.status === 'packed' 
                      ? 'bg-los-green/5 border-los-green/20' 
                      : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.status === 'packed' ? (
                      <CheckCircle2 size={16} className="text-los-green shrink-0" />
                    ) : (
                      <Circle size={16} className="text-los-text3 shrink-0" />
                    )}
                    <div>
                      <p className={`text-xs font-bold ${item.status === 'packed' ? 'text-los-text3 line-through' : 'text-los-text'}`}>
                        {item.item}
                      </p>
                      <p className="text-[9px] text-los-text3 uppercase tracking-wider mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-bold text-los-text hover:bg-white/[0.05] transition-colors">
              Add Item
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
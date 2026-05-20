import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, MonitorPlay, Trophy, PlayCircle, BookMarked, Code2, Leaf, Clock, ArrowRight, BrainCircuit } from 'lucide-react'

// --- MOCK DATA ---
const stats = [
  { label: 'Study Hours (Week)', value: '14.5', icon: <Clock size={16} className="text-los-teal" />, color: 'teal' },
  { label: 'Courses Active', value: '3', icon: <MonitorPlay size={16} className="text-los-purple" />, color: 'purple' },
  { label: 'Books Read (Year)', value: '8', icon: <BookOpen size={16} className="text-los-gold" />, color: 'gold' },
]

const courses = [
  { id: 1, title: 'Machine Learning with Python', subtitle: 'Scikit-Learn & Pandas', provider: 'DataCamp', progress: 65, modules: '8/12', icon: <Code2 size={24} className="text-los-teal" />, color: 'teal' },
  { id: 2, title: 'Advanced Frontend Architecture', subtitle: 'React & System Design', provider: 'Frontend Masters', progress: 80, modules: '16/20', icon: <MonitorPlay size={24} className="text-los-purple" />, color: 'purple' },
  { id: 3, title: 'Environmental Data Analysis', subtitle: 'Statistical Modeling', provider: 'Coursera', progress: 30, modules: '3/10', icon: <Leaf size={24} className="text-los-green" />, color: 'green' },
]

const readingList = [
  { id: 1, title: 'Clean Architecture', author: 'Robert C. Martin', status: 'Reading', progress: 45, cover: 'bg-gradient-to-br from-gray-700 to-gray-900' },
  { id: 2, title: 'Applied Microbiology for Waste Treatment', author: 'S.K. Singh', status: 'Next Up', progress: 0, cover: 'bg-gradient-to-br from-green-800 to-green-950' },
  { id: 3, title: 'The Pragmatic Programmer', author: 'David Thomas', status: 'Completed', progress: 100, cover: 'bg-gradient-to-br from-los-purple/40 to-black' },
]

const skills = [
  { name: 'Python Automation', level: 85, color: 'teal' },
  { name: 'React / Next.js', level: 78, color: 'purple' },
  { name: 'Data Visualization', level: 65, color: 'blue' },
  { name: 'Penetration Testing', level: 50, color: 'red' },
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

export const Learning = () => {
  return (
    <motion.div className="space-y-6 pb-20 select-none" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER & QUICK ACTIONS */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Learning Hub</h1>
          <p className="text-los-text2 text-sm mt-1">Accelerate skill acquisition and knowledge retention.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-los-card border border-white/[0.08] text-xs font-bold text-los-text hover:bg-white/[0.05] transition-all flex items-center gap-2">
            <BookMarked size={14} /> Add Book
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-los-teal to-blue-500 text-[#0f0f1a] text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-los-teal/20">
            <PlayCircle size={16} /> Resume Course
          </button>
        </div>
      </motion.div>

      {/* 2. SUMMARY STATS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
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
        
        {/* 3. ACTIVE COURSES (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit size={16} className="text-los-purple" /> Active Curriculums
              </h3>
              <button className="text-[10px] font-bold text-los-text3 hover:text-los-text flex items-center gap-1 uppercase tracking-wider transition-colors">
                View All <ArrowRight size={12}/>
              </button>
            </div>

            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group flex flex-col md:flex-row md:items-center gap-4">
                  <div className={`p-4 rounded-xl bg-los-${course.color}/10 border border-los-${course.color}/20 flex items-center justify-center`}>
                    {course.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-bold text-los-text">{course.title}</h4>
                        <p className="text-[10px] text-los-text2">{course.subtitle} • <span className="text-los-text3">{course.provider}</span></p>
                      </div>
                      <span className={`text-xs font-bold text-los-${course.color}`}>{course.progress}%</span>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-los-${course.color} rounded-full`}
                          initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-los-text3 uppercase tracking-wider w-12 text-right">
                        {course.modules} Mod
                      </span>
                    </div>
                  </div>
                  
                  <button className="hidden md:flex w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] items-center justify-center text-los-text3 hover:text-white hover:bg-white/[0.1] transition-all group-hover:scale-110">
                    <PlayCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Radar / Matrix (Simplified to Bars for layout) */}
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider mb-5">Skill Proficiency Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-los-text">{skill.name}</span>
                    <span className={`text-los-${skill.color}`}>{skill.level}/100</span>
                  </div>
                  <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-los-${skill.color} rounded-full`}
                      initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. READING LIST (Right Column) */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-6 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-los-text3 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={16} className="text-los-gold" /> Reading List
              </h3>
            </div>
            
            <div className="space-y-4">
              {readingList.map(book => (
                <div key={book.id} className="flex gap-4 p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all group">
                  <div className={`w-14 h-20 rounded-md shadow-md ${book.cover} flex items-center justify-center border border-white/[0.1]`}>
                    <BookOpen size={16} className="text-white/30" />
                  </div>
                  
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-los-text line-clamp-1">{book.title}</h4>
                      <p className="text-[10px] text-los-text3 mt-0.5">{book.author}</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9px] uppercase font-bold tracking-wider ${
                          book.status === 'Completed' ? 'text-los-green' : book.status === 'Reading' ? 'text-los-gold' : 'text-los-text3'
                        }`}>
                          {book.status}
                        </span>
                        {book.progress > 0 && <span className="text-[9px] text-los-text2">{book.progress}%</span>}
                      </div>
                      
                      {book.progress > 0 && book.progress < 100 && (
                        <div className="w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
                          <div className="h-full bg-los-gold rounded-full" style={{ width: `${book.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-bold text-los-text hover:bg-white/[0.05] transition-colors">
              Explore Library
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, Search, Plus, Star, FileText, Clock, Loader2, X, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const categories = ['All Notes', 'Software Dev', 'Business', 'Environment', 'Personal']

export const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState('All Notes')
  const [searchQuery, setSearchQuery] = useState('')
  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', excerpt: '', category: 'Software Dev' })

  // --- 1. LIVE SUPABASE FETCH (READ) ---
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setNotes(data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // --- 2. LIVE SUPABASE INSERT (CREATE) ---
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.title.trim()) return

    try {
      setIsSubmitting(true)
      
      const noteToInsert = {
        title: newNote.title,
        excerpt: newNote.excerpt,
        category: newNote.category,
        tags: ['New'],
        is_starred: false,
        color: newNote.category === 'Environment' ? 'green' : 
               newNote.category === 'Business' ? 'orange' : 'teal'
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([noteToInsert])
        .select()

      if (error) throw error

      if (data) {
        setNotes(prev => [data[0], ...prev])
        setIsModalOpen(false)
        setNewNote({ title: '', excerpt: '', category: 'Software Dev' })
      }
    } catch (error) {
      console.error('Error adding note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- 3. LIVE SUPABASE DELETE (DELETE) ---
  const handleDeleteNote = async (id: number) => {
    // 1. Ask for quick confirmation
    if (!window.confirm("Delete this note permanently?")) return

    // 2. Optimistic UI Update: Instantly remove it from the screen
    setNotes(prev => prev.filter(note => note.id !== id))

    try {
      // 3. Tell Supabase to delete it from the database
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      // If it fails, fetch the true data again to reset the UI
      fetchNotes()
    }
  }

  // --- FILTERING LOGIC ---
  const filteredNotes = notes.filter(note => 
    (activeCategory === 'All Notes' || note.category === activeCategory) &&
    (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (note.excerpt && note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  // --- ANIMATION VARIANTS ---
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }

  return (
    <motion.div className="space-y-6 pb-20 select-none relative" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* HEADER */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Knowledge Base</h1>
          
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-2.5 text-los-text3" />
            <input 
              type="text" placeholder="Search knowledge..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-los-card border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-los-text focus:border-los-purple outline-none"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-los-purple to-los-teal text-white text-xs font-bold hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={16} /> New Note
          </button>
        </div>
      </motion.div>

      {/* CATEGORIES */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat, i) => (
          <button 
            key={i} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 cursor-pointer rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-white/[0.1] text-white border-white/[0.15]' : 'bg-white/[0.02] text-los-text3 hover:text-los-text2'}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* NOTES GRID */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-los-teal animate-spin" />
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div key={note.id} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all group flex flex-col relative">
              
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md bg-los-${note.color}/10 text-los-${note.color} uppercase`}>
                  {note.category}
                </span>
                
                <div className="flex items-center gap-2">
                  {note.is_starred && <Star size={14} className="text-los-gold fill-los-gold" />}
                  
                  {/* DELETE BUTTON */}
                  <button 
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 rounded-md text-los-text3 hover:text-los-red hover:bg-los-red/10 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-los-purple transition-colors">{note.title}</h3>
              <p className="text-xs text-los-text2 leading-relaxed line-clamp-3 mb-4 flex-1">{note.excerpt}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                <div className="flex gap-1.5">
                  {note.tags && note.tags.slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="text-[9px] text-los-text3 bg-white/[0.03] px-1.5 py-0.5 rounded">#{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] text-los-text3 flex items-center gap-1">
                  <Clock size={10} /> {new Date(note.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <FileText size={48} className="mx-auto text-los-text3 mb-4 opacity-50" />
            <p className="text-sm font-medium text-los-text2">No notes found.</p>
          </div>
        )}
      </motion.div>

      {/* NEW NOTE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0f0f1a] border border-white/[0.1] rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-white">Create New Note</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-los-text3 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-1 block">Title</label>
                  <input 
                    type="text" required autoFocus
                    value={newNote.title} onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-teal outline-none transition-colors"
                    placeholder="Enter note title..."
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-1 block">Category</label>
                  <select 
                    value={newNote.category} onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                    className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-teal outline-none transition-colors appearance-none"
                  >
                    {categories.filter(c => c !== 'All Notes').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-1 block">Content</label>
                  <textarea 
                    rows={4} required
                    value={newNote.excerpt} onChange={(e) => setNewNote({...newNote, excerpt: e.target.value})}
                    className="w-full bg-[#141428] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-los-text focus:border-los-teal outline-none transition-colors resize-none"
                    placeholder="Type your ideas here..."
                  />
                </div>

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-los-teal to-blue-500 text-[#0f0f1a] text-xs font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-2 mt-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Save Note'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </motion.div>
  )
}
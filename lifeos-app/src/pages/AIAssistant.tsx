import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Sparkles, Cpu, Zap, Mic, Paperclip, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

// --- MOCK DATA ---
const initialMessages = [
  { id: 1, sender: 'system', text: 'Authentication confirmed. LifeOS AI Node v2.4 initialized. All local context clusters (Finance, Health, Goals) are synced. How can I assist you today, Daniel?', time: '08:00 AM' },
  { id: 2, sender: 'user', text: 'Can you analyze my May expenses against my current budget?', time: '08:02 AM' },
  { id: 3, sender: 'system', text: 'Analyzing... You have spent ₦600,000 this month, which is 65% of your total budget. Your highest variance is in "Food & Dining" (₦85k / ₦120k). You are on track, but I recommend pausing the unused Netflix sub to optimize cash flow.', time: '08:02 AM' },
]

const suggestedPrompts = [
  "Draft an email to Dr. Tekevwe regarding Chapter 3.",
  "What is my current net worth projection for Q4?",
  "Generate a 1,800 Kcal Nigerian meal plan.",
  "List pending tasks for the Ugbowo Initiative."
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

export const AiAssistant = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newUserMsg = { id: Date.now(), sender: 'user', text, time: userTime }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    try {
      const apiHistory = messages
        .filter(msg => msg.id !== 1)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))

      // PRODUCTION READY: Hitting your secure Supabase Edge Function instead of OpenAI directly
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [systemPrompt, ...apiHistory, { role: 'user', content: text }] }
      })

      if (error) throw error
      if (data.error) throw new Error(data.error.message)

      const aiResponseText = data.choices[0].message.content
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'system', 
        text: aiResponseText, 
        time: aiTime 
      }])

    } catch (error: any) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'system', 
        text: `⚠️ System Error: Could not connect to the neural network.`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <motion.div className="space-y-6 pb-20 select-none h-[calc(100vh-100px)] flex flex-col" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* 1. HEADER */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-los-teal to-los-purple tracking-tight flex items-center gap-2">
            <Sparkles size={28} className="text-los-teal" /> OS Intelligence
          </h1>
          <p className="text-los-text2 text-sm mt-1">Your autonomous cognitive interface.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-los-green/10 border border-los-green/20 text-[10px] font-bold text-los-green flex items-center gap-1.5 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-los-green animate-pulse" /> System Online
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* 2. CHAT INTERFACE (Main Column - takes 3/4 space) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 glass-card bg-[#0f0f1a]/80 border border-white/[0.06] rounded-2xl flex flex-col h-full overflow-hidden relative">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-los-teal/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
            {messages.map(msg => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className="shrink-0 mt-1">
                    {msg.sender === 'system' ? (
                      <div className="w-8 h-8 rounded-lg bg-los-teal/10 border border-los-teal/20 flex items-center justify-center text-los-teal shadow-[0_0_10px_rgba(0,212,170,0.2)]">
                        <Cpu size={16} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white text-xs font-bold">
                        ME
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-los-purple text-white rounded-tr-sm' 
                        : 'bg-[#141428] border border-white/[0.05] text-los-text rounded-tl-sm shadow-lg'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-los-text3 mt-1.5 font-medium tracking-wider">{msg.time}</span>
                  </div>
                  
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-los-teal/10 border border-los-teal/20 flex items-center justify-center text-los-teal">
                    <Cpu size={16} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-[#141428] border border-white/[0.05] flex gap-1.5 items-center h-[52px]">
                    <div className="w-1.5 h-1.5 bg-los-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-los-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-los-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0a0a14] border-t border-white/[0.05] relative z-10">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
              className="flex items-end gap-2 bg-[#141428] border border-white/[0.08] p-2 rounded-xl focus-within:border-los-teal/50 transition-colors shadow-inner"
            >
              <button type="button" className="p-2 text-los-text3 hover:text-white transition-colors shrink-0">
                <Paperclip size={18} />
              </button>
              
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Ask LifeOS to analyze data, schedule tasks, or draft content..."
                className="flex-1 bg-transparent border-none text-sm text-los-text placeholder:text-los-text3 resize-none outline-none max-h-32 min-h-[40px] py-2.5 custom-scrollbar"
                rows={1}
              />
              
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" className="p-2 text-los-text3 hover:text-white transition-colors">
                  <Mic size={18} />
                </button>
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                    inputValue.trim() && !isTyping 
                      ? 'bg-los-teal text-[#0f0f1a] hover:scale-105' 
                      : 'bg-white/[0.05] text-los-text3'
                  }`}
                >
                  <Send size={16} className={inputValue.trim() && !isTyping ? 'ml-0.5' : ''} />
                </button>
              </div>
            </form>
            <p className="text-center text-[9px] text-los-text3 mt-2">
              LifeOS AI can make mistakes. Consider verifying critical data.
            </p>
          </div>
        </motion.div>

        {/* 3. CONTEXT & PROMPTS (Right Sidebar) */}
        <div className="hidden lg:flex flex-col gap-6 h-full">
          
          <motion.div variants={itemVariants} className="glass-card bg-[#141428]/60 border border-white/[0.04] p-5 rounded-2xl">
            <h3 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Zap size={14} className="text-los-gold" /> Suggested Actions
            </h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, i) => (
                <button 
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] text-xs text-los-text2 hover:text-white transition-all flex items-start gap-2 group"
                >
                  <ChevronRight size={14} className="mt-0.5 text-los-text3 group-hover:text-los-teal shrink-0" />
                  <span className="leading-snug">{prompt}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bg-[#0f0f1a]/80 border border-white/[0.06] p-5 rounded-2xl flex-1">
            <h3 className="text-[10px] font-bold text-los-text3 uppercase tracking-wider mb-4">Active Context</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">Current Focus</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-los-purple" />
                  <p className="text-xs font-bold text-los-text">Ugbowo Tech Bootcamp Prep</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">Financial State</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-los-green" />
                  <p className="text-xs font-bold text-los-text">Budget optimal (+₦120k margin)</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-los-text3 uppercase tracking-wider mb-1">API Integrations</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/[0.05] text-los-text2">Supabase DB</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/[0.05] text-los-text2">Google Cal</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
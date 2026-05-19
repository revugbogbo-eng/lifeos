import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: ModalProps) => {
  
  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Structural Glass Backdrop Mask with Blur Filter */}
      <div 
        className="fixed inset-0 bg-[#07070f]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container Dialog */}
      <div 
        className={`relative w-full ${sizeClasses[size]} bg-los-card border border-los-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-los-border">
          <h3 className="text-lg font-semibold text-los-text">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-los-text3 hover:text-los-text hover:bg-white/[0.04] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Dynamic Content Viewport */}
        <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin select-auto">
          {children}
        </div>
      </div>
      
    </div>
  )
}
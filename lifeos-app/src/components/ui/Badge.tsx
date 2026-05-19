import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) => {
  
  // Base structural layout for the pill shape
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors whitespace-nowrap select-none'

  // Thematic color mappings utilizing LifeOS custom variables
  const variants = {
    default: 'bg-[#141428] text-los-text2 border border-white/[0.06]',
    success: 'bg-los-green/10 text-los-green border border-los-green/20',
    warning: 'bg-los-orange/10 text-los-orange border border-los-orange/20',
    error: 'bg-los-red/10 text-los-red border border-los-red/20',
    info: 'bg-los-purple/10 text-los-purple border border-los-purple/20',
    outline: 'bg-transparent text-los-text3 border border-los-border hover:bg-white/[0.02]',
  }

  // Sizing controls for typography and padding padding
  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}
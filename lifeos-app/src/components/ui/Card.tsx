import React from 'react'
import { motion } from 'framer-motion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect?: boolean
  animated?: boolean
}

export const Card = ({
  children,
  padding = 'md',
  hoverEffect = false,
  animated = false,
  className = '',
  ...props
}: CardProps) => {
  
  // Padding variants for different content types
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  }

  // Base layout and style combining your global CSS class and Tailwind
  const baseClasses = `glass-card w-full overflow-hidden ${paddingClasses[padding]} ${
    hoverEffect ? 'hover:border-los-purple/50 hover:shadow-lg hover:shadow-los-purple/10 transition-all duration-300' : ''
  } ${className}`

  // Render with Framer Motion entry animations if requested
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={baseClasses}
        {...(props as any)}
      >
        {children}
      </motion.div>
    )
  }

  // Render standard static card
  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}
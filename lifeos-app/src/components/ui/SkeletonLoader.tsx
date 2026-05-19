import React from 'react'

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'table-row'
  className?: string
}

export const SkeletonLoader = ({ variant = 'text', className = '' }: SkeletonLoaderProps) => {
  // Card Variant: A large block for modules and charts
  if (variant === 'card') {
    return <div className={`skeleton w-full h-48 rounded-2xl ${className}`} />
  }

  // Avatar Variant: A perfect circle for user profiles
  if (variant === 'avatar') {
    return <div className={`skeleton w-12 h-12 rounded-full ${className}`} />
  }

  // Table Row Variant: A complex layout imitating a list item or transaction
  if (variant === 'table-row') {
    return (
      <div className={`flex items-center gap-4 w-full p-3 rounded-xl border border-white/[0.02] bg-white/[0.01] ${className}`}>
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="skeleton w-3/4 h-4 rounded-md" />
          <div className="skeleton w-1/2 h-3 rounded-md" />
        </div>
        <div className="skeleton w-16 h-8 rounded-lg" />
      </div>
    )
  }

  // Default Text Variant: Three stacked lines of varying widths imitating paragraphs
  return (
    <div className={`space-y-3 w-full ${className}`}>
      <div className="skeleton w-full h-4 rounded-md" />
      <div className="skeleton w-5/6 h-4 rounded-md" />
      <div className="skeleton w-4/6 h-4 rounded-md" />
    </div>
  )
}
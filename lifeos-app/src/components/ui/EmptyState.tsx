import React from 'react'
import { FolderX } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState = ({
  icon = <FolderX size={48} className="text-los-purple/50" />,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[300px] rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] ${className}`}>
      
      {/* Icon Container with subtle pulse animation */}
      <div className="mb-4 p-4 rounded-full bg-los-purple/10 border border-los-purple/20 shadow-inner animate-pulse">
        {icon}
      </div>
      
      {/* Text Content */}
      <h3 className="text-lg font-bold text-los-text mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-los-text2 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Optional Call to Action Button */}
      {actionLabel && onAction && (
        <Button 
          variant="primary" 
          onClick={onAction}
          className="shadow-los-purple/20 hover:shadow-los-purple/40"
        >
          {actionLabel}
        </Button>
      )}
      
    </div>
  )
}
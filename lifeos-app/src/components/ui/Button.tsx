import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  loading?: boolean
  children: React.ReactNode
}

export const Button = ({ 
  variant = 'primary', 
  loading = false, 
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) => {
  
  const baseStyles = 'px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase select-none transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variants = {
    primary: 'bg-gradient-to-r from-los-purple to-los-purple2 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-los-purple/10',
    secondary: 'bg-white/[0.04] border border-white/[0.08] text-los-text hover:bg-white/[0.08] hover:text-white',
    danger: 'bg-los-red/10 border border-los-red/20 text-los-red hover:bg-los-red/20',
    ghost: 'text-los-text2 hover:bg-white/[0.03] hover:text-los-text',
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props} // This now only spreads valid HTML attributes because 'loading' was extracted above!
    >
      {loading && (
        <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  )
}
import React from 'react'
import { useAppStore } from '../../store'
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

export const ToastStack = () => {
  const { toasts, removeToast } = useAppStore()

  const iconMap = {
    success: <CheckCircle className="text-los-green" size={16} />,
    error: <XCircle className="text-los-red" size={16} />,
    warning: <AlertTriangle className="text-los-orange" size={16} />,
    info: <Info className="text-los-purple" size={16} />,
  }

  const borderMap = {
    success: 'border-los-green/20 bg-[#0f0f1a]/95 shadow-los-green/5',
    error: 'border-los-red/20 bg-[#0f0f1a]/95 shadow-los-red/5',
    warning: 'border-los-orange/20 bg-[#0f0f1a]/95 shadow-los-orange/5',
    info: 'border-los-purple/20 bg-[#0f0f1a]/95 shadow-los-purple/5',
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 w-full max-w-sm pointer-events-none select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex gap-3 p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform animate-fade-in ${
            borderMap[toast.type]
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">{iconMap[toast.type]}</div>
          
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-los-text truncate">{toast.title}</h5>
            {toast.message && (
              <p className="text-[11px] text-los-text2 mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-1 h-fit rounded-lg text-los-text3 hover:text-los-text hover:bg-white/[0.04] transition-all duration-150"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  )
}
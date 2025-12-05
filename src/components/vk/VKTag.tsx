import { HTMLAttributes, ReactNode } from 'react'

interface VKTagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  removable?: boolean
  onRemove?: () => void
}

export function VKTag({ children, variant = 'default', removable = false, onRemove, className = '', ...props }: VKTagProps) {
  const baseStyles = 'inline-flex items-center gap-vk-1 px-vk-2 py-0.5 rounded-vk-sm font-vk-regular text-vk-xs border'

  const variantStyles = {
    default: 'bg-vk-bg-secondary text-vk-text-primary border-vk-border-secondary',
    primary: 'bg-vk-accent-blue-alpha text-vk-accent-blue border-vk-accent-blue-alpha',
    success: 'bg-vk-status-positive/10 text-vk-status-positive border-vk-status-positive/20',
    warning: 'bg-vk-status-warning/10 text-vk-status-warning border-vk-status-warning/20',
    error: 'bg-vk-status-negative/10 text-vk-status-negative border-vk-status-negative/20',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-vk-1 hover:opacity-70 transition-opacity"
          aria-label="Удалить тег"
        >
          <svg className="w-vk-3 h-vk-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}


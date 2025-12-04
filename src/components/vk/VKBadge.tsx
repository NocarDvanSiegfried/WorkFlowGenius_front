import { HTMLAttributes, ReactNode } from 'react'

interface VKBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  size?: 's' | 'm'
}

export function VKBadge({ children, variant = 'default', size = 'm', className = '', ...props }: VKBadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-vk-medium rounded-vk-full'

  const variantStyles = {
    default: 'bg-vk-bg-secondary text-vk-text-primary',
    primary: 'bg-vk-accent-blue-alpha text-vk-accent-blue',
    success: 'bg-vk-status-positive/10 text-vk-status-positive',
    warning: 'bg-vk-status-warning/10 text-vk-status-warning',
    error: 'bg-vk-status-negative/10 text-vk-status-negative',
  }

  const sizeStyles = {
    s: 'px-vk-2 py-0.5 text-vk-xs',
    m: 'px-vk-3 py-1 text-vk-sm',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </span>
  )
}


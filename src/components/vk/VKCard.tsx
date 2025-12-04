import { HTMLAttributes, ReactNode } from 'react'

interface VKCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 's' | 'm' | 'l'
}

export function VKCard({ children, variant = 'default', padding = 'm', className = '', ...props }: VKCardProps) {
  const baseStyles = 'bg-vk-bg-content rounded-vk-lg transition-all duration-vk-base ease-vk-standard hover:shadow-vk-1 hover:-translate-y-0.5 active:translate-y-0'

  const variantStyles = {
    default: 'border border-vk-border-secondary',
    outlined: 'border border-vk-border',
    elevated: 'shadow-vk-2 border border-vk-border-secondary',
  }

  const paddingStyles = {
    none: '',
    s: 'p-vk-3',
    m: 'p-vk-4',
    l: 'p-vk-6',
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`} {...props}>
      {children}
    </div>
  )
}


import { HTMLAttributes } from 'react'

interface VKProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 's' | 'm' | 'l'
  variant?: 'default' | 'accent' | 'positive' | 'negative' | 'warning'
}

const sizeStyles = {
  s: 'h-vk-1',
  m: 'h-vk-2',
  l: 'h-vk-3',
}

const variantStyles = {
  default: 'bg-vk-accent-blue',
  accent: 'bg-vk-accent-blue',
  positive: 'bg-vk-status-positive',
  negative: 'bg-vk-status-negative',
  warning: 'bg-vk-status-warning',
}

export function VKProgress({
  value,
  max = 100,
  size = 's',
  variant = 'default',
  className = '',
  ...props
}: VKProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={`w-full ${sizeStyles[size]} bg-vk-bg-tertiary rounded-full overflow-hidden ${className}`}
      {...props}
    >
      <div
        className={`h-full ${variantStyles[variant]} rounded-full transition-all duration-vk-base ease-vk-standard`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}




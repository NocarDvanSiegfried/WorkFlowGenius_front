import { HTMLAttributes, ReactNode } from 'react'

interface VKSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function VKSectionHeader({ title, subtitle, action, className = '', ...props }: VKSectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-vk-4 ${className}`} {...props}>
      <div>
        <h2 className="text-vk-xl font-vk-semibold text-vk-text-primary leading-tight">{title}</h2>
        {subtitle && <p className="mt-vk-1 text-vk-base text-vk-text-secondary">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}


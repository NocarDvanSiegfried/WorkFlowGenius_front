import { HTMLAttributes, ReactNode } from 'react'

interface VKChartWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function VKChartWrapper({ children, title, subtitle, className = '', ...props }: VKChartWrapperProps) {
  return (
    <div className={`bg-vk-bg-content rounded-vk-lg border border-vk-border-secondary p-vk-4 ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="mb-vk-4">
          {title && <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-1">{title}</h3>}
          {subtitle && <p className="text-vk-sm text-vk-text-secondary">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}


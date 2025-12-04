import { HTMLAttributes, ReactNode } from 'react'

interface VKPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export function VKPanel({ children, header, footer, className = '', ...props }: VKPanelProps) {
  return (
    <div className={`bg-vk-bg-content rounded-vk-lg border border-vk-border-secondary ${className}`} {...props}>
      {header && <div className="px-vk-4 py-vk-3 border-b border-vk-border-secondary">{header}</div>}
      <div className="px-vk-4 py-vk-4">{children}</div>
      {footer && <div className="px-vk-4 py-vk-3 border-t border-vk-border-secondary">{footer}</div>}
    </div>
  )
}


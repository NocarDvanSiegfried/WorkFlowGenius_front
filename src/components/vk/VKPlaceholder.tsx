import { HTMLAttributes, ReactNode } from 'react'

interface VKPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  icon?: ReactNode
  title?: string
  action?: ReactNode
}

export function VKPlaceholder({ children, icon, title, action, className = '', ...props }: VKPlaceholderProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-vk-16 px-vk-4 text-center ${className}`} {...props}>
      {icon && <div className="mb-vk-4 text-vk-text-tertiary">{icon}</div>}
      {title && <h3 className="text-vk-text-primary font-vk-semibold text-vk-lg mb-vk-2">{title}</h3>}
      <p className="text-vk-text-secondary font-vk-regular text-vk-base mb-vk-4 max-w-md">{children}</p>
      {action && <div>{action}</div>}
    </div>
  )
}




import { HTMLAttributes, ReactNode } from 'react'

interface VKTabsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function VKTabs({ children, className = '', ...props }: VKTabsProps) {
  return (
    <div className={`flex gap-vk-1 overflow-x-auto scroll-smooth ${className}`} {...props}>
      {children}
    </div>
  )
}

interface VKTabProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  active?: boolean
}

export function VKTab({ children, active = false, className = '', ...props }: VKTabProps) {
  return (
    <button
      className={`px-vk-4 py-vk-2 rounded-vk-md font-vk-medium text-vk-base transition-all duration-vk-base ease-vk-standard whitespace-nowrap flex-shrink-0 ${
        active
          ? 'bg-vk-accent-blue text-white shadow-vk-1 scale-100'
          : 'bg-vk-bg text-vk-text-secondary hover:bg-vk-bg-hover hover:text-vk-text-primary hover:scale-vk-hover active:scale-vk-active border border-vk-border-secondary'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}


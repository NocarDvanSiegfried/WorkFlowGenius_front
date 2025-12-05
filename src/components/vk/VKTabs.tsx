import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKTabsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function VKTabs({ children, className = '', style, ...props }: VKTabsProps) {
  const tabsStyle: CSSProperties = {
    display: 'flex',
    gap: 'var(--vk-spacing-2)',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    ...style,
  }

  return (
    <div className={className} style={tabsStyle} {...props}>
      {children}
    </div>
  )
}

interface VKTabProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  active?: boolean
}

export function VKTab({ children, active = false, className = '', style, ...props }: VKTabProps) {
  const tabStyle: CSSProperties = {
    height: '32px',
    paddingLeft: 'var(--vk-spacing-4)',
    paddingRight: 'var(--vk-spacing-4)',
    borderRadius: 'var(--vk-radius-lg)',
    fontSize: 'var(--vk-font-size-sm)',
    fontWeight: 'var(--vk-font-weight-medium)',
    transition: 'all var(--vk-transition-base)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    ...(active
      ? {
          backgroundColor: 'var(--vk-color-accent-blue)',
          color: 'var(--vk-color-background-content)',
          boxShadow: 'var(--vk-shadow-elevation-1)',
        }
      : {
          backgroundColor: 'var(--vk-color-background-content)',
          color: 'var(--vk-color-text-secondary)',
          border: '1px solid var(--vk-color-border-secondary)',
        }),
    ...style,
  }

  return (
    <button
      className={className}
      style={tabStyle}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'var(--vk-color-background-hover)'
          e.currentTarget.style.color = 'var(--vk-color-text-primary)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'var(--vk-color-background-content)'
          e.currentTarget.style.color = 'var(--vk-color-text-secondary)'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

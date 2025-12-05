import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  separator?: boolean
  mode?: 'card' | 'plain'
}

export function VKGroup({ children, header, separator = true, mode = 'card', className = '', style, ...props }: VKGroupProps) {
  const groupStyle: CSSProperties = {
    backgroundColor: mode === 'card' ? 'var(--vk-color-background-content)' : 'transparent',
    borderRadius: mode === 'card' ? 'var(--vk-radius-lg)' : 0,
    border: mode === 'card' ? '1px solid var(--vk-color-border-secondary)' : 'none',
    overflow: 'hidden',
    width: '100%',
    ...style,
  }

  const headerStyle: CSSProperties = {
    padding: 'var(--vk-spacing-3) var(--vk-spacing-4)',
    borderBottom: separator ? '1px solid var(--vk-color-border-secondary)' : 'none',
    backgroundColor: 'var(--vk-color-background-secondary)',
  }

  const childrenStyle: CSSProperties = {
    padding: 'var(--vk-spacing-4)',
  }

  return (
    <div className={className} style={groupStyle} {...props}>
      {header && <div style={headerStyle}>{header}</div>}
      <div style={childrenStyle}>{children}</div>
    </div>
  )
}

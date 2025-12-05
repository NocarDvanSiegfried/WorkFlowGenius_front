import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKGroupHeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  mode?: 'primary' | 'secondary'
  size?: 's' | 'm' | 'l'
  indicator?: ReactNode
  after?: ReactNode
}

export function VKGroupHeader({
  children,
  mode = 'primary',
  size = 'm',
  indicator,
  after,
  className = '',
  style,
  ...props
}: VKGroupHeaderProps) {
  const headerStyle: CSSProperties = {
    fontSize: size === 's' ? 'var(--vk-font-size-sm)' : size === 'm' ? 'var(--vk-font-size-base)' : 'var(--vk-font-size-lg)',
    fontWeight: 'var(--vk-font-weight-semibold)',
    color: mode === 'primary' ? 'var(--vk-color-text-primary)' : 'var(--vk-color-text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--vk-spacing-2)',
    ...style,
  }

  return (
    <div className={className} style={headerStyle} {...props}>
      {indicator && <span>{indicator}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {after && <span>{after}</span>}
    </div>
  )
}



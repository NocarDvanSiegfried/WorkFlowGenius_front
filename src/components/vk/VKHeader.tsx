import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKHeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  mode?: 'primary' | 'secondary'
  size?: 's' | 'm' | 'l'
  indicator?: ReactNode
  after?: ReactNode
}

export function VKHeader({
  children,
  mode = 'primary',
  size = 'm',
  indicator,
  after,
  className = '',
  style,
  ...props
}: VKHeaderProps) {
  const headerStyle: CSSProperties = {
    width: '100%',
    height: '64px',
    backgroundColor: 'var(--vk-color-background-content)',
    borderBottom: '1px solid var(--vk-color-border)',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--vk-shadow-elevation-1)',
    ...style,
  }

  return (
    <header className={className} style={headerStyle} {...props}>
      {indicator && <span>{indicator}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {after && <span>{after}</span>}
    </header>
  )
}

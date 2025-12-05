import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKCardGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 's' | 'm' | 'l'
}

const sizeValues = {
  s: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--vk-spacing-3)',
  },
  m: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--vk-spacing-4)',
  },
  l: {
    gridTemplateColumns: '1fr',
    gap: 'var(--vk-spacing-4)',
  },
}

export function VKCardGrid({ children, size = 'm', className = '', style, ...props }: VKCardGridProps) {
  const gridStyle: CSSProperties = {
    display: 'grid',
    ...sizeValues[size],
    width: '100%',
    ...style,
  }

  return (
    <div className={className} style={gridStyle} {...props}>
      {children}
    </div>
  )
}

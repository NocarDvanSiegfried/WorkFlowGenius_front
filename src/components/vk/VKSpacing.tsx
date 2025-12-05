import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKSpacingProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

const spacingValues = {
  xs: 'var(--vk-spacing-2)',
  s: 'var(--vk-spacing-3)',
  m: 'var(--vk-spacing-6)',
  l: 'var(--vk-spacing-8)',
  xl: 'var(--vk-spacing-10)',
}

export function VKSpacing({ children, size = 'm', className = '', style, ...props }: VKSpacingProps) {
  const spacingStyle: CSSProperties = {
    paddingTop: spacingValues[size],
    paddingBottom: spacingValues[size],
    ...style,
  }

  return (
    <div className={className} style={spacingStyle} {...props}>
      {children}
    </div>
  )
}

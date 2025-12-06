import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  mode?: 'shadow' | 'tint' | 'outline' | 'outline-tint' | 'plain'
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 's' | 'm' | 'l'
}

const paddingValues = {
  none: '0',
  s: 'var(--vk-spacing-3)',
  m: 'var(--vk-spacing-4)',
  l: 'var(--vk-spacing-6)',
}

export function VKCard({
  children,
  mode,
  variant = 'default',
  padding = 'm',
  className = '',
  style,
  ...props
}: VKCardProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: 'var(--vk-color-background-content)',
    borderRadius: 'var(--vk-radius-lg)',
    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
    overflow: 'hidden',
    ...style,
  }

  if (mode === 'shadow') {
    cardStyle.boxShadow = 'var(--vk-shadow-elevation-2)'
    cardStyle.border = '1px solid var(--vk-color-border-secondary)'
  } else if (mode === 'tint') {
    cardStyle.backgroundColor = 'var(--vk-color-background-secondary)'
    cardStyle.border = '1px solid var(--vk-color-border-secondary)'
  } else if (mode === 'outline') {
    cardStyle.border = '1px solid var(--vk-color-border)'
  } else if (mode === 'outline-tint') {
    cardStyle.backgroundColor = 'var(--vk-color-background-secondary)'
    cardStyle.border = '1px solid var(--vk-color-border)'
  } else if (mode === 'plain') {
    cardStyle.border = 'none'
    cardStyle.boxShadow = 'none'
  } else {
    if (variant === 'default') {
      cardStyle.border = '1px solid var(--vk-color-border-secondary)'
      cardStyle.boxShadow = 'var(--vk-shadow-elevation-1)'
    } else if (variant === 'outlined') {
      cardStyle.border = '1px solid var(--vk-color-border)'
    } else if (variant === 'elevated') {
      cardStyle.border = '1px solid var(--vk-color-border-secondary)'
      cardStyle.boxShadow = 'var(--vk-shadow-elevation-2)'
    }
  }

  cardStyle.padding = paddingValues[padding]

  return (
    <div className={className} style={cardStyle} {...props}>
      {children}
    </div>
  )
}

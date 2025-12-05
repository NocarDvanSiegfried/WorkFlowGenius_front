import { HTMLAttributes, ReactNode, CSSProperties } from 'react'
import { VKCard } from './VKCard'

interface VKAnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  mode?: 'shadow' | 'tint' | 'outline' | 'outline-tint' | 'plain'
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 's' | 'm' | 'l'
  index?: number
  animationType?: 'fade-in' | 'slide-up' | 'slide-in-from-left' | 'slide-in-from-right' | 'scale-in'
}

const animationStyles: Record<string, CSSProperties> = {
  'fade-in': {
    animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
    opacity: 0,
  },
  'slide-up': {
    animation: 'vk-slide-up var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
    opacity: 0,
    transform: 'translateY(20px)',
  },
  'slide-in-from-left': {
    animation: 'vk-slide-in-left var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
    opacity: 0,
    transform: 'translateX(-20px)',
  },
  'slide-in-from-right': {
    animation: 'vk-slide-in-right var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
    opacity: 0,
    transform: 'translateX(20px)',
  },
  'scale-in': {
    animation: 'vk-scale-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
    opacity: 0,
    transform: 'scale(0.95)',
  },
}

export function VKAnimatedCard({
  children,
  mode,
  variant = 'default',
  padding = 'm',
  index = 0,
  animationType = 'fade-in',
  className = '',
  style,
  ...props
}: VKAnimatedCardProps) {
  const delay = index * 100 // Задержка для плавного появления
  const animationStyle = animationStyles[animationType] || animationStyles['fade-in']

  return (
    <VKCard
      mode={mode}
      variant={variant}
      padding={padding}
      className={className}
      style={{
        ...animationStyle,
        animationDelay: `${delay}ms`,
        transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
        ...style,
      }}
      {...props}
    >
      {children}
    </VKCard>
  )
}

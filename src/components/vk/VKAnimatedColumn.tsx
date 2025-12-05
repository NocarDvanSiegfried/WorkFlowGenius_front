import { HTMLAttributes, ReactNode } from 'react'

interface VKAnimatedColumnProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  index?: number
}

export function VKAnimatedColumn({
  children,
  index = 0,
  className = '',
  style,
  ...props
}: VKAnimatedColumnProps) {
  const delay = index * 50

  return (
    <div
      style={{
        animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
        opacity: 0,
        animationDelay: `${delay}ms`,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

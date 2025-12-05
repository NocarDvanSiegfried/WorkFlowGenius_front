import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKDivProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function VKDiv({ children, className = '', style, ...props }: VKDivProps) {
  const divStyle: CSSProperties = {
    padding: 'var(--vk-spacing-4)',
    ...style,
  }

  return (
    <div className={className} style={divStyle} {...props}>
      {children}
    </div>
  )
}


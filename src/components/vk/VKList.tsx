import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function VKList({ children, className = '', style, ...props }: VKListProps) {
  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...style,
  }

  return (
    <div className={className} style={listStyle} {...props}>
      {children}
    </div>
  )
}


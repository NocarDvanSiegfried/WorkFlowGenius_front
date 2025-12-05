import { HTMLAttributes, ReactNode } from 'react'

interface VKPageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function VKPage({ children, className = '', style, ...props }: VKPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--vk-color-background-secondary)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 's' | 'm' | 'l' | 'xl' | 'full'
}

const sizeValues = {
  s: 600,
  m: 720,
  l: 960,
  xl: 1280,
  full: '100%',
}

export function VKContainer({ children, size = 'xl', className = '', style, ...props }: VKContainerProps) {
  const containerStyle: CSSProperties = {
    maxWidth: sizeValues[size] === '100%' ? '100%' : `${sizeValues[size]}px`,
    margin: '0 auto',
    paddingLeft: 'var(--vk-spacing-container-padding, var(--vk-spacing-4))',
    paddingRight: 'var(--vk-spacing-container-padding, var(--vk-spacing-4))',
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  }

  return (
    <div className={className} style={containerStyle} {...props}>
      {children}
    </div>
  )
}

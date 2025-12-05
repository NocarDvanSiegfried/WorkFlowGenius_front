import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKPageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxWidth?: '1280' | '1440'
}

export function VKPageContainer({ children, className = '', style, maxWidth = '1440', ...props }: VKPageContainerProps) {
  const containerStyle: CSSProperties = {
    maxWidth: maxWidth === '1440' ? '1440px' : '1280px',
    margin: '0 auto',
    paddingLeft: 'var(--vk-spacing-6)',
    paddingRight: 'var(--vk-spacing-6)',
    paddingTop: 'var(--vk-spacing-6)',
    paddingBottom: 'var(--vk-spacing-6)',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    ...style,
  }

  return (
    <div className={className} style={containerStyle} data-vk-page-container {...props}>
      {children}
    </div>
  )
}


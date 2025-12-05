import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKFooterProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function VKFooter({ children, className = '', style, ...props }: VKFooterProps) {
  const footerStyle: CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--vk-color-background-secondary)',
    borderTop: '1px solid var(--vk-color-border)',
    paddingTop: 'var(--vk-spacing-6)',
    paddingBottom: 'var(--vk-spacing-6)',
    marginTop: 'auto',
    ...style,
  }

  return (
    <footer className={className} style={footerStyle} {...props}>
      {children}
    </footer>
  )
}

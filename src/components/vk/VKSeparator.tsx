import { HTMLAttributes, CSSProperties } from 'react'

interface VKSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  wide?: boolean
}

export function VKSeparator({ wide = false, className = '', style, ...props }: VKSeparatorProps) {
  const separatorStyle: CSSProperties = {
    borderTop: '1px solid var(--vk-color-border-secondary)',
    ...(wide && {
      marginLeft: 'var(--vk-spacing-4)',
      marginRight: 'var(--vk-spacing-4)',
    }),
    ...style,
  }

  return (
    <div className={className} style={separatorStyle} {...props} />
  )
}

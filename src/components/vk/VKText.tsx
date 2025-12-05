import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
  size?: 'xs' | 'sm' | 'base' | 'm' | 'l'
  weight?: 'regular' | 'medium' | 'semibold'
  color?: 'primary' | 'secondary' | 'tertiary'
}

const sizeValues = {
  xs: 'var(--vk-font-size-xs)',
  sm: 'var(--vk-font-size-sm)',
  base: 'var(--vk-font-size-base)',
  m: 'var(--vk-font-size-md)',
  l: 'var(--vk-font-size-lg)',
}

const weightValues = {
  regular: 'var(--vk-font-weight-regular)',
  medium: 'var(--vk-font-weight-medium)',
  semibold: 'var(--vk-font-weight-semibold)',
}

const colorValues = {
  primary: 'var(--vk-color-text-primary)',
  secondary: 'var(--vk-color-text-secondary)',
  tertiary: 'var(--vk-color-text-tertiary)',
}

export function VKText({
  children,
  size = 'base',
  weight = 'regular',
  color = 'primary',
  className = '',
  style,
  ...props
}: VKTextProps) {
  const textStyle: CSSProperties = {
    fontSize: sizeValues[size],
    fontWeight: weightValues[weight],
    color: colorValues[color],
    lineHeight: 'var(--vk-line-height-relaxed)',
    margin: 0,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    ...style,
  }

  return (
    <p className={className} style={textStyle} {...props}>
      {children}
    </p>
  )
}

import { HTMLAttributes, ReactNode, createElement, CSSProperties } from 'react'

interface VKTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

const levelFontSizes = {
  1: 'var(--vk-font-size-4xl)',
  2: 'var(--vk-font-size-3xl)',
  3: 'var(--vk-font-size-2xl)',
  4: 'var(--vk-font-size-xl)',
  5: 'var(--vk-font-size-lg)',
  6: 'var(--vk-font-size-md)',
}

const weightValues = {
  regular: 'var(--vk-font-weight-regular)',
  medium: 'var(--vk-font-weight-medium)',
  semibold: 'var(--vk-font-weight-semibold)',
  bold: 'var(--vk-font-weight-bold)',
}

export function VKTitle({
  children,
  level = 2,
  weight,
  className = '',
  style,
  ...props
}: VKTitleProps) {
  const finalWeight = weight || (level <= 2 ? 'bold' : level <= 4 ? 'semibold' : 'medium')
  const headingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  const titleStyle: CSSProperties = {
    color: 'var(--vk-color-text-primary)',
    fontSize: levelFontSizes[level],
    fontWeight: weightValues[finalWeight],
    lineHeight: level <= 2 ? 'var(--vk-line-height-tight)' : 'var(--vk-line-height-normal)',
    margin: 0,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    ...style,
  }

  return createElement(
    headingTag,
    {
      className,
      style: titleStyle,
      ...props,
    },
    children
  )
}

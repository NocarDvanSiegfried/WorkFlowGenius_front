import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKFlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: 's' | 'm' | 'l'
  wrap?: boolean
  grow?: boolean
}

const gapValues = {
  s: 'var(--vk-spacing-3)',
  m: 'var(--vk-spacing-4)',
  l: 'var(--vk-spacing-6)',
}

export function VKFlex({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'm',
  wrap = false,
  grow = false,
  className = '',
  style,
  ...props
}: VKFlexProps) {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent:
      justify === 'start'
        ? 'flex-start'
        : justify === 'end'
          ? 'flex-end'
          : justify === 'between'
            ? 'space-between'
            : justify === 'around'
              ? 'space-around'
              : justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    flex: grow ? 1 : undefined,
    minWidth: grow ? 0 : undefined,
  }

  // Если gap задан в inline style, не применяем дефолтный gap из пропа
  const hasGapInStyle = style && 'gap' in style
  if (!hasGapInStyle) {
    flexStyle.gap = gapValues[gap]
  }

  // Применяем inline style после дефолтных значений
  Object.assign(flexStyle, style)

  return (
    <div className={className} style={flexStyle} {...props}>
      {children}
    </div>
  )
}

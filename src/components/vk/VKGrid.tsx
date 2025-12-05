import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 5
  gap?: 's' | 'm' | 'l'
}

const gapValues = {
  s: 'var(--vk-spacing-3)',
  m: 'var(--vk-spacing-4)',
  l: 'var(--vk-spacing-6)',
}

const getGridColumns = (columns: number): string => {
  if (columns === 1) return '1fr'
  if (columns === 2) return 'repeat(2, 1fr)'
  if (columns === 3) return 'repeat(3, 1fr)'
  if (columns === 4) return 'repeat(4, 1fr)'
  return 'repeat(5, 1fr)'
}

export function VKGrid({ children, columns = 1, gap = 'm', className = '', style, ...props }: VKGridProps) {
  // Extract data attributes from props
  const { 'data-vk-stats-grid': statsGrid, 'data-vk-admin-grid': adminGrid, ...restProps } = props as any
  
  const gridStyle: CSSProperties = {
    display: 'grid',
    width: '100%',
  }

  // Если gap задан в inline style, не применяем дефолтный gap из пропа
  // Если gap не задан ни в пропе, ни в inline style, используем дефолтный gap из пропа
  const hasGapInStyle = style && ('gap' in style || 'rowGap' in style || 'columnGap' in style)
  if (!hasGapInStyle) {
    gridStyle.gap = gapValues[gap]
  }

  // Если передан data-vk-stats-grid, не задаем gridTemplateColumns по умолчанию - медиа-запросы управляют
  // Если передан data-vk-admin-grid, не задаем gridTemplateColumns по умолчанию - медиа-запросы управляют
  if (!statsGrid && !adminGrid) {
    gridStyle.gridTemplateColumns = getGridColumns(columns)
  }

  // Применяем inline style после дефолтных значений
  Object.assign(gridStyle, style)

  const dataAttrs: any = {}
  if (statsGrid) dataAttrs['data-vk-stats-grid'] = statsGrid
  if (adminGrid) dataAttrs['data-vk-admin-grid'] = adminGrid
  if (!statsGrid && !adminGrid) dataAttrs['data-vk-grid'] = true

  return (
    <div className={className} style={gridStyle} {...dataAttrs} {...restProps}>
      {children}
    </div>
  )
}

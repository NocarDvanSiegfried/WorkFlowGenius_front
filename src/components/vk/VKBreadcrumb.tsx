import { ReactNode, CSSProperties } from 'react'
import { VKText, VKLink } from './index'

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface VKBreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
  style?: CSSProperties
}

export function VKBreadcrumb({ items, separator = '/', className = '', style }: VKBreadcrumbProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--vk-spacing-2)',
    ...style,
  }

  return (
    <nav className={className} style={containerStyle} aria-label="Хлебные крошки">
      <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--vk-spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isClickable = item.href || item.onClick

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--vk-spacing-2)' }}>
              {isClickable && !isLast ? (
                item.href ? (
                  <VKLink
                    to={item.href}
                    style={{
                      color: 'var(--vk-color-text-accent)',
                      textDecoration: 'none',
                      fontSize: 'var(--vk-font-size-sm)',
                    }}
                  >
                    {item.label}
                  </VKLink>
                ) : (
                  <button
                    onClick={item.onClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--vk-color-text-accent)',
                      cursor: 'pointer',
                      fontSize: 'var(--vk-font-size-sm)',
                      padding: 0,
                    }}
                  >
                    {item.label}
                  </button>
                )
              ) : (
                <VKText
                  size="sm"
                  color={isLast ? 'primary' : 'secondary'}
                  weight={isLast ? 'medium' : 'regular'}
                  style={{ margin: 0 }}
                >
                  {item.label}
                </VKText>
              )}
              {!isLast && (
                <span style={{ color: 'var(--vk-color-text-tertiary)', fontSize: 'var(--vk-font-size-sm)' }}>
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


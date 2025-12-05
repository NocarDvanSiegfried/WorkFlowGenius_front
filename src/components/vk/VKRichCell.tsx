import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKRichCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  before?: ReactNode
  after?: ReactNode
  subtitle?: ReactNode
  caption?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  multiline?: boolean
  disabled?: boolean
}

export function VKRichCell({
  children,
  before,
  after,
  subtitle,
  caption,
  description,
  actions,
  multiline = false,
  disabled = false,
  className = '',
  style,
  ...props
}: VKRichCellProps) {
  const cellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--vk-spacing-3)',
    padding: 'var(--vk-spacing-3) var(--vk-spacing-4)',
    transition: 'background-color var(--vk-transition-base)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style,
  }

  return (
    <div
      className={className}
      style={cellStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--vk-color-background-hover)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
      {...props}
    >
      {before && <div style={{ flexShrink: 0 }}>{before}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && (
          <div
            style={{
              fontSize: 'var(--vk-font-size-xs)',
              color: 'var(--vk-color-text-tertiary)',
              marginBottom: 'var(--vk-spacing-1)',
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            fontSize: 'var(--vk-font-size-base)',
            fontWeight: 'var(--vk-font-weight-medium)',
            color: 'var(--vk-color-text-primary)',
            lineHeight: 'var(--vk-line-height-normal)',
          }}
        >
          {children}
        </div>
        {caption && (
          <div
            style={{
              fontSize: 'var(--vk-font-size-sm)',
              color: 'var(--vk-color-text-secondary)',
              marginTop: 'var(--vk-spacing-1)',
            }}
          >
            {caption}
          </div>
        )}
        {description && (
          <div
            style={{
              fontSize: 'var(--vk-font-size-sm)',
              color: 'var(--vk-color-text-secondary)',
              marginTop: 'var(--vk-spacing-1)',
            }}
          >
            {description}
          </div>
        )}
      </div>
      {actions && <div style={{ flexShrink: 0, display: 'flex', gap: 'var(--vk-spacing-2)' }}>{actions}</div>}
      {after && <div style={{ flexShrink: 0 }}>{after}</div>}
    </div>
  )
}


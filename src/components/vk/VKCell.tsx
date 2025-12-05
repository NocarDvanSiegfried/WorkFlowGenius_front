import { HTMLAttributes, ReactNode, CSSProperties } from 'react'

interface VKCellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  before?: ReactNode
  after?: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  multiline?: boolean
  disabled?: boolean
}

export function VKCell({
  children,
  before,
  after,
  subtitle,
  description,
  multiline = false,
  disabled = false,
  className = '',
  style,
  ...props
}: VKCellProps) {
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
      <div style={{ flex: 1, minWidth: 0, display: multiline ? 'flex' : 'block', flexDirection: multiline ? 'column' : undefined, gap: multiline ? 'var(--vk-spacing-1)' : undefined }}>
        <div style={{ fontSize: 'var(--vk-font-size-base)', color: 'var(--vk-color-text-primary)', fontWeight: 'var(--vk-font-weight-regular)' }}>{children}</div>
        {subtitle && <div style={{ fontSize: 'var(--vk-font-size-sm)', color: 'var(--vk-color-text-secondary)', fontWeight: 'var(--vk-font-weight-regular)' }}>{subtitle}</div>}
        {description && <div style={{ fontSize: 'var(--vk-font-size-xs)', color: 'var(--vk-color-text-tertiary)', fontWeight: 'var(--vk-font-weight-regular)', marginTop: 'var(--vk-spacing-1)' }}>{description}</div>}
      </div>
      {after && <div style={{ flexShrink: 0 }}>{after}</div>}
    </div>
  )
}

import { ReactNode, CSSProperties } from 'react'
import { VKFlex, VKText, VKTitle, VKButton } from './index'

interface VKEmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  style?: CSSProperties
}

export function VKEmptyState({
  title = 'Нет данных',
  description,
  icon,
  action,
  className = '',
  style,
}: VKEmptyStateProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--vk-spacing-8)',
    textAlign: 'center',
    ...style,
  }

  return (
    <VKFlex direction="column" align="center" gap="m" className={className} style={containerStyle}>
      {icon && (
        <div
          style={{
            fontSize: '48px',
            color: 'var(--vk-color-text-tertiary)',
            marginBottom: 'var(--vk-spacing-2)',
          }}
        >
          {icon}
        </div>
      )}
      {title && (
        <VKTitle level={4} weight="medium" style={{ margin: 0, color: 'var(--vk-color-text-secondary)' }}>
          {title}
        </VKTitle>
      )}
      {description && (
        <VKText size="base" color="secondary" style={{ maxWidth: '400px', margin: 0 }}>
          {description}
        </VKText>
      )}
      {action && (
        <VKButton variant="primary" size="m" onClick={action.onClick} style={{ marginTop: 'var(--vk-spacing-4)' }}>
          {action.label}
        </VKButton>
      )}
    </VKFlex>
  )
}


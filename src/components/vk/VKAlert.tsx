import { ReactNode, CSSProperties } from 'react'
import { VKFlex, VKText, VKButton } from './index'

interface VKAlertProps {
  title?: string
  description?: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
  className?: string
  style?: CSSProperties
}

const variantStyles: Record<string, { bg: string; border: string; icon: string }> = {
  info: {
    bg: 'var(--vk-color-accent-blue-alpha)',
    border: 'var(--vk-color-accent-blue)',
    icon: 'ℹ️',
  },
  success: {
    bg: 'var(--vk-color-status-positive-alpha)',
    border: 'var(--vk-color-status-positive)',
    icon: '✓',
  },
  warning: {
    bg: 'var(--vk-color-status-warning-alpha)',
    border: 'var(--vk-color-status-warning)',
    icon: '⚠',
  },
  error: {
    bg: 'var(--vk-color-status-negative-alpha)',
    border: 'var(--vk-color-status-negative)',
    icon: '✕',
  },
}

export function VKAlert({
  title,
  description,
  variant = 'info',
  icon,
  action,
  onClose,
  className = '',
  style,
}: VKAlertProps) {
  const variantStyle = variantStyles[variant]

  const alertStyle: CSSProperties = {
    padding: 'var(--vk-spacing-4)',
    backgroundColor: variantStyle.bg,
    border: `1px solid ${variantStyle.border}`,
    borderRadius: 'var(--vk-radius-md)',
    ...style,
  }

  return (
    <VKFlex
      direction="column"
      gap="s"
      className={className}
      style={alertStyle}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <VKFlex align="start" gap="m" style={{ width: '100%' }}>
        <div
          style={{
            fontSize: '20px',
            flexShrink: 0,
            color: variantStyle.border,
          }}
        >
          {icon || variantStyle.icon}
        </div>
        <VKFlex direction="column" grow gap="s">
          {title && (
            <VKText size="base" weight="medium" style={{ margin: 0, color: variantStyle.border }}>
              {title}
            </VKText>
          )}
          {description && (
            <VKText size="base" color="secondary" style={{ margin: 0, fontSize: 'var(--vk-font-size-sm)' }}>
              {description}
            </VKText>
          )}
        </VKFlex>
        {onClose && (
          <VKButton
            variant="tertiary"
            size="s"
            onClick={onClose}
            style={{ flexShrink: 0, padding: 'var(--vk-spacing-1)' }}
            aria-label="Закрыть"
          >
            ×
          </VKButton>
        )}
      </VKFlex>
      {action && (
        <VKFlex justify="end">
          <VKButton variant="outline" size="s" onClick={action.onClick}>
            {action.label}
          </VKButton>
        </VKFlex>
      )}
    </VKFlex>
  )
}


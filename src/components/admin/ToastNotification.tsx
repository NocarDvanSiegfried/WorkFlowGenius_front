import { useEffect, useState } from 'react'
import { VKCard, VKFlex, VKText, VKButton } from '../vk'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastNotificationProps {
  toast: Toast | null
  onClose: () => void
}

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (toast) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, toast.duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [toast, onClose])

  if (!toast) return null

  const typeColors = {
    success: 'var(--vk-color-status-positive)',
    error: 'var(--vk-color-status-negative)',
    info: 'var(--vk-color-accent-blue)',
    warning: 'var(--vk-color-status-warning)',
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--vk-spacing-4)',
        right: 'var(--vk-spacing-4)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <VKCard
        variant="default"
        padding="m"
        style={{
          pointerEvents: 'auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          boxShadow: 'var(--vk-shadow-elevation-3)',
          borderLeft: `4px solid ${typeColors[toast.type]}`,
          minWidth: '300px',
          maxWidth: '400px',
        }}
      >
        <VKFlex align="start" gap="m" justify="between">
          <VKFlex align="start" gap="s" grow>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: `${typeColors[toast.type]}20`,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {toast.type === 'success' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typeColors[toast.type]} strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typeColors[toast.type]} strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
              {(toast.type === 'info' || toast.type === 'warning') && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typeColors[toast.type]} strokeWidth="3">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              )}
            </div>
            <VKText size="sm" color="primary" style={{ margin: 0, flex: 1 }}>
              {toast.message}
            </VKText>
          </VKFlex>
          <VKButton variant="tertiary" size="s" onClick={onClose} style={{ flexShrink: 0 }}>
            ×
          </VKButton>
        </VKFlex>
      </VKCard>
    </div>
  )
}


import { HTMLAttributes, ReactNode, useEffect, CSSProperties } from 'react'
import { VKCard } from './VKCard'
import { VKFlex, VKTitle, VKButton } from './index'

interface VKModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 's' | 'm' | 'l' | 'xl'
  showCloseButton?: boolean
}

const sizeStyles: Record<string, CSSProperties> = {
  s: { maxWidth: '400px' },
  m: { maxWidth: '600px' },
  l: { maxWidth: '800px' },
  xl: { maxWidth: '1200px' },
}

export function VKModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'm',
  showCloseButton = true,
  className = '',
  style,
  ...props
}: VKModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--vk-spacing-4)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    transition: 'opacity var(--vk-transition-base) var(--vk-motion-easing-standard)',
  }

  const modalStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity var(--vk-transition-base) var(--vk-motion-easing-standard), transform var(--vk-transition-base) var(--vk-motion-easing-standard)',
    ...sizeStyles[size],
    ...style,
  }

  return (
    <div style={overlayStyle} onClick={onClose} className={className}>
      <VKCard
        variant="elevated"
        padding="none"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {title && (
          <VKFlex
            justify="between"
            align="center"
            style={{
              padding: 'var(--vk-spacing-6)',
              borderBottom: '1px solid var(--vk-color-border-secondary)',
            }}
          >
            <VKTitle level={3} weight="semibold" style={{ margin: 0 }}>
              {title}
            </VKTitle>
            {showCloseButton && (
              <VKButton
                variant="tertiary"
                size="s"
                onClick={onClose}
                style={{
                  padding: 'var(--vk-spacing-1)',
                  minWidth: '32px',
                  height: '32px',
                }}
                aria-label="Закрыть"
              >
                ×
              </VKButton>
            )}
          </VKFlex>
        )}
        <div style={{ padding: title ? 'var(--vk-spacing-6)' : 'var(--vk-spacing-6)' }}>{children}</div>
      </VKCard>
    </div>
  )
}


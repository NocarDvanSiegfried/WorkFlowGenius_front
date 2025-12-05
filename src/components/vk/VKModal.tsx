import { HTMLAttributes, ReactNode, useEffect } from 'react'

interface VKModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 's' | 'm' | 'l' | 'xl'
}

export function VKModal({ isOpen, onClose, title, children, size = 'm', className = '', ...props }: VKModalProps) {
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

  if (!isOpen) return null

  const sizeStyles = {
    s: 'max-w-vk-md',
    m: 'max-w-vk-lg',
    l: 'max-w-vk-2xl',
    xl: 'max-w-vk-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-vk-4"
      onClick={onClose}
    >
      <div
        className="fixed inset-0 bg-vk-text-primary/40 backdrop-blur-sm transition-opacity duration-vk-base"
        onClick={onClose}
      />
      <div
        className={`relative bg-vk-bg-content rounded-vk-lg shadow-vk-4 w-full ${sizeStyles[size]} max-h-[90vh] overflow-y-auto transition-all duration-vk-base ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between px-vk-6 py-vk-4 border-b border-vk-border-secondary">
            <h2 className="text-vk-xl font-vk-semibold text-vk-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="w-vk-8 h-vk-8 flex items-center justify-center rounded-vk-md hover:bg-vk-bg-hover transition-colors duration-vk-base"
              aria-label="Закрыть"
            >
              <svg className="w-vk-icon-m h-vk-icon-m text-vk-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-vk-6 py-vk-4">{children}</div>
      </div>
    </div>
  )
}


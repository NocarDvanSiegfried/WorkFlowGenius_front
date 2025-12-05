import { ButtonHTMLAttributes, forwardRef, CSSProperties } from 'react'

interface VKButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text' | 'error'
  size?: 's' | 'm' | 'l'
  loading?: boolean
}

const sizeValues = {
  s: {
    paddingLeft: 'var(--vk-spacing-3)',
    paddingRight: 'var(--vk-spacing-3)',
    paddingTop: 'var(--vk-spacing-1)',
    paddingBottom: 'var(--vk-spacing-1)',
    fontSize: 'var(--vk-font-size-sm)',
    height: '32px',
  },
  m: {
    paddingLeft: 'var(--vk-spacing-4)',
    paddingRight: 'var(--vk-spacing-4)',
    paddingTop: 'var(--vk-spacing-2)',
    paddingBottom: 'var(--vk-spacing-2)',
    fontSize: 'var(--vk-font-size-base)',
    height: '40px',
  },
  l: {
    paddingLeft: 'var(--vk-spacing-6)',
    paddingRight: 'var(--vk-spacing-6)',
    paddingTop: 'var(--vk-spacing-3)',
    paddingBottom: 'var(--vk-spacing-3)',
    fontSize: 'var(--vk-font-size-lg)',
    height: '48px',
  },
}

export const VKButton = forwardRef<HTMLButtonElement, VKButtonProps>(
  ({ variant = 'primary', size = 'm', loading = false, className = '', children, disabled, style, ...props }, ref) => {
    const baseStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'var(--vk-font-weight-medium)',
      transition: 'all var(--vk-transition-base)',
      borderRadius: 'var(--vk-radius-md)',
      outline: 'none',
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.5 : 1,
      ...sizeValues[size],
      ...style,
    }

    const variantStyles: Record<string, CSSProperties> = {
      primary: {
        backgroundColor: 'var(--vk-color-accent-blue)',
        color: 'var(--vk-color-background-content)',
      },
      secondary: {
        backgroundColor: 'var(--vk-color-background-secondary)',
        color: 'var(--vk-color-text-primary)',
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: 'var(--vk-color-text-primary)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--vk-color-text-primary)',
        border: '1px solid var(--vk-color-border)',
      },
      text: {
        backgroundColor: 'transparent',
        color: 'var(--vk-color-text-accent)',
      },
      error: {
        backgroundColor: 'var(--vk-color-status-negative)',
        color: 'var(--vk-color-background-content)',
      },
    }

    const finalStyle: CSSProperties = {
      ...baseStyle,
      ...variantStyles[variant],
    }

    return (
      <button
        ref={ref}
        className={className}
        style={finalStyle}
        disabled={disabled || loading}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            if (variant === 'primary') {
              e.currentTarget.style.backgroundColor = 'var(--vk-color-accent-blue-hover)'
            } else if (variant === 'error') {
              e.currentTarget.style.backgroundColor = 'var(--vk-color-status-negative-hover)'
            } else if (variant === 'secondary' || variant === 'tertiary' || variant === 'outline') {
              e.currentTarget.style.backgroundColor = 'var(--vk-color-background-hover)'
            } else if (variant === 'text') {
              e.currentTarget.style.color = 'var(--vk-color-text-link-hover)'
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            if (variant === 'primary') {
              e.currentTarget.style.backgroundColor = 'var(--vk-color-accent-blue)'
            } else if (variant === 'error') {
              e.currentTarget.style.backgroundColor = 'var(--vk-color-status-negative)'
            } else if (variant === 'secondary' || variant === 'tertiary' || variant === 'outline') {
              const bgColor = variant === 'outline' ? 'transparent' : (variantStyles[variant].backgroundColor as string)
              e.currentTarget.style.backgroundColor = bgColor
            } else if (variant === 'text') {
              e.currentTarget.style.color = 'var(--vk-color-text-accent)'
            }
          }
        }}
        {...props}
      >
        {loading && (
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: 'var(--vk-spacing-2)',
            }}
          />
        )}
        {children}
      </button>
    )
  }
)

VKButton.displayName = 'VKButton'

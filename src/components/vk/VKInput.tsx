import { InputHTMLAttributes, forwardRef, CSSProperties } from 'react'
import { VKText } from './VKText'

interface VKInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

export const VKInput = forwardRef<HTMLInputElement, VKInputProps>(
  ({ error = false, helperText, className = '', style, ...props }, ref) => {
    const inputStyle: CSSProperties = {
      width: '100%',
      paddingLeft: 'var(--vk-spacing-4)',
      paddingRight: 'var(--vk-spacing-4)',
      paddingTop: 'var(--vk-spacing-2)',
      paddingBottom: 'var(--vk-spacing-2)',
      backgroundColor: 'var(--vk-color-background-content)',
      border: `1px solid ${error ? 'var(--vk-color-status-negative)' : 'var(--vk-color-border)'}`,
      borderRadius: 'var(--vk-radius-md)',
      fontSize: 'var(--vk-font-size-base)',
      color: 'var(--vk-color-text-primary)',
      outline: 'none',
      transition: 'all var(--vk-transition-base)',
      ...style,
    }

    return (
      <div style={{ width: '100%' }}>
        <input
          ref={ref}
          className={className}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--vk-color-status-negative)' : 'var(--vk-color-accent-blue)'
            e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? 'var(--vk-color-status-negative)' : 'var(--vk-color-accent-blue-alpha)'}`
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--vk-color-status-negative)' : 'var(--vk-color-border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          {...props}
        />
        {helperText && (
          <VKText
            size="sm"
            color={error ? 'primary' : 'secondary'}
            style={{
              marginTop: 'var(--vk-spacing-1)',
              color: error ? 'var(--vk-color-status-negative)' : undefined,
            }}
          >
            {helperText}
          </VKText>
        )}
      </div>
    )
  }
)

VKInput.displayName = 'VKInput'

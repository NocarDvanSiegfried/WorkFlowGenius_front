import { InputHTMLAttributes, forwardRef } from 'react'

interface VKInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

export const VKInput = forwardRef<HTMLInputElement, VKInputProps>(
  ({ error = false, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full px-vk-4 py-vk-2 bg-vk-bg border rounded-vk-md text-vk-base text-vk-text-primary placeholder:text-vk-text-tertiary focus:outline-none focus:ring-2 focus:ring-vk-accent-blue focus:border-vk-accent-blue transition-all duration-vk-base ${
            error ? 'border-vk-status-negative focus:ring-vk-status-negative' : 'border-vk-border'
          } ${className}`}
          {...props}
        />
        {helperText && (
          <p className={`mt-vk-1 text-vk-sm ${error ? 'text-vk-status-negative' : 'text-vk-text-secondary'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

VKInput.displayName = 'VKInput'


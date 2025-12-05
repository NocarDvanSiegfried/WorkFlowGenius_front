import { InputHTMLAttributes, forwardRef } from 'react'

interface VKCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

export const VKCheckbox = forwardRef<HTMLInputElement, VKCheckboxProps>(
  ({ label, error = false, className = '', ...props }, ref) => {
    return (
      <label className={`inline-flex items-center gap-vk-2 cursor-pointer ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className={`w-vk-icon-m h-vk-icon-m rounded-vk-sm border-2 border-vk-border bg-vk-bg text-vk-accent-blue focus:ring-2 focus:ring-vk-accent-blue focus:ring-offset-1 transition-all duration-vk-base ${
            error ? 'border-vk-status-negative' : ''
          }`}
          {...props}
        />
        {label && (
          <span className={`text-vk-base ${error ? 'text-vk-status-negative' : 'text-vk-text-primary'}`}>
            {label}
          </span>
        )}
      </label>
    )
  }
)

VKCheckbox.displayName = 'VKCheckbox'


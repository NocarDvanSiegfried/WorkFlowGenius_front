import { SelectHTMLAttributes, forwardRef } from 'react'

interface VKSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  error?: boolean
  helperText?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export const VKSelect = forwardRef<HTMLSelectElement, VKSelectProps>(
  ({ error = false, helperText, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={`w-full px-vk-4 py-vk-2 bg-vk-bg border rounded-vk-md text-vk-base text-vk-text-primary focus:outline-none focus:ring-2 focus:ring-vk-accent-blue focus:border-vk-accent-blue transition-all duration-vk-base appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2399A2AD' d='M6 9L1 4h10z'/%3E%3C/svg%3E")] bg-[length:12px_12px] bg-[right_vk-4_center] bg-no-repeat pr-vk-10 ${
            error ? 'border-vk-status-negative focus:ring-vk-status-negative' : 'border-vk-border'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <p className={`mt-vk-1 text-vk-sm ${error ? 'text-vk-status-negative' : 'text-vk-text-secondary'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

VKSelect.displayName = 'VKSelect'


import { ButtonHTMLAttributes, forwardRef } from 'react'

interface VKButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text'
  size?: 's' | 'm' | 'l'
  loading?: boolean
}

export const VKButton = forwardRef<HTMLButtonElement, VKButtonProps>(
  ({ variant = 'primary', size = 'm', loading = false, className = '', children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-vk-medium transition-all duration-vk-base ease-vk-standard rounded-vk-md focus:outline-none focus:ring-2 focus:ring-vk-accent-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-vk-hover active:scale-vk-active'

    const variantStyles = {
      primary: 'bg-vk-accent-blue text-white hover:bg-vk-accent-blue-hover active:bg-vk-accent-blue-active',
      secondary: 'bg-vk-bg-secondary text-vk-text-primary hover:bg-vk-bg-hover active:bg-vk-bg-active',
      tertiary: 'bg-transparent text-vk-text-primary hover:bg-vk-bg-hover active:bg-vk-bg-active',
      outline: 'border border-vk-border text-vk-text-primary hover:bg-vk-bg-hover active:bg-vk-bg-active bg-transparent',
      text: 'bg-transparent text-vk-text-accent hover:text-vk-text-link-hover active:opacity-70',
    }

    const sizeStyles = {
      s: 'px-vk-3 py-vk-1 text-vk-sm h-vk-8',
      m: 'px-vk-4 py-vk-2 text-vk-base h-vk-10',
      l: 'px-vk-6 py-vk-3 text-vk-lg h-vk-12',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-vk-icon-s h-vk-icon-s border-2 border-current border-t-transparent rounded-full animate-spin mr-vk-2" />
        ) : null}
        {children}
      </button>
    )
  }
)

VKButton.displayName = 'VKButton'


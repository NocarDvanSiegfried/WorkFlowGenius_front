import { HTMLAttributes, ReactNode } from 'react'

interface VKFormItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  label?: string
  description?: string
  error?: string
  required?: boolean
}

export function VKFormItem({ children, label, description, error, required = false, className = '', ...props }: VKFormItemProps) {
  return (
    <div className={`flex flex-col gap-vk-1 ${className}`} {...props}>
      {label && (
        <label className="text-vk-text-primary font-vk-medium text-vk-sm">
          {label}
          {required && <span className="text-vk-status-negative ml-vk-1">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-vk-text-tertiary font-vk-regular text-vk-xs">{description}</p>
      )}
      {error && (
        <p className="text-vk-status-negative font-vk-regular text-vk-xs">{error}</p>
      )}
    </div>
  )
}




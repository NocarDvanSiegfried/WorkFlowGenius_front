import { InputHTMLAttributes, forwardRef } from 'react'

interface VKSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  valueLabel?: string
}

export const VKSlider = forwardRef<HTMLInputElement, VKSliderProps>(
  ({ label, valueLabel, className = '', ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <div className="flex items-center justify-between mb-vk-2">
            <label className="text-vk-base text-vk-text-primary font-vk-medium">{label}</label>
            {valueLabel && <span className="text-vk-sm text-vk-text-secondary">{valueLabel}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          className="w-full h-2 bg-vk-bg-tertiary rounded-full appearance-none cursor-pointer accent-vk-accent-blue focus:outline-none focus:ring-2 focus:ring-vk-accent-blue focus:ring-offset-2 transition-all duration-vk-base"
          style={{
            background: `linear-gradient(to right, var(--vk-color-accent-blue) 0%, var(--vk-color-accent-blue) ${((Number(props.value) || 0) / Number(props.max || 100)) * 100}%, var(--vk-color-gray-100) ${((Number(props.value) || 0) / Number(props.max || 100)) * 100}%, var(--vk-color-gray-100) 100%)`,
          }}
          {...props}
        />
      </div>
    )
  }
)

VKSlider.displayName = 'VKSlider'


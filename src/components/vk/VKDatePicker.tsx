import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { VKInput } from './VKInput'
import { VKCard } from './VKCard'

interface VKDatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  helperText?: string
  min?: string
  max?: string
}

export const VKDatePicker = forwardRef<HTMLInputElement, VKDatePickerProps>(
  ({ value, onChange, error = false, helperText, min, max, className = '', style, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(value || '')

    const handleDateChange = (newDate: string) => {
      setSelectedDate(newDate)
      onChange?.(newDate)
      setIsOpen(false)
    }

    const formatDate = (dateStr: string) => {
      if (!dateStr) return ''
      try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return dateStr
        return date.toLocaleDateString('ru-RU')
      } catch {
        return dateStr
      }
    }

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <VKInput
          ref={ref}
          type="text"
          value={formatDate(selectedDate)}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          error={error}
          helperText={helperText}
          className={className}
          style={{ cursor: 'pointer', ...style }}
          {...props}
        />
        {isOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
              }}
              onClick={() => setIsOpen(false)}
            />
            <VKCard
              variant="elevated"
              padding="m"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 'var(--vk-spacing-2)',
                zIndex: 20,
                minWidth: '280px',
              }}
            >
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={min}
                max={max}
                style={{
                  width: '100%',
                  padding: 'var(--vk-spacing-2)',
                  border: '1px solid var(--vk-color-border)',
                  borderRadius: 'var(--vk-radius-md)',
                  fontSize: 'var(--vk-font-size-base)',
                  backgroundColor: 'var(--vk-color-background-content)',
                  color: 'var(--vk-color-text-primary)',
                }}
              />
            </VKCard>
          </>
        )}
      </div>
    )
  }
)

VKDatePicker.displayName = 'VKDatePicker'


import { InputHTMLAttributes, forwardRef, useState, useRef, CSSProperties } from 'react'
import { VKInput } from './VKInput'
import { VKButton } from './VKButton'

interface VKSearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch?: (value: string) => void
  onClear?: () => void
  showClearButton?: boolean
  debounceMs?: number
}

export const VKSearch = forwardRef<HTMLInputElement, VKSearchProps>(
  (
    { onSearch, onClear, showClearButton = true, debounceMs = 300, value, defaultValue, className = '', style, ...props },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState(value || defaultValue || '')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSearchValue(newValue)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        onSearch?.(newValue)
      }, debounceMs)
    }

    const handleClear = () => {
      setSearchValue('')
      onClear?.()
      onSearch?.('')
    }

    const containerStyle: CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    }

    return (
      <div style={containerStyle} className={className}>
        <VKInput
          ref={ref}
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder={props.placeholder || 'Поиск...'}
          style={{
            paddingRight: showClearButton && searchValue ? '40px' : undefined,
          }}
          {...props}
        />
        {showClearButton && searchValue && (
          <VKButton
            variant="tertiary"
            size="s"
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: 'var(--vk-spacing-2)',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: 'var(--vk-spacing-1)',
              minWidth: 'auto',
            }}
            aria-label="Очистить поиск"
          >
            ×
          </VKButton>
        )}
      </div>
    )
  }
)

VKSearch.displayName = 'VKSearch'


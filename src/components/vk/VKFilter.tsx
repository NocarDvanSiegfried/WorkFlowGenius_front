import { ReactNode, useState, CSSProperties } from 'react'
import { VKButton } from './VKButton'
import { VKPopover } from './VKPopover'
import { VKCard } from './VKCard'
import { VKFlex, VKText, VKCheckbox, VKSelect } from './index'

interface FilterOption {
  label: string
  value: string
  checked?: boolean
}

interface FilterGroup {
  label: string
  options: FilterOption[]
  type?: 'checkbox' | 'select' | 'radio'
}

interface VKFilterProps {
  filters: FilterGroup[]
  onFilterChange?: (filters: Record<string, string[]>) => void
  trigger?: ReactNode
  className?: string
  style?: CSSProperties
}

export function VKFilter({ filters, onFilterChange, trigger }: VKFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (groupLabel: string, value: string, checked: boolean) => {
    const newFilters = { ...selectedFilters }
    if (!newFilters[groupLabel]) {
      newFilters[groupLabel] = []
    }

    if (checked) {
      newFilters[groupLabel] = [...newFilters[groupLabel], value]
    } else {
      newFilters[groupLabel] = newFilters[groupLabel].filter((v) => v !== value)
    }

    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleClear = () => {
    setSelectedFilters({})
    onFilterChange?.({})
  }

  const activeCount = Object.values(selectedFilters).reduce((sum, values) => sum + values.length, 0)

  const content = (
    <VKCard variant="default" padding="m" style={{ minWidth: '280px' }}>
      <VKFlex direction="column" gap="m">
        {filters.map((group, groupIndex) => (
          <VKFlex key={groupIndex} direction="column" gap="s">
            <VKText size="sm" weight="medium" style={{ margin: 0 }}>
              {group.label}
            </VKText>
            {group.type === 'select' ? (
              <VKSelect
                options={group.options.map((opt) => ({ value: opt.value, label: opt.label }))}
                value={selectedFilters[group.label]?.[0] || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    handleFilterChange(group.label, value, true)
                  }
                }}
              />
            ) : (
              <VKFlex direction="column" gap="s">
                {group.options.map((option, optIndex) => (
                  <VKCheckbox
                    key={optIndex}
                    checked={selectedFilters[group.label]?.includes(option.value) || false}
                    onChange={(e) => handleFilterChange(group.label, option.value, e.target.checked)}
                    label={option.label}
                  />
                ))}
              </VKFlex>
            )}
          </VKFlex>
        ))}
        {activeCount > 0 && (
          <VKFlex justify="end">
            <VKButton variant="text" size="s" onClick={handleClear}>
              Сбросить
            </VKButton>
          </VKFlex>
        )}
      </VKFlex>
    </VKCard>
  )

  return (
    <VKPopover
      content={content}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger="click"
      placement="bottom"
    >
      {trigger || (
        <VKButton variant="outline" size="m">
          Фильтры {activeCount > 0 && `(${activeCount})`}
        </VKButton>
      )}
    </VKPopover>
  )
}


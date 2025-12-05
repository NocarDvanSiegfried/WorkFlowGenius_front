import { useState } from 'react'
import { VKInput, VKCard, VKFlex, VKButton, VKSelect } from '../vk'

interface SearchPanelProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  statusFilter?: string
  onStatusFilterChange?: (status: string) => void
  priorityFilter?: string
  onPriorityFilterChange?: (priority: string) => void
  onClear?: () => void
}

export function SearchPanel({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  priorityFilter = 'all',
  onPriorityFilterChange,
  onClear,
}: SearchPanelProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    onSearchChange?.(value)
  }

  const handleClear = () => {
    setLocalSearchQuery('')
    onSearchChange?.('')
    onStatusFilterChange?.('all')
    onPriorityFilterChange?.('all')
    onClear?.()
  }

  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'pending', label: 'Ожидают' },
    { value: 'assigned', label: 'Назначены' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Выполнены' },
    { value: 'cancelled', label: 'Отменены' },
  ]

  const priorityOptions = [
    { value: 'all', label: 'Все приоритеты' },
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
    { value: 'urgent', label: 'Срочный' },
  ]

  const hasActiveFilters = localSearchQuery || statusFilter !== 'all' || priorityFilter !== 'all'

  return (
    <VKCard variant="default" padding="m" style={{ width: '100%' }}>
      <VKFlex direction="column" gap="m">
        <VKFlex align="center" gap="m" style={{ flexWrap: 'wrap' }}>
          <VKInput
            type="text"
            placeholder="Поиск задач по названию, описанию, исполнителю..."
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ flex: '1', minWidth: '250px' }}
          />
          <VKSelect
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => onStatusFilterChange?.(e.target.value)}
            style={{ minWidth: '150px' }}
          />
          <VKSelect
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange?.(e.target.value)}
            style={{ minWidth: '150px' }}
          />
          {hasActiveFilters && (
            <VKButton variant="tertiary" size="s" onClick={handleClear}>
              Сбросить
            </VKButton>
          )}
        </VKFlex>
      </VKFlex>
    </VKCard>
  )
}

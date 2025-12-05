import { useQuery } from '@tanstack/react-query'
import { VKFlex, VKText, VKGroup, VKTitle, VKCard, VKAvatar, VKEmptyState, VKSkeleton, VKTooltip } from '../vk'
import { taskHistoryApi } from '../../services/api'

interface TaskHistoryProps {
  taskId: number
}

export function TaskHistory({ taskId }: TaskHistoryProps) {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ['task-history', taskId],
    queryFn: async () => {
      const response = await taskHistoryApi.getHistory(taskId, 50)
      return response.data.data
    },
  })

  const getActionLabel = (action: string, _fieldName?: string) => {
    switch (action) {
      case 'created':
        return 'Создана'
      case 'updated':
        return 'Обновлена'
      case 'status_changed':
        return 'Изменен статус'
      case 'priority_changed':
        return 'Изменен приоритет'
      case 'deadline_changed':
        return 'Изменен дедлайн'
      case 'assigned':
        return 'Назначена'
      case 'deleted':
        return 'Удалена'
      default:
        return action
    }
  }

  const history = historyData || []

  if (isLoading) {
    return (
      <VKGroup mode="card" header={<VKTitle level={5} weight="semibold" style={{ margin: 0 }}>История изменений</VKTitle>}>
        <VKFlex direction="column" gap="s">
          {[1, 2, 3].map((i) => (
            <VKSkeleton key={i} width="100%" height="60px" />
          ))}
        </VKFlex>
      </VKGroup>
    )
  }

  if (history.length === 0) {
    return (
      <VKGroup mode="card" header={<VKTitle level={5} weight="semibold" style={{ margin: 0 }}>История изменений</VKTitle>}>
        <VKEmptyState
          title="Нет записей в истории"
          description="История изменений появится после первого редактирования задачи"
          icon="📜"
          style={{ padding: 'var(--vk-spacing-4)' }}
        />
      </VKGroup>
    )
  }

  return (
    <VKGroup mode="card" header={<VKTitle level={5} weight="semibold" style={{ margin: 0 }}>История изменений</VKTitle>}>
      <VKFlex direction="column" gap="s">
        {history.map((entry: any) => (
          <VKCard key={entry.id} variant="outlined" padding="s">
            <VKFlex align="start" gap="s">
              <VKAvatar name={entry.user?.name || 'User'} size="s" />
              <VKFlex direction="column" grow gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                <VKFlex justify="between" align="center">
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {entry.user?.name || 'Пользователь'} {getActionLabel(entry.action, entry.field_name)}
                  </VKText>
                  <VKTooltip content={entry.created_at ? new Date(entry.created_at).toLocaleString('ru-RU') : ''}>
                    <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                      {entry.created_at
                        ? new Date(entry.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </VKText>
                  </VKTooltip>
                </VKFlex>
                {entry.field_name && entry.old_value !== entry.new_value && (
                  <VKText size="sm" color="secondary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                    {entry.field_name}: <span style={{ textDecoration: 'line-through' }}>{entry.old_value || '-'}</span> → {entry.new_value || '-'}
                  </VKText>
                )}
              </VKFlex>
            </VKFlex>
          </VKCard>
        ))}
      </VKFlex>
    </VKGroup>
  )
}


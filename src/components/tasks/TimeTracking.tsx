import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKText, VKButton, VKGroup, VKTitle, VKCard, VKEmptyState, VKTooltip } from '../vk'
import { timeTrackingApi } from '../../services/api'

interface TimeTrackingProps {
  taskId: number
}

export function TimeTracking({ taskId }: TimeTrackingProps) {
  const [isTracking, setIsTracking] = useState(false)
  const queryClient = useQueryClient()

  const { data: timeTrackingData } = useQuery({
    queryKey: ['time-tracking', taskId],
    queryFn: async () => {
      const response = await timeTrackingApi.getTimeTracking(taskId)
      return response.data.data
    },
    refetchInterval: isTracking ? 1000 : false, // Обновляем каждую секунду при активном отслеживании
  })

  const startMutation = useMutation({
    mutationFn: async () => {
      return await timeTrackingApi.startTracking(taskId)
    },
    onSuccess: () => {
      setIsTracking(true)
      queryClient.invalidateQueries({ queryKey: ['time-tracking', taskId] })
    },
  })

  const stopMutation = useMutation({
    mutationFn: async () => {
      return await timeTrackingApi.stopTracking(taskId)
    },
    onSuccess: () => {
      setIsTracking(false)
      queryClient.invalidateQueries({ queryKey: ['time-tracking', taskId] })
    },
  })

  const entries = timeTrackingData?.data?.data || []
  const totalMinutes = timeTrackingData?.data?.total_minutes || 0
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  // Проверяем, есть ли активное отслеживание
  useEffect(() => {
    const activeEntry = entries.find((entry: any) => !entry.end_time)
    setIsTracking(!!activeEntry)
  }, [entries])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}ч ${mins}м`
    }
    return `${mins}м`
  }

  return (
    <VKGroup
      mode="card"
      header={
        <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
          Отслеживание времени
        </VKTitle>
      }
    >
      <VKFlex direction="column" gap="m">
        {/* Статистика */}
        <VKCard variant="default" padding="m" style={{ backgroundColor: 'var(--vk-color-accent-blue-alpha)' }}>
          <VKFlex justify="between" align="center">
            <VKText size="sm" color="secondary" style={{ margin: 0 }}>
              Всего времени:
            </VKText>
            <VKText size="l" weight="semibold" style={{ margin: 0 }}>
              {totalHours > 0 ? `${totalHours}ч ` : ''}{remainingMinutes}м
            </VKText>
          </VKFlex>
        </VKCard>

        {/* Кнопки управления */}
        <VKFlex gap="s">
          {isTracking ? (
            <VKTooltip content="Остановить отслеживание времени">
              <VKButton
                variant="error"
                size="s"
                onClick={() => stopMutation.mutate()}
                loading={stopMutation.isPending}
              >
                ⏹ Остановить
              </VKButton>
            </VKTooltip>
          ) : (
            <VKTooltip content="Начать отслеживание времени работы над задачей">
              <VKButton
                variant="primary"
                size="s"
                onClick={() => startMutation.mutate()}
                loading={startMutation.isPending}
              >
                ▶ Начать отслеживание
              </VKButton>
            </VKTooltip>
          )}
        </VKFlex>

        {/* История записей */}
        {entries.length > 0 ? (
          <VKFlex direction="column" gap="s">
            <VKText size="sm" weight="medium" style={{ margin: 0 }}>
              История:
            </VKText>
            {entries.slice(0, 5).map((entry: any) => (
              <VKCard key={entry.id} variant="outlined" padding="s">
                <VKFlex justify="between" align="center">
                  <VKFlex direction="column" gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                    <VKText size="sm" color="secondary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                      {entry.start_time ? new Date(entry.start_time).toLocaleString('ru-RU') : ''}
                      {entry.end_time && ` - ${new Date(entry.end_time).toLocaleString('ru-RU')}`}
                    </VKText>
                    {entry.description && (
                      <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                        {entry.description}
                      </VKText>
                    )}
                  </VKFlex>
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {entry.duration_minutes ? formatDuration(entry.duration_minutes) : 'В процессе...'}
                  </VKText>
                </VKFlex>
              </VKCard>
            ))}
          </VKFlex>
        ) : (
          <VKEmptyState
            title="Нет записей"
            description="Начните отслеживание времени, чтобы видеть историю работы над задачей"
            icon="⏱️"
            style={{ padding: 'var(--vk-spacing-4)' }}
          />
        )}
      </VKFlex>
    </VKGroup>
  )
}


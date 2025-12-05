import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { VKCard, VKButton, VKFlex, VKTitle, VKText, VKGrid, VKSeparator, VKGroup } from '../vk'
import { dashboardApi, analyticsApi } from '../../services/api'

type PeriodType = 'week' | 'month' | 'quarter'

export function AnalyticsSidebar() {
  const [period, setPeriod] = useState<PeriodType>('week')

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard-manager'],
    queryFn: async () => {
      const response = await dashboardApi.getManagerDashboard()
      return response.data.data
    },
  })

  const { data: analyticsData } = useQuery({
    queryKey: ['analytics-team', period],
    queryFn: async () => {
      const days = period === 'week' ? 7 : period === 'month' ? 30 : 90
      const response = await analyticsApi.getTeamAnalytics(days)
      return response.data.data
    },
  })

  const stats = dashboardData?.stats || { total: 0, active: 0, overdue: 0, completed: 0 }
  const tasksCompleted = stats.completed
  const tasksTotal = stats.total
  const productivity = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0
  const onTime = tasksCompleted - stats.overdue
  const averageTime = analyticsData?.average_task_duration ? `${analyticsData.average_task_duration}ч` : '0ч'
  const efficiency = analyticsData?.efficiency?.average ? `${Math.round(analyticsData.efficiency.average)}%` : '0%'

  // Генерируем данные на основе реальной статистики
  const currentData = useMemo(() => {
    const intervals = period === 'week' ? 7 : period === 'month' ? 4 : 3
    
    // Упрощенная генерация данных на основе реальной статистики
    const baseTasks = Math.round(tasksTotal / intervals)
    const baseCompleted = Math.round(tasksCompleted / intervals)
    const baseActive = Math.round(stats.active / intervals)
    const baseOverdue = Math.round(stats.overdue / intervals)
    
    if (period === 'week') {
      return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => ({
        day,
        tasks: baseTasks + (i % 3),
        completed: baseCompleted + (i % 2),
        inProgress: baseActive,
        overdue: i === 6 ? baseOverdue : 0,
      }))
    } else if (period === 'month') {
      return Array.from({ length: 4 }, (_, i) => ({
        week: `Нед ${i + 1}`,
        tasks: baseTasks + i,
        completed: baseCompleted + i,
        inProgress: baseActive,
        overdue: baseOverdue,
      }))
    } else {
      return ['Янв', 'Фев', 'Мар'].map((month, i) => ({
        month,
        tasks: baseTasks * 10 + i * 5,
        completed: baseCompleted * 10 + i * 5,
        inProgress: baseActive,
        overdue: baseOverdue,
      }))
    }
  }, [period, tasksTotal, tasksCompleted, stats.active, stats.overdue])
  const maxTasks = useMemo(() => Math.max(...currentData.map((d) => d.tasks)), [currentData])
  const labelKey = period === 'week' ? 'day' : period === 'month' ? 'week' : 'month'

  const plannedHours = 160
  const completedHours = 142
  const deviation = completedHours - plannedHours
  const deviationColor = deviation >= 0 ? 'var(--vk-color-status-positive)' : 'var(--vk-color-status-negative)'

  return (
    <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-8)' }}>
      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Производительность
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          opacity: 0,
          width: '100%',
          marginBottom: 'var(--vk-spacing-6)',
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
          <VKFlex align="center" gap="m">
            <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
              <svg
                style={{
                  transform: 'rotate(-90deg)',
                  width: '60px',
                  height: '60px',
                }}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  stroke="var(--vk-color-gray-100)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  stroke="var(--vk-color-accent-blue)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(productivity / 100) * 163.4} 163.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
                  {productivity}%
                </VKTitle>
              </div>
            </div>
            <VKFlex direction="column" grow style={{ gap: 'var(--vk-spacing-3)' }}>
              <VKFlex justify="between" align="center">
                <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  Выполнено
                </VKText>
                <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {tasksCompleted}/{tasksTotal}
                </VKText>
              </VKFlex>
              <VKFlex justify="between" align="center">
                <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  В срок
                </VKText>
                <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {onTime}/{tasksCompleted}
                </VKText>
              </VKFlex>
              <VKFlex justify="between" align="center">
                <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  Среднее время
                </VKText>
                <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {averageTime}
                </VKText>
              </VKFlex>
              <VKFlex justify="between" align="center">
                <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  Эффективность
                </VKText>
                <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {efficiency}
                </VKText>
              </VKFlex>
            </VKFlex>
          </VKFlex>
        </VKFlex>
      </VKGroup>

      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Статистика
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          animationDelay: '100ms',
          opacity: 0,
          width: '100%',
          marginBottom: 'var(--vk-spacing-6)',
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
          <VKFlex justify="between" align="center">
            <VKFlex gap="s">
              {(['week', 'month', 'quarter'] as PeriodType[]).map((p) => (
                <VKButton
                  key={p}
                  variant={period === p ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setPeriod(p)}
                >
                  {p === 'week' ? 'Н' : p === 'month' ? 'М' : 'К'}
                </VKButton>
              ))}
            </VKFlex>
          </VKFlex>
          <VKFlex align="end" justify="between" gap="s">
            {currentData.map((data) => {
              const completedHeight = (data.completed / maxTasks) * 50
              const inProgressHeight = (data.inProgress / maxTasks) * 50
              const overdueHeight = (data.overdue / maxTasks) * 50

              return (
                <VKFlex key={data[labelKey as keyof typeof data]} direction="column" align="center" grow>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      marginBottom: '4px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'var(--vk-color-accent-blue-alpha)',
                          borderRadius: '4px 4px 0 0',
                          height: `${completedHeight}px`,
                        }}
                      />
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(255, 160, 0, 0.2)',
                          borderRadius: '4px 4px 0 0',
                          height: `${inProgressHeight}px`,
                        }}
                      />
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(230, 70, 70, 0.2)',
                          borderRadius: '4px 4px 0 0',
                          height: `${overdueHeight}px`,
                        }}
                      />
                    </div>
                  </div>
                  <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {data[labelKey as keyof typeof data]}
                  </VKText>
                  <VKText size="xs" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {data.completed}/{data.tasks}
                  </VKText>
                </VKFlex>
              )
            })}
          </VKFlex>
          <VKSeparator />
          <VKFlex justify="center" align="center" gap="m">
            <VKFlex align="center" gap="s">
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--vk-color-accent-blue)',
                }}
              />
              <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Выполнено
              </VKText>
            </VKFlex>
            <VKFlex align="center" gap="s">
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--vk-color-status-warning)',
                }}
              />
              <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                В работе
              </VKText>
            </VKFlex>
            <VKFlex align="center" gap="s">
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--vk-color-status-negative)',
                }}
              />
              <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Просрочено
              </VKText>
            </VKFlex>
          </VKFlex>
        </VKFlex>
      </VKGroup>

      <VKGrid columns={3} style={{ width: '100%', gap: 'var(--vk-spacing-3)', rowGap: 'var(--vk-spacing-3)', columnGap: 'var(--vk-spacing-3)', marginBottom: 'var(--vk-spacing-6)' }}>
        <VKCard
          variant="default"
          padding="m"
          style={{
            textAlign: 'center',
            backgroundColor: 'var(--vk-color-accent-blue-alpha)',
            borderColor: 'var(--vk-color-accent-blue-alpha)',
            margin: 0,
            overflow: 'visible',
          }}
        >
          <VKFlex direction="column" align="center" gap="s">
            <VKText size="xs" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              План
            </VKText>
            <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {plannedHours}ч
            </VKText>
          </VKFlex>
        </VKCard>
        <VKCard
          variant="default"
          padding="m"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(75, 179, 75, 0.1)',
            borderColor: 'rgba(75, 179, 75, 0.2)',
            margin: 0,
            overflow: 'visible',
          }}
        >
          <VKFlex direction="column" align="center" gap="s">
            <VKText size="xs" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Выполнено
            </VKText>
            <VKText size="sm" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {completedHours}ч
            </VKText>
          </VKFlex>
        </VKCard>
        <VKCard
          variant="default"
          padding="m"
          style={{
            textAlign: 'center',
            backgroundColor:
              deviation >= 0
                ? 'rgba(75, 179, 75, 0.1)'
                : 'rgba(230, 70, 70, 0.1)',
            borderColor:
              deviation >= 0
                ? 'rgba(75, 179, 75, 0.2)'
                : 'rgba(230, 70, 70, 0.2)',
            margin: 0,
            overflow: 'visible',
          }}
        >
          <VKFlex direction="column" align="center" gap="s">
            <VKText size="xs" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Отклонение
            </VKText>
            <VKText size="sm" weight="semibold" style={{ color: deviationColor, margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {deviation >= 0 ? '+' : ''}
              {deviation}ч
            </VKText>
          </VKFlex>
        </VKCard>
      </VKGrid>

      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Аналитика рисков
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          animationDelay: '200ms',
          opacity: 0,
          width: '100%',
          marginBottom: 'var(--vk-spacing-6)',
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-3)' }}>
          <VKFlex align="center" gap="s">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--vk-color-status-warning)',
                flexShrink: 0,
              }}
            />
            <VKText size="xs" color="tertiary" style={{ flex: 1, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Риск просрочки
            </VKText>
            <VKText size="xs" weight="medium" style={{ color: 'var(--vk-color-status-warning)', margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Средний
            </VKText>
          </VKFlex>
          <VKFlex align="center" gap="s">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--vk-color-status-negative)',
                flexShrink: 0,
              }}
            />
            <VKText size="xs" color="tertiary" style={{ flex: 1, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Рост нагрузки
            </VKText>
            <VKText size="xs" weight="medium" style={{ color: 'var(--vk-color-status-negative)', margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              +15%
            </VKText>
          </VKFlex>
          <VKFlex align="center" gap="s">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--vk-color-status-positive)',
                flexShrink: 0,
              }}
            />
            <VKText size="xs" color="tertiary" style={{ flex: 1, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Количество задач
            </VKText>
            <VKText size="xs" weight="medium" style={{ color: 'var(--vk-color-status-positive)', margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Стабильно
            </VKText>
          </VKFlex>
          <VKFlex align="center" gap="s">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--vk-color-status-positive)',
                flexShrink: 0,
              }}
            />
            <VKText size="xs" color="tertiary" style={{ flex: 1, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Потенциальная перегрузка
            </VKText>
            <VKText size="xs" weight="medium" style={{ color: 'var(--vk-color-status-positive)', margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Низкая
            </VKText>
          </VKFlex>
        </VKFlex>
      </VKGroup>

      <VKCard
        variant="default"
        padding="m"
        style={{
          background: 'linear-gradient(to bottom right, var(--vk-color-accent-blue-alpha), rgba(75, 179, 75, 0.1))',
          width: '100%',
          margin: 0,
          overflow: 'visible',
        }}
      >
        <VKFlex justify="between" align="center" gap="s">
          <VKFlex align="center" gap="s" grow>
            <VKText size="sm" color="primary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              При текущем темпе вы выполните все задачи через <strong>3 дня</strong>
            </VKText>
          </VKFlex>
        </VKFlex>
      </VKCard>
    </VKFlex>
  )
}

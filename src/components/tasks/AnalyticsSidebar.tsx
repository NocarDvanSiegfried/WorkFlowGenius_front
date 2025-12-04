import { useState, useMemo } from 'react'
import { VKCard, VKChartWrapper, VKButton } from '../vk'

type PeriodType = 'week' | 'month' | 'quarter'

export function AnalyticsSidebar() {
  const [period, setPeriod] = useState<PeriodType>('week')

  const productivity = 87
  const tasksCompleted = 12
  const tasksTotal = 14
  const onTime = 11
  const averageTime = '2.5ч'
  const efficiency = '92%'

  const weekData = [
    { day: 'Пн', tasks: 8, completed: 7, inProgress: 1, overdue: 0 },
    { day: 'Вт', tasks: 6, completed: 6, inProgress: 0, overdue: 0 },
    { day: 'Ср', tasks: 10, completed: 9, inProgress: 1, overdue: 0 },
    { day: 'Чт', tasks: 7, completed: 6, inProgress: 1, overdue: 0 },
    { day: 'Пт', tasks: 9, completed: 8, inProgress: 1, overdue: 0 },
    { day: 'Сб', tasks: 4, completed: 3, inProgress: 1, overdue: 0 },
    { day: 'Вс', tasks: 2, completed: 2, inProgress: 0, overdue: 0 },
  ]

  const monthData = [
    { week: 'Нед 1', tasks: 28, completed: 25, inProgress: 2, overdue: 1 },
    { week: 'Нед 2', tasks: 32, completed: 30, inProgress: 1, overdue: 1 },
    { week: 'Нед 3', tasks: 35, completed: 33, inProgress: 1, overdue: 1 },
    { week: 'Нед 4', tasks: 30, completed: 28, inProgress: 1, overdue: 1 },
  ]

  const quarterData = [
    { month: 'Янв', tasks: 120, completed: 115, inProgress: 3, overdue: 2 },
    { month: 'Фев', tasks: 125, completed: 120, inProgress: 3, overdue: 2 },
    { month: 'Мар', tasks: 130, completed: 125, inProgress: 3, overdue: 2 },
  ]

  const currentData = useMemo(
    () => (period === 'week' ? weekData : period === 'month' ? monthData : quarterData),
    [period]
  )
  const maxTasks = useMemo(() => Math.max(...currentData.map((d) => d.tasks)), [currentData])
  const labelKey = period === 'week' ? 'day' : period === 'month' ? 'week' : 'month'

  const plannedHours = 160
  const completedHours = 142
  const deviation = completedHours - plannedHours
  const deviationColor = deviation >= 0 ? 'text-vk-status-positive' : 'text-vk-status-negative'

  return (
    <div className="space-y-vk-4">
      <VKCard variant="default" padding="m" className="transition-all duration-vk-base hover:shadow-vk-1">
        <h3 className="text-vk-text-primary font-vk-semibold text-vk-md mb-vk-3">
          Производительность
        </h3>
        <div className="flex items-center gap-vk-4 mb-vk-3">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="var(--vk-color-gray-100)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="var(--vk-color-accent-blue)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(productivity / 100) * 276.46} 276.46`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-vk-text-primary font-vk-semibold text-vk-lg">
                {productivity}%
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-vk-2">
              <div className="flex items-center justify-between">
                <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                  Выполнено
                </span>
                <span className="text-vk-text-primary font-vk-semibold text-vk-sm">
                  {tasksCompleted}/{tasksTotal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                  В срок
                </span>
                <span className="text-vk-text-primary font-vk-semibold text-vk-sm">
                  {onTime}/{tasksCompleted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                  Среднее время
                </span>
                <span className="text-vk-text-primary font-vk-semibold text-vk-sm">
                  {averageTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                  Эффективность
                </span>
                <span className="text-vk-text-primary font-vk-semibold text-vk-sm">
                  {efficiency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </VKCard>

      <VKChartWrapper
        title="Статистика"
        className="transition-all duration-vk-base hover:shadow-vk-1"
      >
        <div className="flex items-center justify-between mb-vk-3">
          <div className="flex gap-vk-1">
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
          </div>
        </div>
        <div className="flex items-end justify-between gap-vk-1 mb-vk-3">
          {currentData.map((data) => {
            const completedHeight = (data.completed / maxTasks) * 80
            const inProgressHeight = (data.inProgress / maxTasks) * 80
            const overdueHeight = (data.overdue / maxTasks) * 80

            return (
              <div key={data[labelKey as keyof typeof data]} className="flex-1 flex flex-col items-center">
                <div className="relative w-full h-20 flex items-end justify-center mb-vk-1">
                  <div className="absolute bottom-0 w-full flex flex-col items-center gap-0.5">
                    <div
                      className="w-full bg-vk-accent-blue-alpha rounded-t-vk-sm"
                      style={{ height: `${completedHeight}px` }}
                    />
                    <div
                      className="w-full bg-vk-status-warning/20 rounded-t-vk-sm"
                      style={{ height: `${inProgressHeight}px` }}
                    />
                    <div
                      className="w-full bg-vk-status-negative/20 rounded-t-vk-sm"
                      style={{ height: `${overdueHeight}px` }}
                    />
                  </div>
                </div>
                <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                  {data[labelKey as keyof typeof data]}
                </span>
                <span className="text-vk-text-primary font-vk-semibold text-vk-xs mt-0.5">
                  {data.completed}/{data.tasks}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-vk-3 pt-vk-3 border-t border-vk-border-secondary">
          <div className="flex items-center gap-vk-1">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-accent-blue" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
              Выполнено
            </span>
          </div>
          <div className="flex items-center gap-vk-1">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-warning" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
              В работе
            </span>
          </div>
          <div className="flex items-center gap-vk-1">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-negative" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
              Просрочено
            </span>
          </div>
        </div>
      </VKChartWrapper>

      <div className="grid grid-cols-3 gap-vk-2">
        <VKCard variant="default" padding="s" className="text-center bg-vk-accent-blue-alpha/30 border-vk-accent-blue-alpha">
          <div className="w-6 h-6 mx-auto mb-vk-1 flex items-center justify-center">
            <svg className="w-4 h-4 text-vk-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-vk-text-secondary font-vk-regular text-vk-xs mb-vk-1">
            План
          </p>
          <p className="text-vk-text-primary font-vk-semibold text-vk-sm">
            {plannedHours}ч
          </p>
        </VKCard>
        <VKCard variant="default" padding="s" className="text-center bg-vk-status-positive/10 border-vk-status-positive/20">
          <div className="w-6 h-6 mx-auto mb-vk-1 flex items-center justify-center">
            <svg className="w-4 h-4 text-vk-status-positive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-vk-text-secondary font-vk-regular text-vk-xs mb-vk-1">
            Выполнено
          </p>
          <p className="text-vk-text-primary font-vk-semibold text-vk-sm">
            {completedHours}ч
          </p>
        </VKCard>
        <VKCard
          variant="default"
          padding="s"
          className={`text-center ${
            deviation >= 0
              ? 'bg-vk-status-positive/10 border-vk-status-positive/20'
              : 'bg-vk-status-negative/10 border-vk-status-negative/20'
          }`}
        >
          <div className="w-6 h-6 mx-auto mb-vk-1 flex items-center justify-center">
            <svg className={`w-4 h-4 ${deviationColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={deviation >= 0 ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'}
              />
            </svg>
          </div>
          <p className="text-vk-text-secondary font-vk-regular text-vk-xs mb-vk-1">
            Отклонение
          </p>
          <p className={`font-vk-semibold text-vk-sm ${deviationColor}`}>
            {deviation >= 0 ? '+' : ''}
            {deviation}ч
          </p>
        </VKCard>
      </div>

      <VKCard variant="default" padding="m" className="transition-all duration-vk-base hover:shadow-vk-1">
        <h3 className="text-vk-text-primary font-vk-semibold text-vk-md mb-vk-3">
          Аналитика рисков
        </h3>
        <div className="space-y-vk-2">
          <div className="flex items-center gap-vk-2">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-warning flex-shrink-0" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs flex-1">
              Риск просрочки
            </span>
            <span className="text-vk-status-warning font-vk-medium text-vk-xs">
              Средний
            </span>
          </div>
          <div className="flex items-center gap-vk-2">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-negative flex-shrink-0" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs flex-1">
              Рост нагрузки
            </span>
            <span className="text-vk-status-negative font-vk-medium text-vk-xs">
              +15%
            </span>
          </div>
          <div className="flex items-center gap-vk-2">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-positive flex-shrink-0" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs flex-1">
              Количество задач
            </span>
            <span className="text-vk-status-positive font-vk-medium text-vk-xs">
              Стабильно
            </span>
          </div>
          <div className="flex items-center gap-vk-2">
            <div className="w-2.5 h-2.5 rounded-full bg-vk-status-positive flex-shrink-0" />
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs flex-1">
              Потенциальная перегрузка
            </span>
            <span className="text-vk-status-positive font-vk-medium text-vk-xs">
              Низкая
            </span>
          </div>
        </div>
      </VKCard>

      <VKCard
        variant="default"
        padding="m"
        className="bg-gradient-to-br from-vk-accent-blue-alpha to-vk-status-positive/10"
      >
        <div className="flex items-center justify-between gap-vk-2">
          <div className="flex items-center gap-vk-2 flex-1 min-w-0">
            <svg
              className="w-4 h-4 text-vk-accent-blue flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="text-vk-text-primary font-vk-regular text-vk-sm">
              При текущем темпе вы выполните все задачи через <strong>3 дня</strong>
            </p>
          </div>
          <svg
            className="w-4 h-4 text-vk-accent-blue flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </VKCard>
    </div>
  )
}

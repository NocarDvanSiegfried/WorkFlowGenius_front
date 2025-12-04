import { useState, useMemo } from 'react'

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
  const deviationColor = deviation >= 0 ? 'text-green-600' : 'text-red-500'

  return (
    <div className="space-y-4">
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 transition-all duration-200 hover:shadow-sm">
        <h3 className="text-black font-unbounded font-semibold text-[16px] leading-[19.84px] mb-3">
          Производительность
        </h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="#F3F4F6"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="#0077FF"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(productivity / 100) * 276.46} 276.46`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-unbounded font-semibold text-[18px] leading-[22.32px]">
                {productivity}%
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                  Выполнено
                </span>
                <span className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
                  {tasksCompleted}/{tasksTotal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                  В срок
                </span>
                <span className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
                  {onTime}/{tasksCompleted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                  Среднее время
                </span>
                <span className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
                  {averageTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                  Эффективность
                </span>
                <span className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
                  {efficiency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 transition-all duration-200 hover:shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-black font-unbounded font-semibold text-[16px] leading-[19.84px]">
            Статистика
          </h3>
          <div className="flex gap-1">
            {(['week', 'month', 'quarter'] as PeriodType[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2 py-1 rounded-[6px] font-unbounded font-normal text-[11px] leading-[13.64px] transition-all duration-200 ${
                  period === p
                    ? 'bg-[#0077FF] text-white shadow-sm'
                    : 'bg-[#F9FAFB] text-[#6B6B6B] hover:bg-[#F3F4F6]'
                }`}
              >
                {p === 'week' ? 'Н' : p === 'month' ? 'М' : 'К'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-1.5 mb-3">
          {currentData.map((data) => {
            const completedHeight = (data.completed / maxTasks) * 80
            const inProgressHeight = (data.inProgress / maxTasks) * 80
            const overdueHeight = (data.overdue / maxTasks) * 80

            return (
              <div key={data[labelKey as keyof typeof data]} className="flex-1 flex flex-col items-center">
                <div className="relative w-full h-[80px] flex items-end justify-center mb-1.5">
                  <div className="absolute bottom-0 w-full flex flex-col items-center gap-0.5">
                    <div
                      className="w-full bg-[#E0F2FE] rounded-t-[6px]"
                      style={{ height: `${completedHeight}px` }}
                    />
                    <div
                      className="w-full bg-[#FEF3C7] rounded-t-[6px]"
                      style={{ height: `${inProgressHeight}px` }}
                    />
                    <div
                      className="w-full bg-[#FEE2E2] rounded-t-[6px]"
                      style={{ height: `${overdueHeight}px` }}
                    />
                  </div>
                </div>
                <span className="text-[#8B8B8B] font-unbounded font-normal text-[10px] leading-[12.4px]">
                  {data[labelKey as keyof typeof data]}
                </span>
                <span className="text-black font-unbounded font-semibold text-[9px] leading-[11px] mt-0.5">
                  {data.completed}/{data.tasks}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-[#F3F4F6]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[9px] leading-[11px]">
              Выполнено
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FCD34D]" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[9px] leading-[11px]">
              В работе
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FCA5A5]" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[9px] leading-[11px]">
              Просрочено
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#F0F9FF] border border-[#E0F2FE] rounded-[10px] p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1.5 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[#6B6B6B] font-unbounded font-normal text-[9px] leading-[11px] mb-1">
            План
          </p>
          <p className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
            {plannedHours}ч
          </p>
        </div>
        <div className="bg-[#F0FDF4] border border-[#D1FAE5] rounded-[10px] p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1.5 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[#6B6B6B] font-unbounded font-normal text-[9px] leading-[11px] mb-1">
            Выполнено
          </p>
          <p className="text-black font-unbounded font-semibold text-[12px] leading-[14.88px]">
            {completedHours}ч
          </p>
        </div>
        <div className={`border rounded-[10px] p-3 text-center ${deviation >= 0 ? 'bg-[#F0FDF4] border-[#D1FAE5]' : 'bg-[#FEF2F2] border-[#FEE2E2]'}`}>
          <div className="w-6 h-6 mx-auto mb-1.5 flex items-center justify-center">
            <svg className={`w-4 h-4 ${deviationColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={deviation >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
            </svg>
          </div>
          <p className="text-[#6B6B6B] font-unbounded font-normal text-[9px] leading-[11px] mb-1">
            Отклонение
          </p>
          <p className={`font-unbounded font-semibold text-[12px] leading-[14.88px] ${deviationColor}`}>
            {deviation >= 0 ? '+' : ''}
            {deviation}ч
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 transition-all duration-200 hover:shadow-sm">
        <h3 className="text-black font-unbounded font-semibold text-[16px] leading-[19.84px] mb-3">
          Аналитика рисков
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FCD34D] flex-shrink-0" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px] flex-1">
              Риск просрочки
            </span>
            <span className="text-[#F59E0B] font-unbounded font-medium text-[11px] leading-[13.64px]">
              Средний
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FCA5A5] flex-shrink-0" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px] flex-1">
              Рост нагрузки
            </span>
            <span className="text-[#EF4444] font-unbounded font-medium text-[11px] leading-[13.64px]">
              +15%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#86EFAC] flex-shrink-0" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px] flex-1">
              Количество задач
            </span>
            <span className="text-[#10B981] font-unbounded font-medium text-[11px] leading-[13.64px]">
              Стабильно
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#86EFAC] flex-shrink-0" />
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px] flex-1">
              Потенциальная перегрузка
            </span>
            <span className="text-[#10B981] font-unbounded font-medium text-[11px] leading-[13.64px]">
              Низкая
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#DBEAFE] to-[#D1FAE5] rounded-[12px] p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg
              className="w-4 h-4 text-[#088ED4] flex-shrink-0"
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
            <p className="text-[#2C3E50] font-unbounded font-normal text-[12px] leading-[14.88px]">
              При текущем темпе вы выполните все задачи через <strong>3 дня</strong>
            </p>
          </div>
          <svg
            className="w-4 h-4 text-[#088ED4] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

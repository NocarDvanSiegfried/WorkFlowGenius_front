import { StatsCardWithTrend } from './StatsCardWithTrend'

const mockStats = [
  { title: 'Всего задач', value: 24, change: '+3', trend: 'up' as const, isGradient: true },
  { title: 'В работе', value: 8, change: '-2', trend: 'down' as const },
  { title: 'Выполнено', value: 12, change: '+5', trend: 'up' as const },
  { title: 'Просрочено', value: 4, change: '-1', trend: 'down' as const },
  { title: 'На проверке', value: 3, change: '+1', trend: 'up' as const },
  { title: 'Высокий приоритет', value: 6, change: '0', trend: 'neutral' as const },
]

export function StatsCardsExtended() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
      {mockStats.map((stat) => (
        <StatsCardWithTrend
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          isGradient={stat.isGradient}
        />
      ))}
    </div>
  )
}


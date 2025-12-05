import { VKGrid } from '../vk'
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
    <VKGrid
      columns={3}
      style={{
        width: '100%',
        gap: 'var(--vk-spacing-6)',
        rowGap: 'var(--vk-spacing-6)',
        columnGap: 'var(--vk-spacing-6)',
      }}
      data-vk-stats-grid
    >
      {mockStats.map((stat, index) => (
        <StatsCardWithTrend
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          isGradient={stat.isGradient}
          index={index}
        />
      ))}
    </VKGrid>
  )
}

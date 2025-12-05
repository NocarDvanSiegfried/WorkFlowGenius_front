import { useQuery } from '@tanstack/react-query'
import { VKGrid, VKFlex, VKText } from '../vk'
import { StatsCardWithTrend } from './StatsCardWithTrend'
import { dashboardApi } from '../../services/api'

export function StatsCardsExtended() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-manager'],
    queryFn: async () => {
      const response = await dashboardApi.getManagerDashboard()
      return response.data.data
    },
  })

  const stats = dashboardData?.stats || {
    total: 0,
    active: 0,
    overdue: 0,
    completed: 0,
  }

  // Вычисляем изменения (упрощенно, в реальной системе нужно сравнивать с предыдущим периодом)
  const statsWithTrend = [
    { title: 'Всего задач', value: stats.total, change: '0', trend: 'neutral' as const, isGradient: true },
    { title: 'В работе', value: stats.active, change: '0', trend: 'neutral' as const },
    { title: 'Выполнено', value: stats.completed, change: '0', trend: 'neutral' as const },
    { title: 'Просрочено', value: stats.overdue, change: '0', trend: stats.overdue > 0 ? 'down' as const : 'neutral' as const },
    { title: 'На проверке', value: 0, change: '0', trend: 'neutral' as const },
    { title: 'Высокий приоритет', value: 0, change: '0', trend: 'neutral' as const },
  ]

  if (isLoading) {
    return (
      <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
        <VKText size="base" color="secondary">Загрузка статистики...</VKText>
      </VKFlex>
    )
  }

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
      {statsWithTrend.map((stat, index) => (
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

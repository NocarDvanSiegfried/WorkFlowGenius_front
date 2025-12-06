import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKGrid, VKFlex, VKSpacing } from '../../../components/vk'
import { AdminLayout, AnalyticsCard, AnalyticsChart } from '../../../components/admin'
import type { AdminTab } from '../../../types/admin'
import { analyticsApi } from '../../../services/api'

export function AdminAnalyticsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics')

  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['analytics-team'],
    queryFn: async () => {
      const response = await analyticsApi.getTeamAnalytics(30)
      return response.data.data
    },
  })

  // Метрики модели можно использовать в будущем для дополнительных графиков
  // const { data: modelMetricsData } = useQuery({
  //   queryKey: ['analytics-model'],
  //   queryFn: async () => {
  //     const response = await analyticsApi.getModelMetrics()
  //     return response.data.data
  //   },
  // })

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  if (isLoading) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
        <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
          <div>Загрузка...</div>
        </VKFlex>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
        <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
          <div>Ошибка загрузки данных</div>
        </VKFlex>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKSpacing size="l">
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-12)', maxWidth: '1400px', margin: '0 auto' }}>
          <VKGrid columns={4} style={{ gap: 'var(--vk-spacing-8)' }}>
            <AnalyticsCard 
              title="Средняя загрузка" 
              value={`${analyticsData?.workload?.average || 0}%`} 
              index={0} 
            />
            <AnalyticsCard 
              title="Задач в работе" 
              value={String(analyticsData?.tasks?.active || 0)} 
              index={1} 
            />
            <AnalyticsCard 
              title="Выполнено за месяц" 
              value={String(analyticsData?.tasks?.completed || 0)} 
              index={2} 
            />
            <AnalyticsCard 
              title="Эффективность" 
              value={`${analyticsData?.efficiency?.average || 0}%`} 
              index={3} 
            />
          </VKGrid>

          <VKGrid columns={2} style={{ gap: 'var(--vk-spacing-8)' }}>
            <AnalyticsChart
              title="Аналитика нагрузки"
              index={0}
              type="line"
              data={analyticsData?.workload?.daily || [
                { name: 'Пн', value: analyticsData?.workload?.average || 0 },
                { name: 'Вт', value: (analyticsData?.workload?.average || 0) + 5 },
                { name: 'Ср', value: (analyticsData?.workload?.average || 0) - 3 },
                { name: 'Чт', value: (analyticsData?.workload?.average || 0) + 2 },
                { name: 'Пт', value: (analyticsData?.workload?.average || 0) - 1 },
                { name: 'Сб', value: (analyticsData?.workload?.average || 0) - 10 },
                { name: 'Вс', value: (analyticsData?.workload?.average || 0) - 15 },
              ]}
              dataKey="value"
            />
            <AnalyticsChart
              title="Распределение задач"
              index={1}
              type="bar"
              data={[
                { name: 'Активные', value: analyticsData?.tasks?.active || 0 },
                { name: 'Выполнено', value: analyticsData?.tasks?.completed || 0 },
                { name: 'Ожидают', value: (analyticsData?.tasks?.active || 0) * 0.3 },
              ]}
              dataKey="value"
            />
            <AnalyticsChart
              title="График активности"
              index={2}
              type="line"
              data={[
                { name: 'Неделя 1', value: 75 },
                { name: 'Неделя 2', value: 82 },
                { name: 'Неделя 3', value: 78 },
                { name: 'Неделя 4', value: analyticsData?.efficiency?.average || 0 },
              ]}
              dataKey="value"
            />
            <AnalyticsChart
              title="Источники задач"
              index={3}
              type="pie"
              data={[
                { name: 'Менеджер', value: 45 },
                { name: 'Клиент', value: 30 },
                { name: 'Система', value: 25 },
              ]}
              dataKey="value"
            />
          </VKGrid>
        </VKFlex>
      </VKSpacing>
    </AdminLayout>
  )
}

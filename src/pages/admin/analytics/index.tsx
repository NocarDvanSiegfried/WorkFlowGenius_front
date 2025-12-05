import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKGrid, VKFlex } from '../../../components/vk'
import { AdminLayout, AnalyticsCard, AnalyticsChartPlaceholder } from '../../../components/admin'
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

  const { data: _modelMetricsData } = useQuery({
    queryKey: ['analytics-model'],
    queryFn: async () => {
      const response = await analyticsApi.getModelMetrics()
      return response.data.data
    },
  })

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
      <VKFlex direction="column" gap="l">
        <VKGrid columns={4} gap="l">
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

        <VKGrid columns={2} gap="l">
          <AnalyticsChartPlaceholder title="Аналитика нагрузки" index={0} />
          <AnalyticsChartPlaceholder title="Распределение задач" index={1} />
          <AnalyticsChartPlaceholder title="График активности" index={2} />
          <AnalyticsChartPlaceholder title="Источники задач" index={3} />
        </VKGrid>
      </VKFlex>
    </AdminLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VKGrid, VKFlex } from '../../../components/vk'
import { AdminLayout, AnalyticsCard, AnalyticsChartPlaceholder } from '../../../components/admin'
import type { AdminTab } from '../../../types/admin'

export function AdminAnalyticsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics')

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'ai') navigate('/admin/ai')
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKFlex direction="column" gap="l">
        <VKGrid columns={4} gap="l">
          <AnalyticsCard title="Средняя загрузка" value="78%" index={0} />
          <AnalyticsCard title="Задач в работе" value="34" index={1} />
          <AnalyticsCard title="Выполнено за месяц" value="156" index={2} />
          <AnalyticsCard title="Эффективность" value="92%" index={3} />
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

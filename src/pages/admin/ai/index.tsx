import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VKFlex } from '../../../components/vk'
import { AdminLayout, AdminAIRecommendations } from '../../../components/admin'
import type { Recommendation, AdminTab } from '../../../types/admin'

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Перераспределить задачи между разработчиками',
    description: 'Иван Иванов перегружен, рекомендуется передать 3 задачи Марии Петровой',
    priority: 'high',
    applied: false,
  },
  {
    id: '2',
    title: 'Оптимизировать сроки выполнения',
    description: 'Некоторые задачи имеют слишком короткие сроки, рекомендуется продлить на 2 дня',
    priority: 'medium',
    applied: true,
  },
  {
    id: '3',
    title: 'Добавить дополнительные ресурсы',
    description: 'Для ускорения выполнения проекта рекомендуется привлечь дополнительного разработчика',
    priority: 'low',
    applied: false,
  },
]

export function AdminAIPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('ai')
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations)

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'analytics') navigate('/admin/analytics')
  }

  const handleApply = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, applied: true } : rec))
    )
  }

  const handleRefresh = () => {
    // TODO: Implement refresh recommendations functionality
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKFlex direction="column" gap="l">
        <AdminAIRecommendations
          recommendations={recommendations}
          onApply={handleApply}
          onRefresh={handleRefresh}
        />
      </VKFlex>
    </AdminLayout>
  )
}

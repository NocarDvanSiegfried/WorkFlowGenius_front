import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex } from '../../../components/vk'
import { AdminLayout, AdminAIRecommendations } from '../../../components/admin'
import type { Recommendation, AdminTab } from '../../../types/admin'
import { aiRecommendationsApi } from '../../../services/api'

export function AdminAIPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<AdminTab>('ai')

  const { data: recommendationsData, isLoading, error } = useQuery({
    queryKey: ['ai-recommendations'],
    queryFn: async () => {
      const response = await aiRecommendationsApi.getRecommendations()
      return response.data.data
    },
  })

  const applyMutation = useMutation({
    mutationFn: async (recommendationId: string) => {
      return await aiRecommendationsApi.applyRecommendation(recommendationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
    },
  })

  const applyAllMutation = useMutation({
    mutationFn: async () => {
      const unapplied = recommendations.filter((r) => !r.applied)
      const promises = unapplied.map((rec) => aiRecommendationsApi.applyRecommendation(rec.id))
      return await Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
    },
  })

  const recommendations: Recommendation[] = (recommendationsData || []).map((rec: any) => ({
    id: rec.id,
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    applied: rec.applied || false,
  }))

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  const handleApply = (id: string) => {
    applyMutation.mutate(id)
  }

  const handleApplyAll = () => {
    if (confirm(`Применить все ${unappliedRecommendations.length} рекомендаций?`)) {
      applyAllMutation.mutate()
    }
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] })
  }

  const unappliedRecommendations = recommendations.filter((r) => !r.applied)

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
      <AdminAIRecommendations
        recommendations={recommendations}
        onApply={handleApply}
        onApplyAll={handleApplyAll}
        onRefresh={handleRefresh}
      />
    </AdminLayout>
  )
}

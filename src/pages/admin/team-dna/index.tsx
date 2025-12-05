import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKFlex, VKGrid, VKAnimatedCard, VKTitle, VKText, VKSpacing } from '../../../components/vk'
import { AdminLayout } from '../../../components/admin'
import type { AdminTab } from '../../../types/admin'
import { teamDnaApi } from '../../../services/api'

interface TeamDNAStats {
  strong_connections: number
  hidden_experts: number
  team_synergy: number
  dream_teams: number
}

export function AdminTeamDNAPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('team-dna')

  const { data: statsData, isLoading, error } = useQuery({
    queryKey: ['team-dna-stats'],
    queryFn: async () => {
      const response = await teamDnaApi.getStats()
      return response.data.data as TeamDNAStats
    },
  })

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKSpacing size="m">
        <VKFlex direction="column" gap="l">
          <VKAnimatedCard mode="shadow" padding="l" index={0} animationType="fade-in">
            <VKFlex direction="column" gap="m">
              <VKTitle level={2} weight="bold">
                Командный ДНК (Team DNA)
              </VKTitle>
              <VKText size="base" color="secondary">
                Анализ скрытых паттернов сотрудничества и автоматическое формирование оптимальных команд
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKGrid columns={4} gap="m">
            {isLoading ? (
              <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
                <VKText size="base" color="secondary">
                  Загрузка...
                </VKText>
              </VKFlex>
            ) : error ? (
              <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
                <VKText size="base" color="danger">
                  Ошибка загрузки данных
                </VKText>
              </VKFlex>
            ) : statsData ? (
              <>
                <VKAnimatedCard mode="shadow" padding="m" index={1} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKText size="sm" color="secondary">
                      Сильных связей
                    </VKText>
                    <VKTitle level={3} weight="bold">
                      {statsData.strong_connections || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={2} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKText size="sm" color="secondary">
                      Скрытых экспертов
                    </VKText>
                    <VKTitle level={3} weight="bold">
                      {statsData.hidden_experts || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={3} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKText size="sm" color="secondary">
                      Синергия команды
                    </VKText>
                    <VKTitle level={3} weight="bold">
                      {statsData.team_synergy ? `${statsData.team_synergy}/10` : '-'}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={4} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKText size="sm" color="secondary">
                      Dream teams
                    </VKText>
                    <VKTitle level={3} weight="bold">
                      {statsData.dream_teams || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
              </>
            ) : null}
          </VKGrid>

          <VKGrid columns={2} gap="l">
            <VKAnimatedCard mode="shadow" padding="l" index={5} animationType="slide-up">
              <VKFlex direction="column" gap="m">
                <VKTitle level={3} weight="semibold">
                  Граф командных связей
                </VKTitle>
                <VKText size="sm" color="secondary">
                  Нажмите на узел графа, чтобы увидеть детали
                </VKText>
                <VKFlex
                  style={{
                    width: '100%',
                    height: '500px',
                    backgroundColor: 'var(--vk-color-background-secondary)',
                    borderRadius: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <VKText size="base" color="tertiary">
                    Граф связей (визуализация будет добавлена)
                  </VKText>
                </VKFlex>
              </VKFlex>
            </VKAnimatedCard>

            <VKAnimatedCard mode="shadow" padding="l" index={6} animationType="slide-up">
              <VKFlex direction="column" gap="m">
                <VKTitle level={3} weight="semibold">
                  Выберите участника команды
                </VKTitle>
                <VKFlex direction="column" gap="s">
                  <VKText size="sm" color="secondary">
                    Слабая связь
                  </VKText>
                  <VKText size="sm" color="secondary">
                    Сильная связь
                  </VKText>
                  <VKText size="sm" color="secondary">
                    Скрытый талант
                  </VKText>
                </VKFlex>
              </VKFlex>
            </VKAnimatedCard>
          </VKGrid>
        </VKFlex>
      </VKSpacing>
    </AdminLayout>
  )
}


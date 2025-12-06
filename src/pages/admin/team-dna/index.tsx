import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKFlex, VKGrid, VKAnimatedCard, VKTitle, VKText, VKSpacing } from '../../../components/vk'
import { AdminLayout, TeamDNAGraph } from '../../../components/admin'
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
      <VKSpacing size="l">
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-10)', maxWidth: '1400px', margin: '0 auto' }}>
          <VKAnimatedCard 
            mode="shadow" 
            padding="l" 
            index={0} 
            animationType="fade-in"
            data-vk-card-hover-main
            style={{
              transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            }}
          >
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)' }}>
              <VKTitle 
                level={2} 
                weight="bold"
                style={{
                  margin: 0,
                  lineHeight: 'var(--vk-line-height-tight)',
                  fontSize: 'var(--vk-font-size-2xl)',
                  fontWeight: 'var(--vk-font-weight-bold)',
                  color: 'var(--vk-color-text-primary)',
                }}
              >
                Командный ДНК (Team DNA)
              </VKTitle>
              <VKText 
                size="base" 
                color="secondary"
                style={{
                  lineHeight: 'var(--vk-line-height-relaxed)',
                  fontSize: 'var(--vk-font-size-base)',
                }}
              >
                Анализ скрытых паттернов сотрудничества и автоматическое формирование оптимальных команд
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKGrid columns={4} style={{ gap: 'var(--vk-spacing-8)' }}>
            {isLoading ? (
              <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-12)' }}>
                <VKText size="base" color="secondary">
                  Загрузка...
                </VKText>
              </VKFlex>
            ) : error ? (
              <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-12)' }}>
                <VKText size="base" color="danger">
                  Ошибка загрузки данных
                </VKText>
              </VKFlex>
            ) : statsData ? (
              <>
                <VKAnimatedCard
                  mode="shadow"
                  padding="l"
                  index={1}
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      Сильных связей
                    </VKText>
                    <VKTitle
                      level={2}
                      weight="bold"
                      style={{
                        margin: 0,
                        lineHeight: '1.2',
                        fontSize: '32px',
                        fontWeight: 700,
                      }}
                    >
                      {statsData.strong_connections || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard
                  mode="shadow"
                  padding="l"
                  index={2}
                  animationType="slide-up"
                  data-vk-card-hover
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      Скрытых экспертов
                    </VKText>
                    <VKTitle
                      level={2}
                      weight="bold"
                      style={{
                        margin: 0,
                        lineHeight: '1.2',
                        fontSize: '32px',
                        fontWeight: 700,
                      }}
                    >
                      {statsData.hidden_experts || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard
                  mode="shadow"
                  padding="l"
                  index={3}
                  animationType="slide-up"
                  data-vk-card-hover
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      Синергия команды
                    </VKText>
                    <VKTitle
                      level={2}
                      weight="bold"
                      style={{
                        margin: 0,
                        lineHeight: '1.2',
                        fontSize: '32px',
                        fontWeight: 700,
                      }}
                    >
                      {statsData.team_synergy ? `${statsData.team_synergy}/10` : '-'}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard
                  mode="shadow"
                  padding="l"
                  index={4}
                  animationType="slide-up"
                  data-vk-card-hover
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      Dream teams
                    </VKText>
                    <VKTitle
                      level={2}
                      weight="bold"
                      style={{
                        margin: 0,
                        lineHeight: '1.2',
                        fontSize: '32px',
                        fontWeight: 700,
                      }}
                    >
                      {statsData.dream_teams || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
              </>
            ) : null}
          </VKGrid>

          <TeamDNAGraph />
        </VKFlex>
      </VKSpacing>
    </AdminLayout>
  )
}


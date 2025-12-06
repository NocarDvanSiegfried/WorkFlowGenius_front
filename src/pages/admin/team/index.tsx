import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKFlex, VKAnimatedCard, VKTitle, VKText, VKSpacing } from '../../../components/vk'
import { AdminLayout } from '../../../components/admin'
import type { AdminTab } from '../../../types/admin'
import { teamApi } from '../../../services/api'

interface TeamMember {
  id: number
  name: string
  satisfaction: number
  efficiency: number
  projects: number
  avg_hours_per_month: number
  salary: string
  skills: string
}

export function AdminTeamPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('team')

  const { data: teamData, isLoading, error } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await teamApi.getTeam()
      return response.data.data as TeamMember[]
    },
  })

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKSpacing size="l">
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)', maxWidth: '1400px', margin: '0 auto' }}>
          <VKAnimatedCard mode="shadow" padding="l" index={0} animationType="fade-in">
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
              <VKTitle
                level={2}
                weight="bold"
                style={{
                  margin: 0,
                  lineHeight: '1.3',
                  fontSize: '24px',
                  fontWeight: 700,
                }}
              >
                Команда
              </VKTitle>
              <VKText
                size="base"
                color="secondary"
                style={{
                  margin: 0,
                  lineHeight: '1.5',
                  fontSize: '14px',
                }}
              >
                Управление командой и мониторинг эффективности сотрудников
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="none" index={1} animationType="slide-up">
            <VKFlex direction="column" style={{ gap: 0 }}>
              {/* Header */}
              <VKFlex
                style={{
                  padding: 'var(--vk-spacing-5) var(--vk-spacing-6)',
                  borderBottom: '2px solid var(--vk-color-border)',
                  backgroundColor: 'var(--vk-color-background-secondary)',
                }}
              >
                <VKFlex
                  data-vk-team-table
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    ID
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Сотрудник
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Удовлетворенность
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Эффективность
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Проекты
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Часов/месяц
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Зарплата
                  </VKText>
                  <VKText
                    size="sm"
                    weight="semibold"
                    color="secondary"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Навыки
                  </VKText>
                </VKFlex>
              </VKFlex>

              {/* Content */}
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
              ) : teamData && teamData.length > 0 ? (
                teamData.map((member, index) => (
                  <VKFlex
                    key={member.id}
                    style={{
                      padding: 'var(--vk-spacing-5) var(--vk-spacing-6)',
                      borderBottom: index < teamData.length - 1 ? '1px solid var(--vk-color-border-secondary)' : 'none',
                      transition: 'background-color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                      backgroundColor: 'var(--vk-color-background)',
                    }}
                    data-vk-row-hover
                  >
                    <VKFlex
                      data-vk-team-table
                      style={{
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.id}
                      </VKText>
                      <VKText
                        size="base"
                        weight="medium"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.name}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.satisfaction !== undefined && member.satisfaction !== null ? member.satisfaction : '-'}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.efficiency !== undefined && member.efficiency !== null ? `${member.efficiency}%` : '-'}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.projects !== undefined && member.projects !== null ? member.projects : '-'}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.avg_hours_per_month !== undefined && member.avg_hours_per_month !== null ? member.avg_hours_per_month : '-'}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {member.salary || '-'}
                      </VKText>
                      <VKText
                        size="sm"
                        color="primary"
                        style={{
                          fontSize: '13px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                        title={member.skills || ''}
                      >
                        {member.skills || '-'}
                      </VKText>
                    </VKFlex>
                  </VKFlex>
                ))
              ) : (
                <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-12)' }}>
                  <VKText size="base" color="secondary">
                    Нет данных о команде
                  </VKText>
                </VKFlex>
              )}
            </VKFlex>
          </VKAnimatedCard>
        </VKFlex>
      </VKSpacing>
    </AdminLayout>
  )
}


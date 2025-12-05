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
      <VKSpacing size="m">
        <VKFlex direction="column" gap="l">
          <VKAnimatedCard mode="shadow" padding="l" index={0} animationType="fade-in">
            <VKFlex direction="column" gap="m">
              <VKTitle level={2} weight="bold">
                Команда
              </VKTitle>
              <VKText size="base" color="secondary">
                Управление командой и мониторинг эффективности сотрудников
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={1} animationType="slide-up">
            <VKFlex direction="column" gap="m">
              <VKFlex
                style={{
                  padding: 'var(--vk-spacing-4)',
                  borderBottom: '1px solid var(--vk-color-border)',
                  backgroundColor: 'var(--vk-color-background-secondary)',
                }}
              >
                <VKFlex
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 150px 150px 100px 200px 120px 1fr',
                    gap: 'var(--vk-spacing-4)',
                    width: '100%',
                  }}
                >
                  <VKText size="sm" weight="semibold" color="secondary">
                    ID
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Сотрудник
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Удовлетворенность
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Эффективность работы
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Проекты
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Ср. кол-во рабочих часов (в месяц)
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Зарплата
                  </VKText>
                  <VKText size="sm" weight="semibold" color="secondary">
                    Навыки
                  </VKText>
                </VKFlex>
              </VKFlex>

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
              ) : teamData && teamData.length > 0 ? (
                teamData.map((member, index) => (
                  <VKFlex
                    key={member.id}
                    style={{
                      padding: 'var(--vk-spacing-4)',
                      borderBottom: index < teamData.length - 1 ? '1px solid var(--vk-color-border)' : 'none',
                    }}
                  >
                    <VKFlex
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 150px 150px 100px 200px 120px 1fr',
                        gap: 'var(--vk-spacing-4)',
                        width: '100%',
                      }}
                    >
                      <VKText size="sm" color="primary">
                        {member.id}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.name}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.satisfaction || '-'}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.efficiency || '-'}%
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.projects || '-'}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.avg_hours_per_month || '-'}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.salary || '-'}
                      </VKText>
                      <VKText size="sm" color="primary">
                        {member.skills || '-'}
                      </VKText>
                    </VKFlex>
                  </VKFlex>
                ))
              ) : (
                <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
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


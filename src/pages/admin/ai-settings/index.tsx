import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKGrid, VKAnimatedCard, VKTitle, VKText, VKSpacing, VKSlider, VKCheckbox } from '../../../components/vk'
import { AdminLayout } from '../../../components/admin'
import type { AdminTab } from '../../../types/admin'
import { aiSettingsApi } from '../../../services/api'

interface AIParameter {
  id: string
  name: string
  weight: number
  enabled: boolean
}

interface AISettings {
  competence_weight: number
  load_weight: number
  time_preference_weight: number
  priority_weight: number
  auto_balance_enabled: boolean
  predict_completion_enabled: boolean
  smart_recommendations_enabled: boolean
  continuous_learning_enabled: boolean
  anonymization_enabled: boolean
  model_update_frequency: string
}

const parameterMap: Record<string, { name: string; weightKey: keyof AISettings }> = {
  competencies: {
    name: 'Учет компетенций сотрудников',
    weightKey: 'competence_weight',
  },
  workload: {
    name: 'Анализ текущей загруженности',
    weightKey: 'load_weight',
  },
  preferences: {
    name: 'Учет предпочтений времени работы',
    weightKey: 'time_preference_weight',
  },
  priorities: {
    name: 'Оптимизация по приоритетам',
    weightKey: 'priority_weight',
  },
}

export function AdminAISettingsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<AdminTab>('ai-settings')

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['ai-settings'],
    queryFn: async () => {
      const response = await aiSettingsApi.getSettings()
      return response.data.data as AISettings
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      return await aiSettingsApi.updateSettings(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-settings'] })
    },
  })

  const [parameters, setParameters] = useState<AIParameter[]>([])

  useEffect(() => {
    if (settingsData) {
      const params: AIParameter[] = Object.keys(parameterMap).map((key) => {
        const map = parameterMap[key]
        return {
          id: key,
          name: map.name,
          weight: settingsData[map.weightKey] as number,
          enabled: true, // Все параметры всегда включены в текущей модели
        }
      })
      setParameters(params)
    }
  }, [settingsData])

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  const handleWeightChange = (id: string, value: number) => {
    setParameters((prev) => prev.map((p) => (p.id === id ? { ...p, weight: value } : p)))
    const map = parameterMap[id]
    if (map) {
      updateMutation.mutate({ [map.weightKey]: value })
    }
  }

  const handleToggle = (_id: string) => {
    // В текущей модели все параметры всегда включены
    // Это можно расширить в будущем, если добавить enabled поля в модель
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKSpacing size="m">
        <VKFlex direction="column" gap="l">
          <VKAnimatedCard mode="shadow" padding="l" index={0} animationType="fade-in">
            <VKFlex direction="column" gap="m">
              <VKTitle level={2} weight="bold">
                Настройки ИИ
              </VKTitle>
              <VKText size="base" color="secondary">
                Параметры алгоритма автоматического распределения задач
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={1} animationType="slide-up">
            <VKFlex direction="column" gap="l">
              <VKTitle level={3} weight="semibold">
                Параметры алгоритма
              </VKTitle>

              {isLoading ? (
                <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
                  <VKText size="base" color="secondary">
                    Загрузка...
                  </VKText>
                </VKFlex>
              ) : (
                parameters.map((param, index) => (
                <VKAnimatedCard key={param.id} mode="outline" padding="m" index={index + 2} animationType="fade-in">
                  <VKFlex direction="column" gap="m">
                    <VKFlex justify="between" align="center">
                      <VKFlex align="center" gap="m">
                        <VKCheckbox checked={param.enabled} onChange={() => handleToggle(param.id)} />
                        <VKTitle level={4} weight="medium">
                          {param.name}
                        </VKTitle>
                      </VKFlex>
                      <VKText size="sm" color="secondary">
                        {param.weight}%
                      </VKText>
                    </VKFlex>
                    <VKSlider
                      value={param.weight}
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e) => handleWeightChange(param.id, Number(e.target.value))}
                      disabled={!param.enabled}
                    />
                  </VKFlex>
                </VKAnimatedCard>
                ))
              )}
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={6} animationType="slide-up">
            <VKFlex direction="column" gap="l">
              <VKTitle level={3} weight="semibold">
                Оптимизация производительности
              </VKTitle>
              <VKGrid columns={2} gap="m">
                <VKAnimatedCard mode="outline" padding="m" index={7} animationType="fade-in">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={4} weight="medium">
                      Автоматическая балансировка нагрузки
                    </VKTitle>
                    <VKText size="sm" color="secondary">
                      Равномерное распределение задач
                    </VKText>
                    <VKCheckbox checked={true} onChange={() => {}} />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard mode="outline" padding="m" index={8} animationType="fade-in">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={4} weight="medium">
                      Предсказание сроков выполнения
                    </VKTitle>
                    <VKText size="sm" color="secondary">
                      На основе исторических данных
                    </VKText>
                    <VKCheckbox checked={true} onChange={() => {}} />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard mode="outline" padding="m" index={9} animationType="fade-in">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={4} weight="medium">
                      Умные рекомендации
                    </VKTitle>
                    <VKText size="sm" color="secondary">
                      Персональные советы для сотрудников
                    </VKText>
                    <VKCheckbox checked={true} onChange={() => {}} />
                  </VKFlex>
                </VKAnimatedCard>
              </VKGrid>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={10} animationType="slide-up">
            <VKFlex direction="column" gap="l">
              <VKTitle level={3} weight="semibold">
                Обучение и конфиденциальность
              </VKTitle>
              <VKGrid columns={2} gap="m">
                <VKAnimatedCard mode="outline" padding="m" index={11} animationType="fade-in">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={4} weight="medium">
                      Непрерывное обучение модели
                    </VKTitle>
                    <VKText size="sm" color="secondary">
                      Улучшение на основе обратной связи
                    </VKText>
                    <VKCheckbox checked={true} onChange={() => {}} />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard mode="outline" padding="m" index={12} animationType="fade-in">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={4} weight="medium">
                      Анонимизация данных
                    </VKTitle>
                    <VKText size="sm" color="secondary">
                      Защита личной информации
                    </VKText>
                    <VKCheckbox checked={true} onChange={() => {}} />
                  </VKFlex>
                </VKAnimatedCard>
              </VKGrid>

              <VKFlex direction="column" gap="m" style={{ marginTop: 'var(--vk-spacing-4)' }}>
                <VKTitle level={4} weight="medium">
                  Частота обновления модели
                </VKTitle>
                <VKText size="sm" color="secondary">
                  Ежедневно
                </VKText>
              </VKFlex>
            </VKFlex>
          </VKAnimatedCard>

          <VKGrid columns={4} gap="m">
            <VKAnimatedCard mode="shadow" padding="m" index={13} animationType="slide-up">
              <VKFlex direction="column" gap="s">
                <VKText size="sm" color="secondary">
                  Обучающих примеров
                </VKText>
                <VKTitle level={3} weight="bold">
                  12,847
                </VKTitle>
              </VKFlex>
            </VKAnimatedCard>

            <VKAnimatedCard mode="shadow" padding="m" index={14} animationType="slide-up">
              <VKFlex direction="column" gap="s">
                <VKText size="sm" color="secondary">
                  Точность модели
                </VKText>
                <VKTitle level={3} weight="bold">
                  94.2%
                </VKTitle>
              </VKFlex>
            </VKAnimatedCard>

            <VKAnimatedCard mode="shadow" padding="m" index={15} animationType="slide-up">
              <VKFlex direction="column" gap="s">
                <VKText size="sm" color="secondary">
                  F1-score
                </VKText>
                <VKTitle level={3} weight="bold">
                  0.91
                </VKTitle>
              </VKFlex>
            </VKAnimatedCard>

            <VKAnimatedCard mode="shadow" padding="m" index={16} animationType="slide-up">
              <VKFlex direction="column" gap="s">
                <VKText size="sm" color="secondary">
                  Время обучения
                </VKText>
                <VKTitle level={3} weight="bold">
                  8 мин
                </VKTitle>
              </VKFlex>
            </VKAnimatedCard>
          </VKGrid>
        </VKFlex>
      </VKSpacing>
    </AdminLayout>
  )
}


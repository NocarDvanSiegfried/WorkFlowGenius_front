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

  const handleCheckboxChange = (field: keyof AISettings, value: boolean) => {
    updateMutation.mutate({ [field]: value })
  }

  const handleToggle = (_id: string) => {
    // В текущей модели все параметры всегда включены
    // Это можно расширить в будущем, если добавить enabled поля в модель
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
                Настройки ИИ
              </VKTitle>
              <VKText 
                size="base" 
                color="secondary"
                style={{
                  lineHeight: 'var(--vk-line-height-relaxed)',
                  fontSize: 'var(--vk-font-size-base)',
                }}
              >
                Параметры алгоритма автоматического распределения задач
              </VKText>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard 
            mode="shadow" 
            padding="l" 
            index={1} 
            animationType="slide-up"
            data-vk-card-hover-main
            style={{
              transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            }}
          >
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-10)' }}>
              <VKTitle
                level={3}
                weight="semibold"
                style={{
                  margin: 0,
                  lineHeight: 'var(--vk-line-height-normal)',
                  fontSize: 'var(--vk-font-size-xl)',
                  fontWeight: 'var(--vk-font-weight-semibold)',
                  color: 'var(--vk-color-text-primary)',
                }}
              >
                Параметры алгоритма
              </VKTitle>

              {isLoading ? (
                <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-12)' }}>
                  <VKText size="base" color="secondary">
                    Загрузка...
                  </VKText>
                </VKFlex>
              ) : (
                parameters.map((param, index) => (
                  <VKAnimatedCard
                    key={param.id}
                    mode="outline"
                    padding="l"
                    index={index + 2}
                    animationType="fade-in"
                    data-vk-card-hover-main
                    style={{
                      border: '1px solid var(--vk-color-border)',
                      borderRadius: 'var(--vk-radius-lg)',
                      transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                    }}
                  >
                    <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)' }}>
                      <VKFlex justify="between" align="center" style={{ gap: 'var(--vk-spacing-4)' }}>
                        <VKFlex align="center" style={{ gap: 'var(--vk-spacing-4)', flex: 1 }}>
                          <VKCheckbox
                            checked={param.enabled}
                            onChange={() => handleToggle(param.id)}
                            style={{ flexShrink: 0 }}
                          />
                          <VKTitle
                            level={4}
                            weight="medium"
                            style={{
                              margin: 0,
                              lineHeight: '1.4',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: 'var(--vk-color-text-primary)',
                            }}
                          >
                            {param.name}
                          </VKTitle>
                        </VKFlex>
                        <VKText
                          size="base"
                          weight="semibold"
                          color="primary"
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            flexShrink: 0,
                            minWidth: '50px',
                            textAlign: 'right',
                          }}
                        >
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
                        style={{ width: '100%' }}
                      />
                    </VKFlex>
                  </VKAnimatedCard>
                ))
              )}
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={6} animationType="slide-up">
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)' }}>
              <VKTitle
                level={3}
                weight="semibold"
                style={{
                  margin: 0,
                  lineHeight: '1.4',
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                Оптимизация производительности
              </VKTitle>
              <VKGrid columns={2} style={{ gap: 'var(--vk-spacing-6)' }}>
                <VKAnimatedCard
                  mode="outline"
                  padding="l"
                  index={7}
                  animationType="fade-in"
                  style={{
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                    height: '100%',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKTitle
                      level={4}
                      weight="medium"
                      style={{
                        margin: 0,
                        lineHeight: '1.4',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      Автоматическая балансировка нагрузки
                    </VKTitle>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}
                    >
                      Равномерное распределение задач
                    </VKText>
                    <VKCheckbox
                      checked={settingsData?.auto_balance_enabled || false}
                      onChange={(e) => handleCheckboxChange('auto_balance_enabled', e.target.checked)}
                    />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard
                  mode="outline"
                  padding="l"
                  index={8}
                  animationType="fade-in"
                  style={{
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                    height: '100%',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKTitle
                      level={4}
                      weight="medium"
                      style={{
                        margin: 0,
                        lineHeight: '1.4',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      Предсказание сроков выполнения
                    </VKTitle>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}
                    >
                      На основе исторических данных
                    </VKText>
                    <VKCheckbox
                      checked={settingsData?.predict_completion_enabled || false}
                      onChange={(e) => handleCheckboxChange('predict_completion_enabled', e.target.checked)}
                    />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard
                  mode="outline"
                  padding="l"
                  index={9}
                  animationType="fade-in"
                  style={{
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                    height: '100%',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKTitle
                      level={4}
                      weight="medium"
                      style={{
                        margin: 0,
                        lineHeight: '1.4',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      Умные рекомендации
                    </VKTitle>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}
                    >
                      Персональные советы для сотрудников
                    </VKText>
                    <VKCheckbox
                      checked={settingsData?.smart_recommendations_enabled || false}
                      onChange={(e) => handleCheckboxChange('smart_recommendations_enabled', e.target.checked)}
                    />
                  </VKFlex>
                </VKAnimatedCard>
              </VKGrid>
            </VKFlex>
          </VKAnimatedCard>

          <VKAnimatedCard mode="shadow" padding="l" index={10} animationType="slide-up">
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)' }}>
              <VKTitle
                level={3}
                weight="semibold"
                style={{
                  margin: 0,
                  lineHeight: '1.4',
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                Обучение и конфиденциальность
              </VKTitle>
              <VKGrid columns={2} style={{ gap: 'var(--vk-spacing-6)' }}>
                <VKAnimatedCard
                  mode="outline"
                  padding="l"
                  index={11}
                  animationType="fade-in"
                  style={{
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                    height: '100%',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKTitle
                      level={4}
                      weight="medium"
                      style={{
                        margin: 0,
                        lineHeight: '1.4',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      Непрерывное обучение модели
                    </VKTitle>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}
                    >
                      Улучшение на основе обратной связи
                    </VKText>
                    <VKCheckbox
                      checked={settingsData?.continuous_learning_enabled || false}
                      onChange={(e) => handleCheckboxChange('continuous_learning_enabled', e.target.checked)}
                    />
                  </VKFlex>
                </VKAnimatedCard>

                <VKAnimatedCard
                  mode="outline"
                  padding="l"
                  index={12}
                  animationType="fade-in"
                  style={{
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                    height: '100%',
                  }}
                >
                  <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                    <VKTitle
                      level={4}
                      weight="medium"
                      style={{
                        margin: 0,
                        lineHeight: '1.4',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      Анонимизация данных
                    </VKTitle>
                    <VKText
                      size="sm"
                      color="secondary"
                      style={{
                        margin: 0,
                        lineHeight: '1.5',
                        fontSize: '14px',
                      }}
                    >
                      Защита личной информации
                    </VKText>
                    <VKCheckbox
                      checked={settingsData?.anonymization_enabled || false}
                      onChange={(e) => handleCheckboxChange('anonymization_enabled', e.target.checked)}
                    />
                  </VKFlex>
                </VKAnimatedCard>
              </VKGrid>

              <VKAnimatedCard
                mode="outline"
                padding="l"
                index={13}
                animationType="fade-in"
                style={{
                  border: '1px solid var(--vk-color-border)',
                  borderRadius: 'var(--vk-radius-lg)',
                  marginTop: 'var(--vk-spacing-4)',
                }}
              >
                <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-3)' }}>
                  <VKTitle
                    level={4}
                    weight="medium"
                    style={{
                      margin: 0,
                      lineHeight: '1.4',
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                  >
                    Частота обновления модели
                  </VKTitle>
                  <VKText
                    size="base"
                    color="primary"
                    weight="medium"
                    style={{
                      margin: 0,
                      lineHeight: '1.5',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {settingsData?.model_update_frequency === 'daily' ? 'Ежедневно' : settingsData?.model_update_frequency || 'Ежедневно'}
                  </VKText>
                </VKFlex>
              </VKAnimatedCard>
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


import { VKAnimatedCard, VKFlex, VKTitle, VKText, VKButton, VKProgress, VKTag, VKSpacing } from '../vk'
import type { Recommendation, RecommendationPriority } from '../../types/admin'

interface AdminAIRecommendationsProps {
  recommendations: Recommendation[]
  onApply?: (id: string) => void
  onApplyAll?: () => void
  onRefresh?: () => void
}

const priorityConfig: Record<
  RecommendationPriority,
  { label: string; variant: 'error' | 'warning' | 'primary' }
> = {
  high: { label: 'Высокий', variant: 'error' },
  medium: { label: 'Средний', variant: 'warning' },
  low: { label: 'Низкий', variant: 'primary' },
}

export function AdminAIRecommendations({
  recommendations,
  onApply,
  onApplyAll,
  onRefresh,
}: AdminAIRecommendationsProps) {
  const appliedCount = recommendations.filter((r) => r.applied).length
  const totalCount = recommendations.length
  const unappliedRecommendations = recommendations.filter((r) => !r.applied)

  return (
    <VKSpacing size="l">
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)', maxWidth: '1400px', margin: '0 auto' }}>
        <VKAnimatedCard
          mode="shadow"
          padding="l"
          index={0}
          animationType="fade-in"
          data-vk-card-hover-main
          style={{
            border: '1px solid var(--vk-color-border-secondary)',
            borderRadius: 'var(--vk-radius-lg)',
            transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          }}
        >
          <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)' }}>
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
              Искусственный интеллект для распределения задач
            </VKTitle>
            <VKText
              size="base"
              color="secondary"
              style={{
                margin: 0,
                lineHeight: 'var(--vk-line-height-relaxed)',
                fontSize: 'var(--vk-font-size-base)',
              }}
            >
              Используйте возможности ИИ для автоматического распределения задач между сотрудниками с учетом их загрузки, компетенций и предпочтений. Система анализирует текущую рабочую нагрузку и предлагает оптимальное распределение задач.
            </VKText>
            <VKFlex style={{ gap: 'var(--vk-spacing-4)' }}>
              <VKButton 
                variant="primary" 
                size="l" 
                onClick={onRefresh}
                style={{
                  transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                }}
              >
                Обновить
              </VKButton>
              {unappliedRecommendations.length > 0 && (
                <VKButton 
                  variant="secondary" 
                  size="l" 
                  onClick={onApplyAll}
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  Применить все ({unappliedRecommendations.length})
                </VKButton>
              )}
            </VKFlex>
          </VKFlex>
        </VKAnimatedCard>

        <VKAnimatedCard
          mode="shadow"
          padding="l"
          index={1}
          animationType="slide-up"
          style={{
            border: '1px solid var(--vk-color-border-secondary)',
            borderRadius: 'var(--vk-radius-lg)',
          }}
        >
          <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
            <VKTitle
              level={4}
              weight="semibold"
              style={{
                margin: 0,
                lineHeight: '1.4',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Прогресс применения
            </VKTitle>
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
              <VKFlex justify="between" align="center">
                <VKText
                  size="base"
                  color="secondary"
                  style={{
                    margin: 0,
                    lineHeight: '1.5',
                    fontSize: '14px',
                  }}
                >
                  Применено рекомендаций
                </VKText>
                <VKText
                  size="base"
                  weight="semibold"
                  style={{
                    margin: 0,
                    lineHeight: '1.5',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  {appliedCount}/{totalCount}
                </VKText>
              </VKFlex>
              <VKProgress value={appliedCount} max={totalCount} size="m" variant="accent" />
            </VKFlex>
          </VKFlex>
        </VKAnimatedCard>

        <VKAnimatedCard
          mode="shadow"
          padding="l"
          index={2}
          animationType="slide-up"
          style={{
            border: '1px solid var(--vk-color-border-secondary)',
            borderRadius: 'var(--vk-radius-lg)',
          }}
        >
          <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)' }}>
            <VKTitle
              level={4}
              weight="semibold"
              style={{
                margin: 0,
                lineHeight: '1.4',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Рекомендации
            </VKTitle>
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
              {recommendations.length === 0 ? (
                <VKText size="base" color="secondary" style={{ textAlign: 'center', padding: 'var(--vk-spacing-8)' }}>
                  Нет доступных рекомендаций
                </VKText>
              ) : (
                recommendations.map((rec, index) => {
                  const priority = priorityConfig[rec.priority]
                  return (
                    <VKAnimatedCard
                      key={rec.id}
                      variant="outlined"
                      padding="l"
                      index={index + 3}
                      animationType="fade-in"
                      data-vk-card-hover-admin
                      style={{
                        border: '1px solid var(--vk-color-border)',
                        borderRadius: 'var(--vk-radius-lg)',
                      }}
                    >
                      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
                        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)' }}>
                          <VKTitle
                            level={5}
                            weight="semibold"
                            style={{
                              margin: 0,
                              lineHeight: '1.4',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            {rec.title}
                          </VKTitle>
                          <VKText
                            size="sm"
                            color="secondary"
                            style={{
                              margin: 0,
                              lineHeight: '1.6',
                              fontSize: '14px',
                            }}
                          >
                            {rec.description}
                          </VKText>
                        </VKFlex>
                        <VKFlex justify="between" align="center" style={{ gap: 'var(--vk-spacing-3)' }}>
                          <VKTag variant={priority.variant}>
                            Приоритет: {priority.label}
                          </VKTag>
                          {!rec.applied && (
                            <VKButton variant="primary" size="m" onClick={() => onApply?.(rec.id)}>
                              Применить
                            </VKButton>
                          )}
                          {rec.applied && (
                            <VKText
                              size="sm"
                              color="secondary"
                              weight="medium"
                              style={{
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: 500,
                              }}
                            >
                              Применено
                            </VKText>
                          )}
                        </VKFlex>
                      </VKFlex>
                    </VKAnimatedCard>
                  )
                })
              )}
            </VKFlex>
          </VKFlex>
        </VKAnimatedCard>
      </VKFlex>
    </VKSpacing>
  )
}

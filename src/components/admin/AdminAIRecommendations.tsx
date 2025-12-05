import { VKAnimatedCard, VKFlex, VKTitle, VKText, VKButton, VKProgress, VKTag, VKGroup } from '../vk'
import type { Recommendation, RecommendationPriority } from '../../types/admin'

interface AdminAIRecommendationsProps {
  recommendations: Recommendation[]
  onApply?: (id: string) => void
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
  onRefresh,
}: AdminAIRecommendationsProps) {
  const appliedCount = recommendations.filter((r) => r.applied).length
  const totalCount = recommendations.length

  return (
    <VKFlex direction="column" gap="m">
      <VKGroup
        mode="card"
        header={
          <VKTitle level={4} weight="semibold" style={{ margin: 0 }}>
            Искусственный интеллект для распределения задач
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" gap="m">
          <VKText size="sm" color="secondary" style={{ margin: 0 }}>
            Используйте возможности ИИ для автоматического распределения задач между сотрудниками с учетом их загрузки, компетенций и предпочтений. Система анализирует текущую рабочую нагрузку и предлагает оптимальное распределение задач.
          </VKText>
          <VKFlex gap="s">
            <VKButton variant="primary" size="s" onClick={onRefresh}>
              Обновить
            </VKButton>
            <VKButton variant="secondary" size="s">
              Применить рекомендации
            </VKButton>
          </VKFlex>
        </VKFlex>
      </VKGroup>

      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
            Прогресс применения
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          animationDelay: '100ms',
          opacity: 0,
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" gap="s">
          <VKFlex justify="between" align="center">
            <VKText size="sm" color="secondary" style={{ margin: 0 }}>
              Применено рекомендаций
            </VKText>
            <VKText size="sm" weight="medium" style={{ margin: 0 }}>
              {appliedCount}/{totalCount}
            </VKText>
          </VKFlex>
          <VKProgress value={appliedCount} max={totalCount} size="s" variant="accent" />
        </VKFlex>
      </VKGroup>

      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
            Рекомендации
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          animationDelay: '200ms',
          opacity: 0,
          overflow: 'visible',
        }}
      >
        <VKFlex direction="column" gap="s">
          {recommendations.map((rec, index) => {
            const priority = priorityConfig[rec.priority]
            return (
              <VKAnimatedCard
                key={rec.id}
                variant="outlined"
                padding="m"
                index={index}
                animationType="slide-up"
              >
                <VKFlex direction="column" gap="s">
                  <VKFlex justify="between" align="start">
                    <VKFlex direction="column" gap="s">
                      <VKTitle level={5} weight="medium" style={{ margin: 0 }}>
                        {rec.title}
                      </VKTitle>
                      <VKText size="sm" color="secondary" style={{ margin: 0 }}>
                        {rec.description}
                      </VKText>
                    </VKFlex>
                  </VKFlex>
                  <VKFlex justify="between" align="center">
                    <VKTag variant={priority.variant}>
                      Приоритет: {priority.label}
                    </VKTag>
                    {!rec.applied && (
                      <VKButton variant="primary" size="s" onClick={() => onApply?.(rec.id)}>
                        Применить
                      </VKButton>
                    )}
                    {rec.applied && (
                      <VKText size="sm" color="secondary" style={{ margin: 0 }}>
                        Применено
                      </VKText>
                    )}
                  </VKFlex>
                </VKFlex>
              </VKAnimatedCard>
            )
          })}
        </VKFlex>
      </VKGroup>
    </VKFlex>
  )
}

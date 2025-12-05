import { useQuery } from '@tanstack/react-query'
import { VKCard, VKFlex, VKText } from '../vk'
import { aiRecommendationsApi } from '../../services/api'

export function AIDistributionBlock() {
  const { data: recommendationsData } = useQuery({
    queryKey: ['ai-recommendations'],
    queryFn: async () => {
      const response = await aiRecommendationsApi.getRecommendations()
      return response.data.data
    },
  })

  const recommendationsCount = recommendationsData?.length || 0
  const unappliedCount = recommendationsData?.filter((r: any) => !r.applied).length || 0

  const message =
    unappliedCount > 0
      ? `У вас ${unappliedCount} новых рекомендаций ИИ. Рекомендуем их применить для оптимизации распределения задач.`
      : recommendationsCount > 0
      ? 'Задачи распределены на основе ИИ. Все рекомендации применены.'
      : 'Задачи распределены на основе ИИ. Рекомендуем сфокусироваться на задачах с высоким приоритетом.'

  return (
    <VKCard
      variant="default"
      padding="m"
      style={{
        background: 'linear-gradient(to bottom right, var(--vk-color-accent-blue-alpha), rgba(75, 179, 75, 0.1))',
        width: '100%',
      }}
    >
      <VKFlex align="center" gap="m">
        <VKFlex
          align="center"
          justify="center"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--vk-color-accent-blue-alpha)',
            flexShrink: 0,
          }}
        >
          <svg
            style={{
              width: '16px',
              height: '16px',
              color: 'var(--vk-color-accent-blue)',
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </VKFlex>
        <VKText size="sm" color="primary" style={{ margin: 0 }}>
          {message}
        </VKText>
      </VKFlex>
    </VKCard>
  )
}

import { VKAnimatedCard, VKFlex, VKTitle, VKText, VKPlaceholder } from '../vk'

interface AnalyticsChartPlaceholderProps {
  title: string
  index: number
  className?: string
}

export function AnalyticsChartPlaceholder({ title, index, className = '' }: AnalyticsChartPlaceholderProps) {
  return (
    <VKAnimatedCard
      variant="outlined"
      padding="m"
      index={index}
      animationType="fade-in"
      className={className}
    >
      <VKFlex direction="column" gap="m">
        <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
          {title}
        </VKTitle>
        <VKPlaceholder title="Данные отсутствуют">
          <VKText size="sm" color="secondary" style={{ margin: 0 }}>
            График будет отображаться здесь после сбора достаточного количества данных.
          </VKText>
        </VKPlaceholder>
      </VKFlex>
    </VKAnimatedCard>
  )
}

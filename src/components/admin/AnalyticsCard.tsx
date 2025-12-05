import { VKAnimatedCard, VKFlex, VKTitle, VKText } from '../vk'

interface AnalyticsCardProps {
  title: string
  value: string | number
  description?: string
  index: number
  className?: string
}

export function AnalyticsCard({ title, value, description, index, className = '' }: AnalyticsCardProps) {
  return (
    <VKAnimatedCard
      variant="default"
      padding="m"
      index={index}
      animationType="slide-up"
      className={className}
    >
      <VKFlex direction="column" gap="s">
        <VKText size="sm" color="secondary" style={{ margin: 0 }}>
          {title}
        </VKText>
        <VKTitle level={3} weight="bold" style={{ margin: 0 }}>
          {value}
        </VKTitle>
        {description && (
          <VKText size="xs" color="secondary" style={{ margin: 0 }}>
            {description}
          </VKText>
        )}
      </VKFlex>
    </VKAnimatedCard>
  )
}

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
      padding="l"
      index={index}
      animationType="slide-up"
      className={className}
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
          {title}
        </VKText>
        <VKTitle
          level={2}
          weight="bold"
          style={{
            margin: 0,
            lineHeight: '1.2',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--vk-color-text-primary)',
          }}
        >
          {value}
        </VKTitle>
        {description && (
          <VKText
            size="xs"
            color="tertiary"
            style={{
              margin: 0,
              lineHeight: '1.4',
              fontSize: '12px',
              marginTop: 'var(--vk-spacing-2)',
            }}
          >
            {description}
          </VKText>
        )}
      </VKFlex>
    </VKAnimatedCard>
  )
}

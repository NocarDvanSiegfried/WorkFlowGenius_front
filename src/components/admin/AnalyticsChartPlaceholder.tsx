import { VKAnimatedCard, VKFlex, VKTitle, VKText, VKPlaceholder } from '../vk'

interface AnalyticsChartPlaceholderProps {
  title: string
  index: number
  className?: string
}

export function AnalyticsChartPlaceholder({ title, index, className = '' }: AnalyticsChartPlaceholderProps) {
  return (
    <VKAnimatedCard
      variant="default"
      padding="l"
      index={index}
      animationType="fade-in"
      className={className}
      data-vk-card-hover
      style={{
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)', height: '100%' }}>
        <VKTitle
          level={4}
          weight="semibold"
          style={{
            margin: 0,
            lineHeight: '1.4',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--vk-color-text-primary)',
          }}
        >
          {title}
        </VKTitle>
        <VKFlex
          style={{
            flex: 1,
            minHeight: '200px',
            backgroundColor: 'var(--vk-color-background-secondary)',
            borderRadius: 'var(--vk-radius-md)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--vk-spacing-8)',
          }}
        >
          <VKPlaceholder title="Данные отсутствуют">
            <VKText
              size="sm"
              color="secondary"
              style={{
                margin: 0,
                textAlign: 'center',
                lineHeight: '1.5',
                fontSize: '14px',
              }}
            >
              График будет отображаться здесь после сбора достаточного количества данных.
            </VKText>
          </VKPlaceholder>
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

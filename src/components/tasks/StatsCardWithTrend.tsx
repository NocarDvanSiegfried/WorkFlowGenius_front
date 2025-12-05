import { VKAnimatedCard, VKFlex, VKTitle, VKText } from '../vk'

interface StatsCardWithTrendProps {
  title: string
  value: number
  change: string
  trend: 'up' | 'down' | 'neutral'
  isGradient?: boolean
  index?: number
}

const getTrendColor = (trend: 'up' | 'down' | 'neutral', isGradient: boolean): string => {
  if (trend === 'up') {
    return isGradient ? 'rgba(255, 255, 255, 0.9)' : 'var(--vk-color-status-positive)'
  }
  if (trend === 'down') {
    return 'var(--vk-color-status-negative)'
  }
  return 'var(--vk-color-text-tertiary)'
}

export function StatsCardWithTrend({
  title,
  value,
  change,
  trend,
  isGradient = false,
  index = 0,
}: StatsCardWithTrendProps) {
  const trendColor = getTrendColor(trend, isGradient)

  return (
    <VKAnimatedCard
      variant={isGradient ? 'elevated' : 'default'}
      padding="l"
      index={index}
      animationType="slide-up"
      style={{
        background: isGradient
          ? 'linear-gradient(to bottom right, var(--vk-color-accent-blue), var(--vk-color-status-positive))'
          : undefined,
        overflow: 'hidden',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)', width: '100%', minHeight: 0 }}>
        <VKText
          size="xs"
          color={isGradient ? 'primary' : 'secondary'}
          style={{
            color: isGradient ? 'rgba(255, 255, 255, 0.9)' : undefined,
            margin: 0,
            lineHeight: '1.6',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </VKText>
        <VKFlex align="start" style={{ gap: 'var(--vk-spacing-3)' }}>
          <VKTitle
            level={3}
            weight="bold"
            style={{
              color: isGradient ? 'var(--vk-color-background-content)' : undefined,
              margin: 0,
              lineHeight: '1.4',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {value}
          </VKTitle>
          {change !== '0' && (
            <VKFlex align="center" style={{ gap: 'var(--vk-spacing-1)' }}>
              {trend === 'up' && (
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: trendColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
              {trend === 'down' && (
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: trendColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              <VKText size="xs" style={{ color: trendColor, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {change}
              </VKText>
            </VKFlex>
          )}
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

import { HTMLAttributes } from 'react'
import { VKCard } from './VKCard'
import { VKFlex } from './VKFlex'
import { VKTitle } from './VKTitle'
import { VKText } from './VKText'

interface VKMetricsProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function VKMetrics({ title, value, subtitle, trend, trendValue, className = '', style, ...props }: VKMetricsProps) {
  const trendColor =
    trend === 'up'
      ? 'var(--vk-color-status-positive)'
      : trend === 'down'
        ? 'var(--vk-color-status-negative)'
        : 'var(--vk-color-text-tertiary)'

  return (
    <VKCard mode="shadow" padding="m" className={className} style={style} {...props}>
      <VKFlex direction="column" gap="s">
        <VKText size="sm" color="secondary">
          {title}
        </VKText>
        <VKTitle level={4} weight="bold">
          {value}
        </VKTitle>
        {subtitle && (
          <VKText size="xs" color="tertiary">
            {subtitle}
          </VKText>
        )}
        {trend && trendValue && (
          <VKFlex align="center" gap="s">
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: trendColor }}
            >
              {trend === 'up' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : trend === 'down' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              ) : null}
            </svg>
            <VKText size="xs" style={{ color: trendColor }}>
              {trendValue}
            </VKText>
          </VKFlex>
        )}
      </VKFlex>
    </VKCard>
  )
}


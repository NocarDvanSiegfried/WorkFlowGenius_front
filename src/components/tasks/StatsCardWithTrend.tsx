import { VKCard } from '../vk'

interface StatsCardWithTrendProps {
  title: string
  value: number
  change: string
  trend: 'up' | 'down' | 'neutral'
  isGradient?: boolean
}

export function StatsCardWithTrend({
  title,
  value,
  change,
  trend,
  isGradient = false,
}: StatsCardWithTrendProps) {
  const trendColor =
    trend === 'up'
      ? isGradient
        ? 'text-white'
        : 'text-vk-status-positive'
      : trend === 'down'
        ? 'text-vk-status-negative'
        : 'text-vk-text-tertiary'

  return (
    <VKCard
      variant={isGradient ? 'elevated' : 'default'}
      padding="s"
      className={`transition-all duration-vk-base hover:shadow-vk-1 ${
        isGradient ? 'bg-gradient-to-br from-vk-accent-blue to-vk-status-positive' : ''
      }`}
    >
      <p
        className={`font-vk-regular text-vk-xs mb-vk-2 ${
          isGradient ? 'text-white opacity-90' : 'text-vk-text-secondary'
        }`}
      >
        {title}
      </p>
      <div className="flex items-baseline gap-vk-2">
        <p
          className={`font-vk-bold text-vk-3xl leading-tight ${
            isGradient ? 'text-white' : 'text-vk-text-primary'
          }`}
        >
          {value}
        </p>
        {change !== '0' && (
          <div className="flex items-center gap-vk-1">
            {trend === 'up' && (
              <svg
                className={`w-3 h-3 ${trendColor}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                className={`w-3 h-3 ${trendColor}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
            <span className={`font-vk-regular text-vk-xs ${trendColor}`}>{change}</span>
          </div>
        )}
      </div>
    </VKCard>
  )
}


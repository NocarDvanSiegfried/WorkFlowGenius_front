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
        : 'text-green-500'
      : trend === 'down'
        ? 'text-red-500'
        : 'text-[#6B6B6B]'

  return (
    <div
      className={`rounded-[12px] p-3 transition-all duration-200 hover:shadow-sm ${
        isGradient
          ? 'bg-gradient-to-br from-[#088ED4] to-[#38AB79]'
          : 'bg-white border border-[#E5E7EB] hover:border-[#0077FF]'
      }`}
    >
      <p
        className={`font-unbounded font-light text-[12px] leading-[14.88px] mb-2 ${
          isGradient ? 'text-white opacity-90' : 'text-[#6B6B6B]'
        }`}
      >
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <p
          className={`font-unbounded font-bold text-[28px] leading-[34.72px] ${
            isGradient ? 'text-white' : 'text-black'
          }`}
        >
          {value}
        </p>
        {change !== '0' && (
          <div className="flex items-center gap-1">
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
            <span className={`font-unbounded font-normal text-[10px] leading-[12.4px] ${trendColor}`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}


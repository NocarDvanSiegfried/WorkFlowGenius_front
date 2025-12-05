import { HTMLAttributes, ReactNode } from 'react'
import { VKCard, VKTitle, VKText, VKFlex } from './index'

interface VKChartWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function VKChartWrapper({ children, title, subtitle, className = '', style, ...props }: VKChartWrapperProps) {
  return (
    <VKCard variant="default" padding="m" className={className} style={style} {...props}>
      {(title || subtitle) && (
        <VKFlex direction="column" gap="s" style={{ marginBottom: 'var(--vk-spacing-4)' }}>
          {title && (
            <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
              {title}
            </VKTitle>
          )}
          {subtitle && (
            <VKText size="sm" color="secondary" style={{ margin: 0 }}>
              {subtitle}
            </VKText>
          )}
        </VKFlex>
      )}
      <div>{children}</div>
    </VKCard>
  )
}

import { HTMLAttributes, ReactNode, CSSProperties } from 'react'
import { VKFlex, VKTitle, VKText } from './index'

interface VKSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function VKSectionHeader({ title, subtitle, action, className = '', style, ...props }: VKSectionHeaderProps) {
  const headerStyle: CSSProperties = {
    ...style,
  }

  return (
    <div className={className} style={headerStyle} {...props}>
      <VKFlex direction="row" align="center" justify="between" gap="m">
        <VKFlex direction="column" gap="s">
          <VKTitle level={4} weight="semibold" style={{ margin: 0 }}>
            {title}
          </VKTitle>
          {subtitle && (
            <VKText size="sm" color="secondary" style={{ margin: 0 }}>
              {subtitle}
            </VKText>
          )}
        </VKFlex>
        {action && <div>{action}</div>}
      </VKFlex>
    </div>
  )
}

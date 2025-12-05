import { VKAnimatedCard, VKFlex, VKTitle, VKText } from '../vk'

interface FeatureCardSmallProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  iconColor: 'info' | 'positive' | 'warning'
  bgColor: 'blue' | 'positive' | 'warning'
  index?: number
  className?: string
}

const iconColorMap = {
  info: 'var(--vk-color-status-info)',
  positive: 'var(--vk-color-status-positive)',
  warning: 'var(--vk-color-status-warning)',
}

const bgColorMap = {
  blue: 'var(--vk-color-accent-blue-alpha)',
  positive: 'rgba(75, 179, 75, 0.1)',
  warning: 'rgba(255, 160, 0, 0.1)',
}

export function FeatureCardSmall({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  index = 0,
  className = '',
}: FeatureCardSmallProps) {
  return (
    <VKAnimatedCard
      variant="elevated"
      padding="none"
      index={index}
      animationType="slide-up"
      className={className}
      data-vk-card-hover-main
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '210px',
        height: 'auto',
        overflow: 'hidden',
        padding: 'var(--vk-spacing-6)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <VKFlex align="start" style={{ gap: 'var(--vk-spacing-4)', width: '100%' }}>
          <VKFlex
            align="center"
            justify="center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: bgColorMap[bgColor],
              flexShrink: 0,
            }}
          >
            <Icon
              style={{
                width: '24px',
                height: '24px',
                color: iconColorMap[iconColor],
              }}
              strokeWidth={2}
            />
          </VKFlex>
          <VKTitle level={5} weight="bold" style={{ flex: 1, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '18px', fontWeight: 600, color: 'var(--vk-color-text-primary)' }}>
            {title}
          </VKTitle>
        </VKFlex>
        <VKTitle level={3} weight="bold" style={{ lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '24px', fontWeight: 600, color: 'var(--vk-color-text-primary)' }}>
          {value}
        </VKTitle>
        <VKText size="sm" color="secondary" style={{ lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '14px', fontWeight: 400 }}>
          {description}
        </VKText>
      </VKFlex>
    </VKAnimatedCard>
  )
}

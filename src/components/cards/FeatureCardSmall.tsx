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
        minHeight: '240px',
        height: 'auto',
        overflow: 'hidden',
        padding: 'var(--vk-spacing-8)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
          <VKTitle 
            level={5} 
            weight="bold" 
            style={{ 
              flex: 1, 
              lineHeight: 'var(--vk-line-height-normal)', 
              wordWrap: 'break-word', 
              overflowWrap: 'break-word', 
              fontSize: 'var(--vk-font-size-lg)',
              fontWeight: 'var(--vk-font-weight-semibold)',
              color: 'var(--vk-color-text-primary)',
            }}
          >
            {title}
          </VKTitle>
        </VKFlex>
        <VKTitle 
          level={3} 
          weight="bold" 
          style={{ 
            lineHeight: 'var(--vk-line-height-tight)', 
            wordWrap: 'break-word', 
            overflowWrap: 'break-word', 
            fontSize: 'var(--vk-font-size-3xl)',
            fontWeight: 'var(--vk-font-weight-bold)',
            color: 'var(--vk-color-text-primary)',
          }}
        >
          {value}
        </VKTitle>
        <VKText 
          size="sm" 
          color="secondary" 
          style={{ 
            lineHeight: 'var(--vk-line-height-relaxed)', 
            wordWrap: 'break-word', 
            overflowWrap: 'break-word', 
            fontSize: 'var(--vk-font-size-sm)',
            fontWeight: 'var(--vk-font-weight-regular)',
          }}
        >
          {description}
        </VKText>
      </VKFlex>
    </VKAnimatedCard>
  )
}

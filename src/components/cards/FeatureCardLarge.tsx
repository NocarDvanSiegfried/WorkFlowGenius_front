import { VKFlex, VKTitle, VKText } from '../vk'
import { VKAnimatedCard } from '../vk/VKAnimatedCard'

interface FeatureCardLargeProps {
  title: string
  items: string[]
  index?: number
  className?: string
}

export function FeatureCardLarge({ title, items, index = 0, className = '' }: FeatureCardLargeProps) {
  return (
    <VKAnimatedCard
      variant="outlined"
      padding="none"
      index={index}
      animationType="slide-up"
      className={className}
      data-vk-card-hover-main
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '180px',
        overflow: 'hidden',
        padding: 'var(--vk-spacing-6)',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-5)' }}>
        <VKTitle level={5} weight="semibold" style={{ lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '18px', fontWeight: 600 }}>
          {title}
        </VKTitle>
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-3)' }}>
          {items.map((item, itemIndex) => (
            <VKFlex key={itemIndex} align="start" style={{ gap: 'var(--vk-spacing-3)' }}>
              <VKFlex
                align="center"
                justify="center"
                style={{
                  width: '16px',
                  height: '16px',
                  color: 'var(--vk-color-accent-blue)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </VKFlex>
              <VKText size="sm" color="secondary" style={{ flex: 1, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '14px' }}>
                {item}
              </VKText>
            </VKFlex>
          ))}
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

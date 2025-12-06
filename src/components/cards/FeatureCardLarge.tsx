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
        minHeight: '200px',
        overflow: 'hidden',
        padding: 'var(--vk-spacing-8)',
        transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)', width: '100%' }}>
        <VKTitle 
          level={5} 
          weight="semibold" 
          style={{ 
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
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
          {items.map((item, itemIndex) => (
            <VKFlex 
              key={itemIndex} 
              align="start" 
              style={{ 
                gap: 'var(--vk-spacing-4)',
                transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
              }}
            >
              <VKFlex
                align="center"
                justify="center"
                style={{
                  width: '20px',
                  height: '20px',
                  color: 'var(--vk-color-accent-blue)',
                  flexShrink: 0,
                  marginTop: '2px',
                  transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </VKFlex>
              <VKText 
                size="sm" 
                color="secondary" 
                style={{ 
                  flex: 1, 
                  lineHeight: 'var(--vk-line-height-relaxed)', 
                  wordWrap: 'break-word', 
                  overflowWrap: 'break-word', 
                  fontSize: 'var(--vk-font-size-sm)',
                  fontWeight: 'var(--vk-font-weight-regular)',
                }}
              >
                {item}
              </VKText>
            </VKFlex>
          ))}
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

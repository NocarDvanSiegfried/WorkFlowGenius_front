import { VKAnimatedCard, VKFlex, VKText, VKTitle } from '../vk'

interface AdminStatCardProps {
  label: string
  value: number | string
  index: number
  className?: string
}

export function AdminStatCard({ label, value, index, className = '' }: AdminStatCardProps) {
  return (
    <VKAnimatedCard
      variant="default"
      padding="l"
      index={index}
      animationType="slide-up"
      className={className}
      data-vk-card-hover-main
      style={{
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)' }}>
        <VKText
          size="sm"
          color="secondary"
          style={{
            margin: 0,
            lineHeight: 'var(--vk-line-height-normal)',
            fontWeight: 'var(--vk-font-weight-medium)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: 'var(--vk-font-size-xs)',
            transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          }}
        >
          {label}
        </VKText>
        <VKTitle
          level={2}
          weight="bold"
          style={{
            margin: 0,
            lineHeight: 'var(--vk-line-height-tight)',
            fontSize: 'var(--vk-font-size-4xl)',
            fontWeight: 'var(--vk-font-weight-bold)',
            color: 'var(--vk-color-text-primary)',
            transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          }}
        >
          {value}
        </VKTitle>
      </VKFlex>
    </VKAnimatedCard>
  )
}

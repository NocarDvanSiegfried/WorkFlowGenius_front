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
        padding="m"
        index={index}
        animationType="slide-up"
        className={className}
        data-vk-card-hover
        style={{ overflow: 'hidden' }}
      >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-3)' }}>
        <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {label}
        </VKText>
        <VKTitle level={3} weight="bold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {value}
        </VKTitle>
      </VKFlex>
    </VKAnimatedCard>
  )
}

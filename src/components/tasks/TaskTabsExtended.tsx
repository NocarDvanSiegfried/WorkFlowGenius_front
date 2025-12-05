import { VKTabs, VKTab, VKCard } from '../vk'
import type { TabType } from './types'
import { CSSProperties } from 'react'

interface TaskTabsExtendedProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const TABS = [
  { id: 'all' as TabType, label: 'Все' },
  { id: 'active' as TabType, label: 'Активные' },
  { id: 'completed' as TabType, label: 'Выполненные' },
  { id: 'review' as TabType, label: 'На проверке' },
  { id: 'overdue' as TabType, label: 'Просроченные' },
] as const

export function TaskTabsExtended({ activeTab, onTabChange }: TaskTabsExtendedProps) {
  const stickyStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--vk-color-background-secondary)',
    zIndex: 10,
    backdropFilter: 'blur(8px)',
    opacity: 0.95,
  }

  return (
    <VKCard
      variant="default"
      padding="m"
      style={{ ...stickyStyle, width: '100%' }}
    >
      <VKTabs>
        {TABS.map((tab) => (
          <VKTab key={tab.id} active={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
            {tab.label}
          </VKTab>
        ))}
      </VKTabs>
    </VKCard>
  )
}

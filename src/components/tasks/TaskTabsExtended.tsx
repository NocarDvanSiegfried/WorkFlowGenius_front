import { VKTabs, VKTab } from '../vk'
import type { TabType } from './types'

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
  return (
    <div className="sticky top-0 bg-vk-bg-secondary z-10 py-vk-3 -mx-vk-4 px-vk-4 mb-vk-4 backdrop-blur-sm bg-opacity-95">
      <VKTabs>
        {TABS.map((tab) => (
          <VKTab key={tab.id} active={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
            {tab.label}
          </VKTab>
        ))}
      </VKTabs>
    </div>
  )
}


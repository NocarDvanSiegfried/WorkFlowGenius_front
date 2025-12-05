import { VKTabs, VKTab } from '../vk'
import type { AdminTab } from '../../types/admin'

interface AdminTabsProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
}

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'dashboard', label: 'Панель администратора' },
  { id: 'tasks', label: 'Управление задачами' },
  { id: 'team', label: 'Команда' },
  { id: 'ai', label: 'Рекомендации' },
  { id: 'ai-settings', label: 'Настройки ИИ' },
  { id: 'analytics', label: 'Аналитика' },
  { id: 'team-dna', label: 'Командный ДНК' },
]

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <VKTabs>
      {tabs.map((tab) => (
        <VKTab key={tab.id} active={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </VKTab>
      ))}
    </VKTabs>
  )
}


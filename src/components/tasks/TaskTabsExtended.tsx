type TabType = 'all' | 'active' | 'completed' | 'review' | 'overdue'

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
    <div className="sticky top-0 bg-[#F9FAFB] z-10 py-3 -mx-4 px-4 mb-4 backdrop-blur-sm bg-opacity-95">
      <div className="flex gap-2 overflow-x-auto scroll-smooth">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 h-[36px] rounded-[8px] font-unbounded font-normal text-[14px] leading-[17.36px] transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#0077FF] text-white shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-[#6B6B6B] hover:bg-[#F9FAFB] hover:border-[#0077FF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}


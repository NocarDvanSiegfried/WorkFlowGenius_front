import { useState } from 'react'

import { AIDistributionBlock } from '../AIDistributionBlock'
import { AIToast } from '../AIToast'
import { AnalyticsSidebar } from '../AnalyticsSidebar'
import { PageHeader } from '../PageHeader'
import { SearchPanel } from '../SearchPanel'
import { StatsCardsExtended } from '../StatsCardsExtended'
import { TaskListGrouped } from '../TaskListGrouped'
import type { TabType } from '../types'
import { TaskTabsExtended } from '../TaskTabsExtended'

export function TasksExtendedView() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
    <div className="w-full relative">
      <AIToast />
      <div className="animate-fade-in">
        <PageHeader />
      </div>
      <div className="mb-vk-4 animate-slide-in-from-bottom">
        <StatsCardsExtended />
      </div>
      <div className="mb-vk-3 animate-fade-in">
        <SearchPanel />
      </div>
      <div className="animate-scale-in">
        <AIDistributionBlock />
      </div>
      <div className="animate-slide-in-from-bottom">
        <TaskTabsExtended activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-vk-6 mt-vk-4">
        <div className="lg:col-span-2 animate-fade-in">
          <TaskListGrouped activeTab={activeTab} />
        </div>
        <div className="lg:col-span-1 animate-fade-in">
          <AnalyticsSidebar />
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'

import { AIDistributionBlock } from '../AIDistributionBlock'
import { AIToast } from '../AIToast'
import { AnalyticsSidebar } from '../AnalyticsSidebar'
import { PageHeader } from '../PageHeader'
import { SearchPanel } from '../SearchPanel'
import { StatsCardsExtended } from '../StatsCardsExtended'
import { TaskListGrouped, type TabType } from '../TaskListGrouped'
import { TaskTabsExtended } from '../TaskTabsExtended'

export function TasksExtendedView() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
    <div className="w-full relative">
      <AIToast />
      <PageHeader />
      <StatsCardsExtended />
      <SearchPanel />
      <AIDistributionBlock />
      <TaskTabsExtended activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2">
          <TaskListGrouped activeTab={activeTab} />
        </div>
        <div className="lg:col-span-1">
          <AnalyticsSidebar />
        </div>
      </div>
    </div>
  )
}


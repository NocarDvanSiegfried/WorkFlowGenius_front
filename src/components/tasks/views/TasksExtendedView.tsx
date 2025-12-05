import { useState } from 'react'
import { VKGrid, VKFlex } from '../../vk'
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
    <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)' }}>
      <AIToast />
      
      {/* Header section */}
      <PageHeader />
      
      {/* Stats counters - ровно и равномерно по горизонтали, выровнены относительно левой границы */}
      <StatsCardsExtended />
      
      {/* Search and filters - сгруппированы, увеличенные отступы */}
      <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-6)' }}>
        <SearchPanel />
        <AIDistributionBlock />
        <TaskTabsExtended activeTab={activeTab} onTabChange={setActiveTab} />
      </VKFlex>

      {/* Main content: Две зоны - слева задачи, справа аналитика (выровнены по вертикали) */}
      <VKGrid
        columns={2}
        style={{
          gridTemplateColumns: '1fr 400px',
          alignItems: 'start',
          width: '100%',
          gap: 'var(--vk-spacing-8)',
          rowGap: 'var(--vk-spacing-8)',
          columnGap: 'var(--vk-spacing-8)',
        }}
        data-vk-tasks-grid
      >
        {/* Left column: Tasks - выровнены по вертикальной сетке, единая ширина */}
        <VKFlex direction="column" grow style={{ minWidth: 0, maxWidth: '100%', width: '100%' }}>
          <TaskListGrouped activeTab={activeTab} />
        </VKFlex>
        
        {/* Right column: Analytics - выровнена по вертикали с карточками слева */}
        <VKFlex 
          direction="column" 
          style={{ 
            width: '400px', 
            flexShrink: 0, 
            position: 'sticky', 
            top: '80px', 
            maxHeight: 'calc(100vh - 100px)', 
            overflowY: 'auto',
            alignSelf: 'start',
          }}
        >
          <AnalyticsSidebar />
        </VKFlex>
      </VKGrid>
    </VKFlex>
  )
}

import { ReactNode } from 'react'
import { VKSpacing } from '../vk'
import { AdminTabs } from './AdminTabs'
import type { AdminTab } from '../../types/admin'

interface AdminLayoutProps {
  children: ReactNode
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <>
      <VKSpacing size="s">
        <AdminTabs activeTab={activeTab} onTabChange={onTabChange} />
      </VKSpacing>
      {children}
    </>
  )
}

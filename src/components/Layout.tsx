import { Outlet } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'

interface LayoutProps {
  children?: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function Layout({ children, showHeader = true, showFooter = true }: LayoutProps) {
  return (
    <AppLayout showHeader={showHeader} showFooter={showFooter}>
      {children || <Outlet />}
    </AppLayout>
  )
}

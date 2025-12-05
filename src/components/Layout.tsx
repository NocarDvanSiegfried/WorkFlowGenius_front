import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}


import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-vk-bg-secondary">
      <Header />
      <main className="container mx-auto px-vk-4 py-vk-8">
        <Outlet />
      </main>
    </div>
  )
}


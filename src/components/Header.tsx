import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { VKButton } from './vk'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-vk-bg-content shadow-vk-1">
      <div className="container mx-auto px-vk-4 py-vk-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-vk-xl font-vk-bold text-vk-text-primary hover:opacity-80 transition-opacity duration-vk-base">
            WorkFlowGenius
          </Link>
          <div className="flex items-center gap-vk-4">
            {user ? (
              <>
                <span className="text-vk-sm text-vk-text-secondary">
                  {user.name}
                </span>
                <Link to="/dashboard">
                  <VKButton variant="tertiary" size="s">
                    Дашборд
                  </VKButton>
                </Link>
                <VKButton variant="tertiary" size="s" onClick={handleLogout}>
                  Выход
                </VKButton>
              </>
            ) : (
              <Link to="/login">
                <VKButton variant="primary" size="s">
                  Вход
                </VKButton>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}


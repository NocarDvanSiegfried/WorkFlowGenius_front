import { Link, useLocation } from 'react-router-dom'
import { VKButton } from './vk'

export function Header() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <header className="w-full h-vk-16 bg-vk-bg-content border-b border-vk-border">
      <div className="w-full max-w-vk-1360 mx-auto h-full px-vk-4 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-vk-accent-blue font-vk-bold text-vk-2xl leading-tight">VK TaskFlow</h1>
        </Link>

        <nav className="flex items-center gap-vk-10">
          <Link
            to="/"
            className={`text-vk-base leading-normal whitespace-nowrap transition-colors duration-vk-base relative pb-vk-1 ${
              isActive('/')
                ? 'text-vk-accent-blue font-vk-medium border-b border-vk-accent-blue border-[1px]'
                : 'text-vk-text-primary font-vk-regular hover:text-vk-text-link-hover'
            }`}
          >
            Главная
          </Link>
          <Link
            to="/tasks"
            className={`text-vk-base leading-normal whitespace-nowrap transition-colors duration-vk-base relative pb-vk-1 ${
              isActive('/tasks')
                ? 'text-vk-accent-blue font-vk-medium border-b border-vk-accent-blue border-[1px]'
                : 'text-vk-text-primary font-vk-regular hover:text-vk-text-link-hover'
            }`}
          >
            Мои задачи
          </Link>
          <Link
            to="/admin"
            className={`text-vk-base leading-normal whitespace-nowrap transition-colors duration-vk-base relative pb-vk-1 ${
              isActive('/admin')
                ? 'text-vk-accent-blue font-vk-medium border-b border-vk-accent-blue border-[1px]'
                : 'text-vk-text-primary font-vk-regular hover:text-vk-text-link-hover'
            }`}
          >
            Администрирование
          </Link>
          <Link to="/login">
            <VKButton variant="primary" size="m">
              Войти
            </VKButton>
          </Link>
        </nav>
      </div>
    </header>
  )
}


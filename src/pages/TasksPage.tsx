import { Link } from 'react-router-dom'
import { HomeIcon, ClipboardListIcon, UsersIcon } from '../components/icons'
import { TasksExtendedView } from '../components/tasks/views'

export function TasksPage() {
  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full">
      <header className="w-full h-[95px] bg-vk-bg-content shadow-vk-1">
        <div className="w-full max-w-[1920px] mx-auto h-full px-vk-4 sm:px-vk-6 md:px-vk-8 flex items-center justify-between">
          <div className="flex items-center gap-vk-4 flex-shrink-0">
            <div className="w-[55px] h-[55px] rounded-vk-md bg-gradient-to-br from-vk-accent-blue to-vk-status-positive flex items-center justify-center flex-shrink-0">
              <span className="text-white font-vk-semibold text-vk-2xl leading-tight">
                AI
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-vk-text-primary font-vk-regular text-vk-lg leading-normal">
                WorkFlowGenius
              </h1>
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm leading-normal">
                Интеллектуальная система управления
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-vk-5">
            <Link
              to="/"
              className="flex items-center gap-vk-2 h-[45px] hover:opacity-80 transition-opacity duration-vk-base"
            >
              <HomeIcon className="w-5 h-5 text-vk-text-tertiary flex-shrink-0" />
              <span className="text-vk-text-tertiary font-vk-regular text-vk-lg leading-normal whitespace-nowrap">
                Главная
              </span>
            </Link>

            <div className="px-vk-4 h-[45px] bg-vk-accent-blue rounded-vk-md flex items-center gap-vk-2 flex-shrink-0">
              <ClipboardListIcon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white font-vk-medium text-vk-lg leading-normal whitespace-nowrap">
                Мои задачи
              </span>
            </div>

            <Link
              to="/admin"
              className="flex items-center gap-vk-2 h-[45px] hover:opacity-80 transition-opacity duration-vk-base"
            >
              <UsersIcon className="w-5 h-5 text-vk-text-tertiary flex-shrink-0" />
              <span className="text-vk-text-tertiary font-vk-regular text-vk-lg leading-normal whitespace-nowrap">
                Администрирование
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-full pb-vk-20">
        <div className="max-w-[1780px] mx-auto px-vk-4 sm:px-vk-6 md:px-vk-8 pt-vk-8">
          <TasksExtendedView />
        </div>
      </main>
    </div>
  )
}


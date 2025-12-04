import { Link } from 'react-router-dom'
import { HomeIcon, ClipboardListIcon, UsersIcon } from '../components/icons'
import { TasksExtendedView } from '../components/tasks/views'

export function TasksPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] w-full">
      <header className="w-full h-[95px] bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[1920px] mx-auto h-full px-4 sm:px-6 md:px-[35px] flex items-center justify-between">
          <div className="flex items-center gap-[18px] flex-shrink-0">
            <div className="w-[55px] h-[55px] rounded-[10px] bg-gradient-to-br from-[#0089E1] to-[#39AC76] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-unbounded font-medium text-[24px] leading-[29.76px]">
                AI
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-black font-unbounded font-normal text-[18px] leading-[22.32px]">
                TaskFlow bla bla
              </h1>
              <p className="text-[#6B6B6B] font-unbounded font-light text-[14px] leading-[17.36px]">
                Интеллектаульная система управления
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-[20px]">
            <Link
              to="/"
              className="flex items-center gap-[8px] h-[45px] hover:opacity-80 transition-opacity"
            >
              <HomeIcon className="w-5 h-5 text-[#8B8B8B] flex-shrink-0" />
              <span className="text-[#8B8B8B] font-unbounded font-light text-[18px] leading-[22.32px] whitespace-nowrap">
                Главная
              </span>
            </Link>

            <div className="px-[16px] h-[45px] bg-[#0077FF] rounded-[8px] flex items-center gap-[8px] flex-shrink-0">
              <ClipboardListIcon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white font-unbounded font-medium text-[18px] leading-[22.32px] whitespace-nowrap">
                Мои задачи
              </span>
            </div>

            <div className="flex items-center gap-[8px] h-[45px]">
              <UsersIcon className="w-5 h-5 text-[#8B8B8B] flex-shrink-0" />
              <span className="text-[#8B8B8B] font-unbounded font-light text-[18px] leading-[22.32px] whitespace-nowrap">
                Администрирование
              </span>
            </div>
          </nav>
        </div>
      </header>

      <main className="w-full pb-[100px]">
        <div className="max-w-[1780px] mx-auto px-4 sm:px-6 md:px-[35px] pt-8">
          <TasksExtendedView />
        </div>
      </main>
    </div>
  )
}


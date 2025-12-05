import { TasksExtendedView } from '../components/tasks/views'

export function TasksPage() {
  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full">
      <main className="w-full pb-vk-20">
        <div className="max-w-vk-1780 mx-auto px-vk-4 sm:px-vk-6 md:px-vk-8 pt-vk-8">
          <TasksExtendedView />
        </div>
      </main>
    </div>
  )
}


import { useMemo } from 'react'

import { TaskCardFull } from './TaskCardFull'
import type { TabType } from './types'

export type { TabType }

interface TaskListGroupedProps {
  activeTab: TabType
}

const mockTasks = [
  {
    id: '1',
    title: 'Обновить документацию API',
    description: 'Добавить описание новых endpoints и примеры использования для разработчиков',
    priority: 'high' as const,
    status: 'in-progress' as const,
    assignee: 'Иван Иванов',
    deadline: '25.07.2024',
    deadlineTime: '15:00',
    tags: ['Backend', 'API', 'Документация'],
    progress: 65,
    rating: 4,
    group: 'high-priority',
  },
  {
    id: '2',
    title: 'Провести code review',
    description: 'Проверить код в ветке feature/new-dashboard на соответствие стандартам',
    priority: 'medium' as const,
    status: 'review' as const,
    assignee: 'Мария Петрова',
    deadline: '25.07.2024',
    deadlineTime: '18:00',
    tags: ['Code Review', 'Frontend'],
    progress: 100,
    rating: 5,
    group: 'deadline-soon',
  },
  {
    id: '3',
    title: 'Написать тесты для модуля авторизации',
    description: 'Покрыть тестами все методы авторизации, включая edge cases',
    priority: 'urgent' as const,
    status: 'assigned' as const,
    assignee: 'Алексей Сидоров',
    deadline: '26.07.2024',
    deadlineTime: '12:00',
    tags: ['Тестирование', 'Backend', 'Срочно'],
    progress: 0,
    rating: 5,
    group: 'high-priority',
  },
  {
    id: '4',
    title: 'Оптимизировать запросы к БД',
    description: 'Улучшить производительность медленных запросов в модуле аналитики',
    priority: 'low' as const,
    status: 'completed' as const,
    assignee: 'Иван Иванов',
    deadline: '24.07.2024',
    tags: ['Оптимизация', 'База данных', 'Research'],
    progress: 100,
    rating: 4,
    group: 'completed',
  },
  {
    id: '5',
    title: 'Обновить дизайн главной страницы',
    description: 'Привести в соответствие с новым макетом Figma',
    priority: 'medium' as const,
    status: 'overdue' as const,
    assignee: 'Мария Петрова',
    deadline: '23.07.2024',
    tags: ['Дизайн', 'Frontend', 'Фича'],
    progress: 80,
    rating: 3,
    group: 'overdue',
  },
  {
    id: '6',
    title: 'Реализовать систему уведомлений',
    description: 'Создать систему push-уведомлений для пользователей',
    priority: 'high' as const,
    status: 'in-progress' as const,
    assignee: 'Алексей Сидоров',
    deadline: '27.07.2024',
    deadlineTime: '16:00',
    tags: ['Уведомления', 'Backend', 'Фича'],
    progress: 30,
    rating: 4,
    group: 'in-progress',
  },
  {
    id: '7',
    title: 'Провести ретроспективу команды',
    description: 'Организовать встречу для обсуждения результатов спринта',
    priority: 'medium' as const,
    status: 'review' as const,
    assignee: 'Иван Иванов',
    deadline: '25.07.2024',
    tags: ['Бизнес', 'Research'],
    progress: 100,
    rating: 3,
    group: 'review',
  },
  {
    id: '8',
    title: 'Исправить баг с авторизацией',
    description: 'Исправить проблему с токенами при обновлении страницы',
    priority: 'urgent' as const,
    status: 'in-progress' as const,
    assignee: 'Алексей Сидоров',
    deadline: '25.07.2024',
    deadlineTime: '14:00',
    tags: ['Backend', 'Исправление', 'Срочно'],
    progress: 45,
    rating: 5,
    group: 'high-priority',
  },
]

const groupConfig = {
  'high-priority': { title: 'Высокий приоритет', order: 1 },
  'deadline-soon': { title: 'Скоро дедлайн', order: 2 },
  'in-progress': { title: 'В работе', order: 3 },
  review: { title: 'На проверке', order: 4 },
  completed: { title: 'Выполненные', order: 5 },
  overdue: { title: 'Просроченные', order: 0 },
}

export function TaskListGrouped({ activeTab }: TaskListGroupedProps) {
  const filteredTasks = useMemo(() => {
    if (activeTab === 'all') return mockTasks
    if (activeTab === 'active')
      return mockTasks.filter((task) => task.status === 'assigned' || task.status === 'in-progress')
    if (activeTab === 'completed') return mockTasks.filter((task) => task.status === 'completed')
    if (activeTab === 'review') return mockTasks.filter((task) => task.status === 'review')
    if (activeTab === 'overdue') return mockTasks.filter((task) => task.status === 'overdue')
    return mockTasks
  }, [activeTab])

  const groupedTasks = useMemo(
    () =>
      filteredTasks.reduce(
        (acc, task) => {
          const group = task.group || 'other'
          if (!acc[group]) acc[group] = []
          acc[group].push(task)
          return acc
        },
        {} as Record<string, typeof mockTasks>
      ),
    [filteredTasks]
  )

  const sortedGroups = useMemo(
    () =>
      Object.keys(groupedTasks).sort(
        (a, b) =>
          (groupConfig[a as keyof typeof groupConfig]?.order || 999) -
          (groupConfig[b as keyof typeof groupConfig]?.order || 999)
      ),
    [groupedTasks]
  )

      if (filteredTasks.length === 0) {
        return (
          <div className="text-center py-vk-12">
            <p className="text-vk-text-secondary font-vk-regular text-vk-md">
              Нет задач в этой категории
            </p>
          </div>
        )
      }

  return (
    <div>
      {sortedGroups.map((groupKey) => {
        const group = groupConfig[groupKey as keyof typeof groupConfig]
        if (!group) return null

        return (
          <div key={groupKey} className="mb-vk-5 animate-fade-in">
            <div className="flex items-center gap-vk-3 mb-vk-2">
              <h3 className="text-vk-text-secondary font-vk-regular text-vk-sm">
                {group.title}
              </h3>
              <div className="flex-1 h-px bg-vk-border-secondary" />
            </div>
            <div className="space-y-vk-3">
              {groupedTasks[groupKey].map((task, index) => (
                <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <TaskCardFull
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    status={task.status}
                    assignee={task.assignee}
                    deadline={task.deadline}
                    deadlineTime={task.deadlineTime}
                    tags={task.tags}
                    progress={task.progress}
                    rating={task.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}


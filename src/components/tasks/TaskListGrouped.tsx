import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { VKFlex, VKTitle, VKGroup, VKSkeleton, VKEmptyState } from '../vk'
import { TaskCardFull } from './TaskCardFull'
import type { TabType } from './types'
import { tasksApi } from '../../services/api'

export type { TabType }

interface TaskListGroupedProps {
  activeTab: TabType
  searchQuery?: string
  statusFilter?: string
  priorityFilter?: string
}

const groupConfig = {
  'high-priority': { title: 'Срочно', key: 'high-priority' },
  'in-progress': { title: 'В работе', key: 'in-progress' },
  review: { title: 'На проверке', key: 'review' },
  completed: { title: 'Выполненные', key: 'completed' },
  overdue: { title: 'Просроченные', key: 'overdue' },
  'deadline-soon': { title: 'Скоро дедлайн', key: 'deadline-soon' },
}

export function TaskListGrouped({ activeTab, searchQuery = '', statusFilter, priorityFilter }: TaskListGroupedProps) {
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks', searchQuery, statusFilter, priorityFilter],
    queryFn: async () => {
      const params: any = {}
      if (searchQuery) params.search = searchQuery
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter
      if (priorityFilter && priorityFilter !== 'all') params.priority = priorityFilter
      const response = await tasksApi.getTasks(params)
      return response.data.data
    },
  })

  const filteredTasks = useMemo(() => {
    if (!tasksData) return []
    
    let filtered = tasksData
    
    // Фильтрация по вкладке
    if (activeTab === 'active') {
      filtered = filtered.filter((t: any) => t.status === 'in_progress' || t.status === 'assigned')
    } else if (activeTab === 'completed') {
      filtered = filtered.filter((t: any) => t.status === 'completed')
    } else if (activeTab === 'overdue') {
      filtered = filtered.filter((t: any) => {
        if (!t.deadline) return false
        return new Date(t.deadline) < new Date() && t.status !== 'completed'
      })
    }
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((task: any) => {
        const title = task.title?.toLowerCase() || ''
        const description = task.description?.toLowerCase() || ''
        const employee = task.assignments?.[0]?.assigned_to_user?.name?.toLowerCase() || ''
        return title.includes(query) || description.includes(query) || employee.includes(query)
      })
    }
    
    // Фильтрация по приоритету
    if (priorityFilter && priorityFilter !== 'all') {
      filtered = filtered.filter((t: any) => t.priority === priorityFilter)
    }
    
    // Преобразуем в формат для TaskCardFull
    return filtered.map((task: any) => {
      const assignment = task.assignments?.[0]
      const user = assignment?.assigned_to_user
      const deadlineDate = task.deadline ? new Date(task.deadline) : null
      
      // Определяем группу
      let group = 'other'
      if (task.priority === 'urgent' || task.priority === 'high') {
        group = 'high-priority'
      } else if (task.status === 'in_progress') {
        group = 'in-progress'
      } else if (task.status === 'completed') {
        group = 'completed'
      } else if (deadlineDate && deadlineDate < new Date() && task.status !== 'completed') {
        group = 'overdue'
      } else if (deadlineDate && (deadlineDate.getTime() - Date.now()) < 24 * 60 * 60 * 1000) {
        group = 'deadline-soon'
      }
      
      // Преобразуем статус
      let displayStatus: 'in-progress' | 'assigned' | 'completed' | 'overdue' | 'review' = 'assigned'
      if (task.status === 'completed') {
        displayStatus = 'completed'
      } else if (task.status === 'in_progress') {
        displayStatus = 'in-progress'
      } else if (task.status === 'review') {
        displayStatus = 'review'
      } else if (deadlineDate && deadlineDate < new Date() && task.status !== 'completed') {
        displayStatus = 'overdue'
      } else if (task.status === 'assigned' || task.status === 'pending') {
        displayStatus = 'assigned'
      }
      
      return {
        id: String(task.id),
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: displayStatus,
        assignee: user?.name || 'Не назначен',
        deadline: deadlineDate ? deadlineDate.toLocaleDateString('ru-RU') : '',
        deadlineTime: deadlineDate ? deadlineDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : undefined,
        tags: task.tags?.map((tag: any) => tag.tag_name) || task.required_competencies || [],
        progress: assignment ? Math.round((assignment.workload_points / (user?.max_workload || 100)) * 100) : 0,
        rating: task.rating || 0,
        group,
      }
    })
  }, [tasksData, activeTab, searchQuery, priorityFilter])

  const groupedTasks = useMemo(() => {
    const groups: Record<string, any[]> = {}
    filteredTasks.forEach((task: any) => {
      const groupKey = task.group || 'other'
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(task)
    })
    return groups
  }, [filteredTasks])

  const sortedGroups = useMemo(() => {
    const order = ['high-priority', 'deadline-soon', 'in-progress', 'review', 'completed', 'overdue']
    return Object.keys(groupedTasks).sort((a, b) => {
      const aIndex = order.indexOf(a)
      const bIndex = order.indexOf(b)
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
  }, [groupedTasks])

  if (isLoading) {
    return (
      <VKFlex direction="column" gap="m" style={{ width: '100%' }}>
        {[1, 2, 3].map((i) => (
          <VKGroup key={i} mode="card" style={{ width: '100%' }}>
            <VKFlex direction="column" gap="s">
              <VKSkeleton width="60%" height="20px" />
              <VKSkeleton width="100%" height="16px" />
              <VKSkeleton width="40%" height="16px" />
            </VKFlex>
          </VKGroup>
        ))}
      </VKFlex>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <VKEmptyState
        title={searchQuery ? 'Задачи не найдены' : 'Нет задач'}
        description={
          searchQuery
            ? 'Попробуйте изменить параметры поиска или фильтры'
            : 'Создайте новую задачу или дождитесь назначения'
        }
        icon="📋"
      />
    )
  }

  return (
    <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)' }}>
      {sortedGroups.map((groupKey, groupIndex) => {
        const group = groupConfig[groupKey as keyof typeof groupConfig]
        if (!group || !groupedTasks[groupKey] || groupedTasks[groupKey].length === 0) return null

        return (
          <VKGroup
            key={groupKey}
            mode="card"
            header={
              <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {group.title}
              </VKTitle>
            }
            style={{
              animation: `vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards`,
              animationDelay: `${groupIndex * 50}ms`,
              opacity: 0,
              width: '100%',
              marginBottom: groupIndex < sortedGroups.length - 1 ? 'var(--vk-spacing-8)' : 0,
              overflow: 'visible',
            }}
          >
            <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-5)' }}>
              {groupedTasks[groupKey].map((task, taskIndex) => (
                <div
                  key={task.id}
                  style={{
                    animation: `vk-slide-up var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards`,
                    animationDelay: `${(groupIndex * 50) + (taskIndex * 50)}ms`,
                    opacity: 0,
                    width: '100%',
                    marginBottom: taskIndex < groupedTasks[groupKey].length - 1 ? 'var(--vk-spacing-5)' : 0,
                  }}
                >
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
                    group={task.group}
                  />
                </div>
              ))}
            </VKFlex>
          </VKGroup>
        )
      })}
    </VKFlex>
  )
}

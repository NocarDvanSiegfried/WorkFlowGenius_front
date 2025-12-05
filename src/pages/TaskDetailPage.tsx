import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKText, VKTitle, VKButton, VKBadge, VKCard, VKProgress, VKSelect, VKSkeleton, VKBreadcrumb } from '../components/vk'
import { tasksApi } from '../services/api'
import { TaskComments } from '../components/tasks/TaskComments'
import { TaskTags } from '../components/tasks/TaskTags'
import { TimeTracking } from '../components/tasks/TimeTracking'
import { TaskHistory } from '../components/tasks/TaskHistory'
import { ProtectedRoute } from '../components/ProtectedRoute'

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const { data: taskData, isLoading, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await tasksApi.getTask(Number(taskId))
      return response.data.data
    },
    enabled: !!taskId,
  })

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return await tasksApi.updateTask(Number(taskId!), data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setIsEditing(false)
    },
  })

  const handleStatusChange = (newStatus: string) => {
    updateMutation.mutate({ status: newStatus })
  }

  const handleRatingChange = (rating: number) => {
    updateMutation.mutate({ rating })
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <VKFlex direction="column" gap="m" style={{ padding: 'var(--vk-spacing-8)', maxWidth: '1200px', margin: '0 auto' }}>
          <VKSkeleton width="100%" height="40px" />
          <VKSkeleton width="100%" height="200px" />
          <VKSkeleton width="100%" height="150px" />
        </VKFlex>
      </ProtectedRoute>
    )
  }

  if (error || !taskData) {
    return (
      <ProtectedRoute>
        <VKFlex direction="column" align="center" gap="m" style={{ padding: 'var(--vk-spacing-8)' }}>
          <VKText size="base" color="danger">Ошибка загрузки задачи</VKText>
          <VKButton variant="secondary" onClick={() => navigate('/tasks')}>
            Вернуться к задачам
          </VKButton>
        </VKFlex>
      </ProtectedRoute>
    )
  }

  const assignment = taskData.assignments?.[0]
  const user = assignment?.assigned_to_user

  const priorityConfig: Record<string, { label: string; variant: 'primary' | 'success' | 'error' | 'warning' }> = {
    low: { label: 'Низкий', variant: 'success' },
    medium: { label: 'Средний', variant: 'warning' },
    high: { label: 'Высокий', variant: 'warning' },
    urgent: { label: 'Срочный', variant: 'error' },
  }

  const statusConfig: Record<string, { label: string; variant: 'primary' | 'success' | 'error' | 'warning' }> = {
    pending: { label: 'Ожидает', variant: 'primary' },
    assigned: { label: 'Назначена', variant: 'primary' },
    in_progress: { label: 'В работе', variant: 'warning' },
    completed: { label: 'Выполнена', variant: 'success' },
    cancelled: { label: 'Отменена', variant: 'error' },
  }

  const priority = priorityConfig[taskData.priority] || priorityConfig.medium
  const status = statusConfig[taskData.status] || statusConfig.pending

  return (
    <ProtectedRoute>
      <VKFlex direction="column" gap="l" style={{ padding: 'var(--vk-spacing-6)', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb навигация */}
        <VKBreadcrumb
          items={[
            { label: 'Задачи', href: '/tasks' },
            { label: taskData?.title || 'Задача', onClick: () => {} },
          ]}
        />

        {/* Заголовок и навигация */}
        <VKFlex justify="between" align="center">
          <VKButton variant="tertiary" size="s" onClick={() => navigate('/tasks')}>
            ← Назад к задачам
          </VKButton>
          <VKFlex gap="s">
            <VKButton variant="secondary" size="s" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Отмена' : 'Редактировать'}
            </VKButton>
          </VKFlex>
        </VKFlex>

        {/* Основная информация о задаче */}
        <VKCard variant="default" padding="l">
          <VKFlex direction="column" gap="m">
            <VKFlex justify="between" align="start" style={{ flexWrap: 'wrap' }}>
              <VKFlex direction="column" grow gap="s">
                <VKTitle level={3} weight="semibold" style={{ margin: 0 }}>
                  {taskData.title}
                </VKTitle>
                {taskData.description && (
                  <VKText size="base" color="secondary" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {taskData.description}
                  </VKText>
                )}
              </VKFlex>
              <VKFlex gap="s" style={{ flexWrap: 'wrap' }}>
                <VKBadge variant={priority.variant}>{priority.label}</VKBadge>
                <VKBadge variant={status.variant}>{status.label}</VKBadge>
              </VKFlex>
            </VKFlex>

            {/* Метаданные */}
            <VKFlex gap="l" style={{ flexWrap: 'wrap' }}>
              {user && (
                <VKFlex direction="column" gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                  <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                    Исполнитель:
                  </VKText>
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {user.name}
                  </VKText>
                </VKFlex>
              )}
              {taskData.deadline && (
                <VKFlex direction="column" gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                  <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                    Дедлайн:
                  </VKText>
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {new Date(taskData.deadline).toLocaleString('ru-RU')}
                  </VKText>
                </VKFlex>
              )}
              {taskData.estimated_hours && (
                <VKFlex direction="column" gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                  <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                    Оценка времени:
                  </VKText>
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {taskData.estimated_hours}ч
                  </VKText>
                </VKFlex>
              )}
            </VKFlex>

            {/* Прогресс */}
            {assignment && (
              <VKFlex direction="column" gap="s">
                <VKFlex justify="between" align="center">
                  <VKText size="sm" color="secondary" style={{ margin: 0 }}>
                    Загруженность:
                  </VKText>
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    {assignment.workload_points || 0}/{user?.max_workload || 100}
                  </VKText>
                </VKFlex>
                <VKProgress
                  value={assignment.workload_points || 0}
                  max={user?.max_workload || 100}
                  size="m"
                  variant="accent"
                />
              </VKFlex>
            )}

            {/* Управление статусом и оценкой */}
            {isEditing && (
              <VKFlex direction="column" gap="m">
                <VKFlex direction="column" gap="s">
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    Статус:
                  </VKText>
                  <VKSelect
                    options={[
                      { value: 'pending', label: 'Ожидает' },
                      { value: 'assigned', label: 'Назначена' },
                      { value: 'in_progress', label: 'В работе' },
                      { value: 'completed', label: 'Выполнена' },
                      { value: 'cancelled', label: 'Отменена' },
                    ]}
                    value={taskData.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  />
                </VKFlex>
                <VKFlex direction="column" gap="s">
                  <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                    Оценка выполнения (1-5):
                  </VKText>
                  <VKFlex gap="s">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <VKButton
                        key={rating}
                        variant={taskData.rating === rating ? 'primary' : 'secondary'}
                        size="s"
                        onClick={() => handleRatingChange(rating)}
                      >
                        {rating} ⭐
                      </VKButton>
                    ))}
                  </VKFlex>
                </VKFlex>
              </VKFlex>
            )}
          </VKFlex>
        </VKCard>

        {/* Дополнительные компоненты */}
        <VKFlex direction="column" gap="m">
          <TaskTags taskId={Number(taskId!)} />
          <TimeTracking taskId={Number(taskId!)} />
          <TaskComments taskId={Number(taskId!)} />
          <TaskHistory taskId={Number(taskId!)} />
        </VKFlex>
      </VKFlex>
    </ProtectedRoute>
  )
}


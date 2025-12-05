import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { VKCard, VKBadge, VKTag, VKButton, VKFlex, VKTitle, VKText, VKProgress, VKTooltip } from '../vk'
import { tasksApi } from '../../services/api'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type Status = 'assigned' | 'in-progress' | 'review' | 'completed' | 'overdue'

interface TaskCardFullProps {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  assignee: string
  deadline: string
  deadlineTime?: string
  tags: string[]
  progress: number
  rating: number
  group?: string
}

const priorityConfig = {
  low: { label: 'Низкий', variant: 'success' as const },
  medium: { label: 'Средний', variant: 'warning' as const },
  high: { label: 'Высокий', variant: 'warning' as const },
  urgent: { label: 'Срочно', variant: 'error' as const },
}

const statusConfig = {
  assigned: { label: 'Назначена', variant: 'primary' as const },
  'in-progress': { label: 'В работе', variant: 'warning' as const },
  review: { label: 'На проверке', variant: 'primary' as const },
  completed: { label: 'Выполнено', variant: 'success' as const },
  overdue: { label: 'Просрочено', variant: 'error' as const },
}

const getProgressVariant = (progress: number): 'accent' | 'warning' | 'negative' => {
  if (progress >= 70) return 'accent'
  if (progress >= 40) return 'warning'
  return 'negative'
}

const getButtonText = (status: Status) => {
  switch (status) {
    case 'assigned':
      return 'Начать'
    case 'in-progress':
      return 'Выполнить'
    case 'review':
      return 'На проверке'
    case 'completed':
      return 'Выполнено'
    case 'overdue':
      return 'Просрочено'
    default:
      return 'Начать'
  }
}

const getButtonVariant = (status: Status): 'primary' | 'secondary' => {
  switch (status) {
    case 'completed':
    case 'overdue':
    case 'review':
      return 'primary'
    default:
      return 'primary'
  }
}

function TaskCardFullComponent({
  id,
  title,
  description,
  priority,
  status,
  assignee,
  deadline,
  deadlineTime,
  tags,
  progress,
  rating,
}: TaskCardFullProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const priorityInfo = priorityConfig[priority]
  const statusInfo = statusConfig[status]

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      return await tasksApi.updateTaskStatus(Number(id), newStatus)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', id] })
    },
  })

  const handleCardClick = () => {
    navigate(`/tasks/${id}`)
  }

  const handleStatusButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (status === 'assigned') {
      updateStatusMutation.mutate('in_progress')
    } else if (status === 'in-progress') {
      updateStatusMutation.mutate('completed')
    }
  }

  return (
    <VKCard 
      variant="default" 
      padding="m"
      data-vk-card-hover
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
        <VKFlex align="center" wrap style={{ gap: 'var(--vk-spacing-2)' }}>
          <VKBadge variant={priorityInfo.variant} size="s">
            {priorityInfo.label}
          </VKBadge>
          <VKTitle level={5} weight="semibold" style={{ flex: 1, margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            {title}
          </VKTitle>
          <VKBadge variant={statusInfo.variant} size="s">
            {statusInfo.label}
          </VKBadge>
        </VKFlex>

        <VKText size="sm" color="secondary" style={{ lineHeight: '1.6', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {description}
        </VKText>

        <VKFlex align="center" wrap style={{ gap: 'var(--vk-spacing-4)' }}>
          <VKFlex align="center" style={{ gap: 'var(--vk-spacing-2)' }}>
            <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Исполнитель:
            </VKText>
            <VKText size="xs" weight="medium" color="primary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {assignee}
            </VKText>
          </VKFlex>
          <VKFlex align="center" style={{ gap: 'var(--vk-spacing-2)' }}>
            <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Дедлайн:
            </VKText>
            <VKText size="xs" weight="medium" color="primary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {deadline}
              {deadlineTime && ` ${deadlineTime}`}
            </VKText>
          </VKFlex>
        </VKFlex>

        {tags.length > 0 && (
          <VKFlex align="center" wrap style={{ gap: 'var(--vk-spacing-2)' }}>
            {tags.map((tag, index) => (
              <VKTag key={index} variant="default">
                {tag}
              </VKTag>
            ))}
          </VKFlex>
        )}

        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)' }}>
          <VKFlex justify="between" align="center">
            <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Прогресс
            </VKText>
            <VKText size="xs" weight="semibold" color="primary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {progress}%
            </VKText>
          </VKFlex>
          <VKProgress value={progress} max={100} size="s" variant={getProgressVariant(progress)} />
        </VKFlex>

        <VKFlex align="center" justify="between">
          <VKTooltip content={`Оценка выполнения: ${rating} из 5`}>
            <VKFlex align="center" style={{ gap: 'var(--vk-spacing-2)', cursor: 'help' }}>
              <VKText size="xs" color="tertiary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Рейтинг:
              </VKText>
              <VKFlex align="center" style={{ gap: 'var(--vk-spacing-1)' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="12"
                    height="12"
                    fill={star <= rating ? 'currentColor' : 'none'}
                    stroke={star <= rating ? 'currentColor' : 'var(--vk-color-gray-300)'}
                    viewBox="0 0 20 20"
                    style={{ color: star <= rating ? 'var(--vk-color-status-warning)' : 'var(--vk-color-gray-300)' }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </VKFlex>
            </VKFlex>
          </VKTooltip>
          <VKButton 
            variant={getButtonVariant(status)} 
            size="s"
            onClick={handleStatusButtonClick}
            disabled={updateStatusMutation.isPending || status === 'completed' || status === 'overdue' || status === 'review'}
          >
            {updateStatusMutation.isPending ? '...' : getButtonText(status)}
          </VKButton>
        </VKFlex>
      </VKFlex>
    </VKCard>
  )
}

export const TaskCardFull = memo(TaskCardFullComponent)

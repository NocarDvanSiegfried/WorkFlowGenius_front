import { memo } from 'react'
import { VKCard, VKBadge, VKTag, VKButton } from '../vk'

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

const progressColor = (progress: number) => {
  if (progress >= 70) return 'bg-vk-accent-blue'
  if (progress >= 40) return 'bg-vk-status-warning'
  return 'bg-vk-status-negative'
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
  const priorityInfo = priorityConfig[priority]
  const statusInfo = statusConfig[status]

  return (
    <VKCard
      variant="default"
      padding="m"
      className="w-full transition-all duration-vk-base hover:shadow-vk-1 hover:-translate-y-0.5 hover:border-vk-accent-blue"
    >
      <div className="flex items-start justify-between gap-vk-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-vk-2 mb-vk-2 flex-wrap">
            <div className={`w-2 h-2 rounded-full ${
              priority === 'low' ? 'bg-vk-status-positive' :
              priority === 'medium' ? 'bg-vk-status-warning' :
              priority === 'high' ? 'bg-vk-status-warning' :
              'bg-vk-status-negative'
            }`} />
            <h3 className="text-vk-text-primary font-vk-semibold text-vk-md">
              {title}
            </h3>
            <VKBadge variant={priorityInfo.variant} size="s">
              {priorityInfo.label}
            </VKBadge>
            <VKBadge variant={statusInfo.variant} size="s">
              {statusInfo.label}
            </VKBadge>
          </div>

          <p className="text-vk-text-secondary font-vk-regular text-vk-sm mb-vk-2">
            {description}
          </p>

          <div className="flex items-center gap-vk-3 mb-vk-2 flex-wrap">
            <div className="flex items-center gap-vk-1">
              <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                Исполнитель:
              </span>
              <span className="text-vk-text-primary font-vk-medium text-vk-xs">
                {assignee}
              </span>
            </div>
            <div className="flex items-center gap-vk-1">
              <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                Дедлайн:
              </span>
              <span className="text-vk-text-primary font-vk-medium text-vk-xs">
                {deadline}
                {deadlineTime && ` ${deadlineTime}`}
              </span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex items-center gap-vk-1 mb-vk-2 flex-wrap">
              {tags.map((tag, index) => (
                <VKTag key={index} variant="default">
                  {tag}
                </VKTag>
              ))}
            </div>
          )}

          <div className="mb-vk-2">
            <div className="flex items-center justify-between mb-vk-1">
              <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
                Прогресс
              </span>
              <span className="text-vk-text-primary font-vk-semibold text-vk-xs">
                {progress}%
              </span>
            </div>
            <div className="w-full h-1 bg-vk-bg-tertiary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-vk-base ease-vk-standard ${progressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-vk-1">
            <span className="text-vk-text-tertiary font-vk-regular text-vk-xs">
              Рейтинг:
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
                    star <= rating ? 'text-vk-status-warning fill-vk-status-warning' : 'text-vk-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <VKButton variant={getButtonVariant(status)} size="m" className="flex-shrink-0">
          {getButtonText(status)}
        </VKButton>
      </div>
    </VKCard>
  )
}

export const TaskCardFull = memo(TaskCardFullComponent)


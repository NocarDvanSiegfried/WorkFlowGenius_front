import { memo } from 'react'

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
  low: { label: 'Низкий', color: 'bg-green-500', textColor: 'text-green-500' },
  medium: { label: 'Средний', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
  high: { label: 'Высокий', color: 'bg-orange-500', textColor: 'text-orange-500' },
  urgent: { label: 'Срочно', color: 'bg-red-500', textColor: 'text-red-500' },
}

const statusConfig = {
  assigned: { label: 'Назначена', color: 'bg-[#0077FF]', textColor: 'text-[#0077FF]' },
  'in-progress': { label: 'В работе', color: 'bg-[#FFA500]', textColor: 'text-[#FFA500]' },
  review: { label: 'На проверке', color: 'bg-[#9B59B6]', textColor: 'text-[#9B59B6]' },
  completed: { label: 'Выполнено', color: 'bg-green-500', textColor: 'text-green-500' },
  overdue: { label: 'Просрочено', color: 'bg-red-500', textColor: 'text-red-500' },
}

const progressColor = (progress: number) => {
  if (progress >= 70) return 'bg-[#0077FF]'
  if (progress >= 40) return 'bg-[#FFA500]'
  return 'bg-red-500'
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

const getButtonStyle = (status: Status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500 text-white hover:bg-green-600'
    case 'overdue':
      return 'bg-red-500 text-white hover:bg-red-600'
    case 'review':
      return 'bg-[#9B59B6] text-white hover:bg-[#8E44AD]'
    default:
      return 'bg-[#0077FF] text-white hover:bg-[#0066DD]'
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
    <div className="w-full bg-white border border-[#E5E7EB] rounded-[12px] p-4 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 hover:border-[#0077FF]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className={`w-2 h-2 rounded-full ${priorityInfo.color}`} />
            <h3 className="text-black font-unbounded font-semibold text-[16px] leading-[19.84px]">
              {title}
            </h3>
            <span
              className={`px-1.5 py-0.5 rounded-[4px] font-unbounded font-normal text-[9px] leading-[11px] text-white ${priorityInfo.color}`}
            >
              {priorityInfo.label}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-[4px] font-unbounded font-normal text-[9px] leading-[11px] text-white ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
          </div>

          <p className="text-[#6B6B6B] font-unbounded font-normal text-[13px] leading-[16px] mb-2">
            {description}
          </p>

          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                Исполнитель:
              </span>
              <span className="text-black font-unbounded font-medium text-[11px] leading-[13.64px]">
                {assignee}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                Дедлайн:
              </span>
              <span className="text-black font-unbounded font-medium text-[11px] leading-[13.64px]">
                {deadline}
                {deadlineTime && ` ${deadlineTime}`}
              </span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[3px] font-unbounded font-normal text-[9px] leading-[11px] text-[#6B6B6B]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
                Прогресс
              </span>
              <span className="text-black font-unbounded font-semibold text-[11px] leading-[13.64px]">
                {progress}%
              </span>
            </div>
            <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8B8B8B] font-unbounded font-normal text-[11px] leading-[13.64px]">
              Рейтинг:
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
                    star <= rating ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-200'
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

        <button
          className={`px-4 h-[34px] rounded-[8px] font-unbounded font-normal text-[13px] leading-[16px] transition-all duration-200 flex-shrink-0 ${getButtonStyle(status)}`}
        >
          {getButtonText(status)}
        </button>
      </div>
    </div>
  )
}

export const TaskCardFull = memo(TaskCardFullComponent)


import { VKFlex, VKText, VKTitle, VKProgress, VKBadge, VKButton, VKAvatar, VKAnimatedCard, VKGroup, VKTooltip } from '../vk'
import { VKEmptyState } from '../vk/VKEmptyState'
import type { Task, TaskStatus } from '../../types/admin'

interface AdminTasksTableProps {
  tasks: Task[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onAssign?: (id: string) => void
}

const statusConfig: Record<
  TaskStatus,
  { variant: 'primary' | 'success' | 'error'; label: string }
> = {
  active: { variant: 'primary', label: 'Активна' },
  completed: { variant: 'success', label: 'Выполнена' },
  overdue: { variant: 'error', label: 'Просрочена' },
}

export function AdminTasksTable({ tasks, onEdit, onDelete, onAssign }: AdminTasksTableProps) {
  return (
    <VKGroup
      mode="card"
      header={
        <VKTitle level={4} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '16px', fontWeight: 600 }}>
          Задачи
        </VKTitle>
      }
      style={{
        animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
        opacity: 0,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {tasks.length === 0 ? (
        <VKEmptyState
          title="Задачи не найдены"
          description="Создайте новую задачу или измените параметры фильтрации"
          icon="📋"
        />
      ) : (
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)' }}>
          {tasks.map((task, index) => {
            const status = statusConfig[task.status]
            return (
              <div
                key={task.id}
                style={{
                  animation: `vk-slide-up var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards`,
                  animationDelay: `${index * 60}ms`,
                  opacity: 0,
                  width: '100%',
                }}
              >
                <VKAnimatedCard
                  variant="outlined"
                  padding="l"
                  index={index}
                  animationType="fade-in"
                  data-vk-card-hover-admin
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--vk-color-border)',
                    borderRadius: 'var(--vk-radius-lg)',
                  }}
                >
                  <VKFlex direction="row" align="start" style={{ width: '100%', gap: 'var(--vk-spacing-4)' }}>
                    <VKAvatar name={task.employee} size="m" />
                    <VKFlex direction="column" grow style={{ gap: 'var(--vk-spacing-4)', minWidth: 0 }}>
                      <VKFlex align="center" justify="between" style={{ gap: 'var(--vk-spacing-3)', flexWrap: 'wrap' }}>
                        <VKFlex align="center" style={{ gap: 'var(--vk-spacing-3)', flex: 1, minWidth: 0 }}>
                          <VKTitle
                            level={4}
                            weight="semibold"
                            style={{
                              margin: 0,
                              lineHeight: '1.4',
                              fontSize: '16px',
                              fontWeight: 600,
                              color: 'var(--vk-color-text-primary)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {task.task}
                          </VKTitle>
                          <VKBadge variant={status.variant} size="s" style={{ flexShrink: 0 }}>
                            {status.label}
                          </VKBadge>
                        </VKFlex>
                      </VKFlex>
                      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)' }}>
                        <VKText
                          size="sm"
                          color="secondary"
                          style={{
                            margin: 0,
                            lineHeight: '1.5',
                            fontSize: '14px',
                          }}
                        >
                          {task.employeeEmail}
                        </VKText>
                        <VKText
                          size="sm"
                          color="secondary"
                          style={{
                            margin: 0,
                            lineHeight: '1.5',
                            fontSize: '14px',
                          }}
                        >
                          {task.date}
                        </VKText>
                      </VKFlex>
                      <VKFlex align="center" style={{ gap: 'var(--vk-spacing-3)' }}>
                        <VKProgress
                          value={task.progress}
                          max={task.maxProgress}
                          size="s"
                          variant="accent"
                          style={{ flex: 1, minWidth: 0 }}
                        />
                        <VKText
                          size="sm"
                          color="secondary"
                          style={{
                            margin: 0,
                            lineHeight: '1.5',
                            fontSize: '14px',
                            flexShrink: 0,
                            fontWeight: 500,
                          }}
                        >
                          {task.progress}/{task.maxProgress}
                        </VKText>
                      </VKFlex>
                    </VKFlex>
                    <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)', flexShrink: 0 }}>
                      {task.status === 'active' && task.employee === '-' && (
                        <VKTooltip content="Назначить задачу сотруднику">
                          <VKButton variant="primary" size="s" onClick={() => onAssign?.(task.id)}>
                            Назначить
                          </VKButton>
                        </VKTooltip>
                      )}
                      <VKTooltip content="Редактировать задачу">
                        <VKButton variant="tertiary" size="s" onClick={() => onEdit?.(task.id)}>
                          Редактировать
                        </VKButton>
                      </VKTooltip>
                      <VKTooltip content="Удалить задачу">
                        <VKButton variant="tertiary" size="s" onClick={() => onDelete?.(task.id)}>
                          Удалить
                        </VKButton>
                      </VKTooltip>
                    </VKFlex>
                  </VKFlex>
                </VKAnimatedCard>
              </div>
            )
          })}
        </VKFlex>
      )}
    </VKGroup>
  )
}

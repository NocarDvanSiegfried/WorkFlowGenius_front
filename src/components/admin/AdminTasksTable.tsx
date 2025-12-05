import { VKCell, VKFlex, VKText, VKTitle, VKProgress, VKBadge, VKButton, VKAvatar, VKAnimatedCard, VKGroup } from '../vk'
import type { Task, TaskStatus } from '../../types/admin'

interface AdminTasksTableProps {
  tasks: Task[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const statusConfig: Record<
  TaskStatus,
  { variant: 'primary' | 'success' | 'error'; label: string }
> = {
  active: { variant: 'primary', label: 'Активна' },
  completed: { variant: 'success', label: 'Выполнена' },
  overdue: { variant: 'error', label: 'Просрочена' },
}

export function AdminTasksTable({ tasks, onEdit, onDelete }: AdminTasksTableProps) {
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
        <VKCell disabled>
          <VKFlex direction="column" align="center">
            <VKText size="base" color="secondary" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              Задачи не найдены
            </VKText>
          </VKFlex>
        </VKCell>
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
                  padding="none"
                  index={index}
                  animationType="fade-in"
                  data-vk-card-hover-admin
                  style={{ width: '100%', overflow: 'hidden', padding: 'var(--vk-spacing-6)' }}
                >
                    <VKFlex direction="row" align="start" style={{ width: '100%', gap: 'var(--vk-spacing-4)' }}>
                    <VKAvatar name={task.employee} size="m" />
                    <VKFlex direction="column" grow style={{ gap: 'var(--vk-spacing-3)' }}>
                      <VKFlex align="center" justify="between" style={{ gap: 'var(--vk-spacing-2)' }}>
                        <VKFlex align="center" style={{ gap: 'var(--vk-spacing-2)' }}>
                          <VKTitle level={5} weight="medium" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '16px', fontWeight: 600 }}>
                            {task.task}
                          </VKTitle>
                          <VKBadge variant={status.variant} size="s">
                            {status.label}
                          </VKBadge>
                        </VKFlex>
                      </VKFlex>
                      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)' }}>
                        <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {task.employeeEmail}
                        </VKText>
                        <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {task.date}
                        </VKText>
                      </VKFlex>
                      <VKFlex align="center" style={{ gap: 'var(--vk-spacing-2)' }}>
                        <VKProgress value={task.progress} max={task.maxProgress} size="s" variant="accent" />
                        <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {task.progress}/{task.maxProgress}
                        </VKText>
                      </VKFlex>
                    </VKFlex>
                    <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)' }}>
                      <VKButton variant="tertiary" size="s" onClick={() => onEdit?.(task.id)}>
                        Редактировать
                      </VKButton>
                      <VKButton variant="tertiary" size="s" onClick={() => onDelete?.(task.id)}>
                        Удалить
                      </VKButton>
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

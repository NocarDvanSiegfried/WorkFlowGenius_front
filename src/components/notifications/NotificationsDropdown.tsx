import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKText, VKButton, VKBadge, VKTitle, VKCard } from '../vk'
import { notificationsApi } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await notificationsApi.getNotifications({ limit: 10 })
      return response.data
    },
    refetchInterval: 30000, // Обновляем каждые 30 секунд
  })

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      return await notificationsApi.markAsRead(notificationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      return await notificationsApi.markAllAsRead()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const notifications = notificationsData?.data || []
  const unreadCount = notificationsData?.unread_count || 0

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsReadMutation.mutate(notification.id)
    }
    
    if (notification.related_task_id) {
      navigate(`/tasks`)
      setIsOpen(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned':
        return '📋'
      case 'deadline_approaching':
        return '⏰'
      case 'task_overdue':
        return '⚠️'
      case 'comment_added':
        return '💬'
      default:
        return '🔔'
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <VKButton
        variant="tertiary"
        size="s"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'relative' }}
      >
        🔔
        {unreadCount > 0 && (
          <VKBadge
            variant="error"
            size="s"
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '18px',
              height: '18px',
              fontSize: '10px',
              padding: '0 4px',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </VKBadge>
        )}
      </VKButton>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <VKCard
            variant="default"
            padding="m"
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 'var(--vk-spacing-2)',
              width: '360px',
              maxHeight: '500px',
              overflowY: 'auto',
              zIndex: 20,
              boxShadow: 'var(--vk-shadow-elevation-3)',
            }}
          >
            <VKFlex direction="column" gap="m">
              <VKFlex justify="between" align="center">
                <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
                  Уведомления
                </VKTitle>
                {unreadCount > 0 && (
                  <VKButton variant="tertiary" size="s" onClick={() => markAllAsReadMutation.mutate()}>
                    Отметить все прочитанными
                  </VKButton>
                )}
              </VKFlex>

              {notifications.length === 0 ? (
                <VKText size="sm" color="secondary" style={{ textAlign: 'center', padding: 'var(--vk-spacing-4)' }}>
                  Нет уведомлений
                </VKText>
              ) : (
                <VKFlex direction="column" gap="s">
                  {notifications.map((notification: any) => (
                    <VKCard
                      key={notification.id}
                      variant={notification.is_read ? 'outlined' : 'default'}
                      padding="s"
                      style={{
                        cursor: 'pointer',
                        backgroundColor: notification.is_read ? 'transparent' : 'var(--vk-color-accent-blue-alpha)',
                        borderLeft: `3px solid ${notification.is_read ? 'transparent' : 'var(--vk-color-accent-blue)'}`,
                      }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <VKFlex align="start" gap="s">
                        <VKText size="base" style={{ margin: 0, flexShrink: 0 }}>
                          {getNotificationIcon(notification.type)}
                        </VKText>
                        <VKFlex direction="column" grow gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                          <VKText size="sm" weight={notification.is_read ? 'regular' : 'medium'} style={{ margin: 0 }}>
                            {notification.title}
                          </VKText>
                          <VKText size="xs" color="secondary" style={{ margin: 0 }}>
                            {notification.message}
                          </VKText>
                          <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                            {notification.created_at ? new Date(notification.created_at).toLocaleString('ru-RU') : ''}
                          </VKText>
                        </VKFlex>
                      </VKFlex>
                    </VKCard>
                  ))}
                </VKFlex>
              )}
            </VKFlex>
          </VKCard>
        </>
      )}
    </div>
  )
}


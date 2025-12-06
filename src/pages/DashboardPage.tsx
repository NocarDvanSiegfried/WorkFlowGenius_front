import { useAuthStore } from '../store/authStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { getApiError } from '../utils/errors'
import { VKSectionHeader, VKGrid, VKSpacing, VKTitle, VKText, VKFlex, VKAnimatedCard } from '../components/vk'

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const { data: dashboardData, isPending, isError, error } = useQuery({
    queryKey: ['dashboard', user?.role],
    queryFn: async () => {
      if (!user) {
        throw new Error('Пользователь не авторизован')
      }
      const endpoint = user.role === 'manager' ? '/dashboard/manager' : '/dashboard/employee'
      const response = await api.get(endpoint)
      if (!response.data.success) {
        throw new Error(response.data.message || 'Ошибка загрузки данных')
      }
      return response.data.data
    },
    enabled: !!user,
    retry: 1,
  })

  if (isPending) {
    return (
      <VKSpacing size="m">
        <VKFlex direction="column" align="center" justify="center">
          <VKText size="base" color="secondary">
            Загрузка...
          </VKText>
        </VKFlex>
      </VKSpacing>
    )
  }

  if (isError && error) {
    const apiError = getApiError(error)
    return (
      <VKSpacing size="m">
        <VKFlex direction="column" align="center" justify="center">
          <VKText size="base" color="primary">
            Ошибка: {apiError.message}
          </VKText>
        </VKFlex>
      </VKSpacing>
    )
  }

  return (
    <>
      <VKSpacing size="l">
        <VKSectionHeader title="Дашборд" />
      </VKSpacing>

      {user && (
        <VKSpacing size="m">
          <VKAnimatedCard 
            mode="shadow" 
            padding="l" 
            index={0} 
            animationType="fade-in"
            data-vk-card-hover-main
            style={{
              transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            }}
          >
            <VKFlex direction="column" gap="m">
              <VKText 
                size="base" 
                color="primary"
                style={{
                  fontSize: 'var(--vk-font-size-lg)',
                  fontWeight: 'var(--vk-font-weight-medium)',
                }}
              >
                Привет, {user.name}!
              </VKText>
              <VKText 
                size="sm" 
                color="secondary"
                style={{
                  fontSize: 'var(--vk-font-size-sm)',
                }}
              >
                Роль: {user.role}
              </VKText>
            </VKFlex>
          </VKAnimatedCard>
        </VKSpacing>
      )}

      {dashboardData && (
        <VKSpacing size="l">
          <VKGrid columns={3} gap="l">
            {user?.role === 'manager' ? (
              <>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={0} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Всего задач
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.total || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={1} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      В работе
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.in_progress || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={2} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Завершено
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.completed || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
              </>
            ) : (
              <>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={0} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Мои задачи
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.total || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={1} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      В работе
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.in_progress || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard 
                  mode="shadow" 
                  padding="l" 
                  index={2} 
                  animationType="slide-up"
                  data-vk-card-hover-main
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  <VKFlex direction="column" gap="m">
                    <VKTitle 
                      level={5} 
                      weight="semibold"
                      style={{
                        fontSize: 'var(--vk-font-size-sm)',
                        fontWeight: 'var(--vk-font-weight-semibold)',
                        color: 'var(--vk-color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Завершено
                    </VKTitle>
                    <VKTitle 
                      level={4} 
                      weight="bold"
                      style={{
                        fontSize: 'var(--vk-font-size-3xl)',
                        fontWeight: 'var(--vk-font-weight-bold)',
                        color: 'var(--vk-color-text-primary)',
                        lineHeight: 'var(--vk-line-height-tight)',
                      }}
                    >
                      {dashboardData.tasks?.completed || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
              </>
            )}
          </VKGrid>
        </VKSpacing>
      )}
    </>
  )
}

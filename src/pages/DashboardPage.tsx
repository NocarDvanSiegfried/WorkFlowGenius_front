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
      <VKSpacing size="s">
        <VKSectionHeader title="Дашборд" />
      </VKSpacing>

      {user && (
        <VKSpacing size="s">
          <VKAnimatedCard mode="shadow" padding="m" index={0} animationType="fade-in">
            <VKFlex direction="column" gap="s">
              <VKText size="base" color="secondary">
                Привет, {user.name}!
              </VKText>
              <VKText size="sm" color="tertiary">
                Роль: {user.role}
              </VKText>
            </VKFlex>
          </VKAnimatedCard>
        </VKSpacing>
      )}

      {dashboardData && (
        <VKSpacing size="m">
          <VKGrid columns={3} gap="m">
            {user?.role === 'manager' ? (
              <>
                <VKAnimatedCard mode="shadow" padding="m" index={0} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      Всего задач
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
                      {dashboardData.tasks?.total || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={1} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      В работе
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
                      {dashboardData.tasks?.in_progress || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={2} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      Завершено
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
                      {dashboardData.tasks?.completed || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
              </>
            ) : (
              <>
                <VKAnimatedCard mode="shadow" padding="m" index={0} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      Мои задачи
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
                      {dashboardData.tasks?.total || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={1} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      В работе
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
                      {dashboardData.tasks?.in_progress || 0}
                    </VKTitle>
                  </VKFlex>
                </VKAnimatedCard>
                <VKAnimatedCard mode="shadow" padding="m" index={2} animationType="slide-up">
                  <VKFlex direction="column" gap="s">
                    <VKTitle level={5} weight="semibold">
                      Завершено
                    </VKTitle>
                    <VKTitle level={4} weight="bold">
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

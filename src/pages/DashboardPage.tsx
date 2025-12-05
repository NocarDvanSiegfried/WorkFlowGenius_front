import { useAuthStore } from '../store/authStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { getApiError } from '../utils/errors'
import { VKCard, VKSectionHeader } from '../components/vk'

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
      <div className="min-h-screen bg-vk-bg-secondary flex justify-center items-center animate-fade-in">
        <div className="text-vk-text-secondary">Загрузка...</div>
      </div>
    )
  }

  if (isError && error) {
    const apiError = getApiError(error)
    return (
      <div className="min-h-screen bg-vk-bg-secondary flex justify-center items-center animate-fade-in">
        <div className="text-vk-status-negative">Ошибка: {apiError.message}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vk-bg-secondary p-vk-8">
      <div className="max-w-vk-6xl mx-auto animate-fade-in">
        <VKSectionHeader title="Дашборд" className="mb-vk-6" />
        {user && (
          <VKCard variant="default" padding="m" className="mb-vk-6 animate-slide-in-from-bottom">
            <p className="text-vk-text-secondary">
              Привет, <span className="font-vk-semibold text-vk-text-primary">{user.name}</span>!
            </p>
            <p className="text-vk-sm text-vk-text-tertiary mt-vk-1">Роль: {user.role}</p>
          </VKCard>
        )}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-vk-6">
            {user?.role === 'manager' ? (
              <>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">Всего задач</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-accent-blue">{dashboardData.tasks?.total || 0}</p>
                </VKCard>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">В работе</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-status-warning">{dashboardData.tasks?.in_progress || 0}</p>
                </VKCard>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">Завершено</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-status-positive">{dashboardData.tasks?.completed || 0}</p>
                </VKCard>
              </>
            ) : (
              <>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">Мои задачи</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-accent-blue">{dashboardData.tasks?.total || 0}</p>
                </VKCard>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">В работе</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-status-warning">{dashboardData.tasks?.in_progress || 0}</p>
                </VKCard>
                <VKCard variant="default" padding="m" className="animate-fade-in">
                  <h3 className="text-vk-lg font-vk-semibold text-vk-text-primary mb-vk-2">Завершено</h3>
                  <p className="text-vk-3xl font-vk-bold text-vk-status-positive">{dashboardData.tasks?.completed || 0}</p>
                </VKCard>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


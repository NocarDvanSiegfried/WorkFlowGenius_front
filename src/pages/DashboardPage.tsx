import { useAuthStore } from '../store/authStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { getApiError } from '../utils/errors'

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
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    )
  }

  if (isError && error) {
    const apiError = getApiError(error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Ошибка: {apiError.message}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Дашборд
      </h1>
      {user && (
        <div className="mb-6">
          <p className="text-gray-600">
            Привет, <span className="font-semibold">{user.name}</span>!
          </p>
          <p className="text-sm text-gray-500">Роль: {user.role}</p>
        </div>
      )}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {user?.role === 'manager' ? (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего задач</h3>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.tasks?.total || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">В работе</h3>
                <p className="text-3xl font-bold text-yellow-600">{dashboardData.tasks?.in_progress || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Завершено</h3>
                <p className="text-3xl font-bold text-green-600">{dashboardData.tasks?.completed || 0}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Мои задачи</h3>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.tasks?.total || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">В работе</h3>
                <p className="text-3xl font-bold text-yellow-600">{dashboardData.tasks?.in_progress || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Завершено</h3>
                <p className="text-3xl font-bold text-green-600">{dashboardData.tasks?.completed || 0}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}


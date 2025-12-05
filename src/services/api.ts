import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { authStore } from '../store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStore.getState().token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authStore.getState().logout()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export { api }

// API функции для команды
export const teamApi = {
  getTeam: () => api.get('/team'),
  getTeamMember: (userId: number) => api.get(`/team/${userId}`),
  getUserCompetencies: (userId: number) => api.get(`/team/${userId}/competencies`),
  addCompetency: (userId: number, data: { skill_name: string; experience_years?: number; level?: string }) =>
    api.post(`/team/${userId}/competencies`, data),
  deleteCompetency: (userId: number, competencyId: number) =>
    api.delete(`/team/${userId}/competencies/${competencyId}`),
}

// API функции для командного ДНК
export const teamDnaApi = {
  getStats: () => api.get('/team-dna/stats'),
  getConnections: () => api.get('/team-dna/connections'),
  getUserConnections: (userId: number) => api.get(`/team-dna/connections/${userId}`),
  getHiddenExperts: () => api.get('/team-dna/hidden-experts'),
  getDreamTeams: (minSynergy?: number) => api.get('/team-dna/dream-teams', { params: { min_synergy: minSynergy } }),
  calculateSynergy: (teamUserIds: number[]) => api.post('/team-dna/synergy', { team_user_ids: teamUserIds }),
}

// API функции для настроек ИИ
export const aiSettingsApi = {
  getSettings: () => api.get('/ai-settings'),
  updateSettings: (data: Record<string, any>) => api.put('/ai-settings', data),
}

// API функции для аналитики
export const analyticsApi = {
  getTeamAnalytics: (days?: number) => api.get('/analytics/team', { params: { days } }),
  getEmployeeAnalytics: (employeeId: number, days?: number) =>
    api.get(`/analytics/employee/${employeeId}`, { params: { days } }),
  getModelMetrics: () => api.get('/analytics/model'),
}

// API функции для рекомендаций ИИ
export const aiRecommendationsApi = {
  getRecommendations: () => api.get('/ai-recommendations'),
  applyRecommendation: (recommendationId: string, actionData?: any) =>
    api.post(`/ai-recommendations/${recommendationId}/apply`, actionData),
}

// API функции для dashboard
export const dashboardApi = {
  getManagerDashboard: () => api.get('/dashboard/manager'),
  getEmployeeDashboard: () => api.get('/dashboard/employee'),
}

// API функции для задач
export const tasksApi = {
  getTasks: (searchQuery?: string, statusFilter?: string, params?: { status?: string; assigned_to?: number; search?: string }) => {
    const queryParams: any = { ...params }
    if (searchQuery) queryParams.search = searchQuery
    if (statusFilter && statusFilter !== 'all') queryParams.status = statusFilter
    return api.get('/tasks', { params: queryParams })
  },
  getTask: (taskId: number) => api.get(`/tasks/${taskId}`),
  createTask: (data: any) => api.post('/tasks', data),
  updateTask: (taskId: number, data: any) => api.put(`/tasks/${taskId}`, data),
  deleteTask: (taskId: number) => api.delete(`/tasks/${taskId}`),
  assignTask: (taskId: number) => api.post(`/tasks/${taskId}/assign`),
  updateTaskStatus: (taskId: number, status: string) => api.put(`/tasks/${taskId}/status`, { status }),
}

// API функции для комментариев к задачам
export const taskCommentsApi = {
  getComments: (taskId: number) => api.get(`/tasks/${taskId}/comments`),
  createComment: (taskId: number, data: { content: string }) => api.post(`/tasks/${taskId}/comments`, data),
  updateComment: (commentId: number, data: { content: string }) => api.put(`/comments/${commentId}`, data),
  deleteComment: (commentId: number) => api.delete(`/comments/${commentId}`),
}

// API функции для уведомлений
export const notificationsApi = {
  getNotifications: (params?: { is_read?: boolean; limit?: number }) => api.get('/notifications', { params }),
  markAsRead: (notificationId: number) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (notificationId: number) => api.delete(`/notifications/${notificationId}`),
}

// API функции для истории задач
export const taskHistoryApi = {
  getHistory: (taskId: number, limit?: number) => api.get(`/tasks/${taskId}/history`, { params: { limit } }),
}

// API функции для тегов задач
export const taskTagsApi = {
  getTags: (taskId: number) => api.get(`/tasks/${taskId}/tags`),
  addTag: (taskId: number, data: { tag_name: string; color?: string }) => api.post(`/tasks/${taskId}/tags`, data),
  deleteTag: (taskId: number, tagId: number) => api.delete(`/tasks/${taskId}/tags/${tagId}`),
}

// API функции для отслеживания времени
export const timeTrackingApi = {
  getTimeTracking: (taskId: number) => api.get(`/tasks/${taskId}/time-tracking`),
  startTracking: (taskId: number) => api.post(`/tasks/${taskId}/time-tracking/start`),
  stopTracking: (taskId: number) => api.post(`/tasks/${taskId}/time-tracking/stop`),
  updateEntry: (entryId: number, data: any) => api.put(`/time-tracking/${entryId}`, data),
  deleteEntry: (entryId: number) => api.delete(`/time-tracking/${entryId}`),
}


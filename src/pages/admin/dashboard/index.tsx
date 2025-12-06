import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKGrid, VKFlex, VKSpacing } from '../../../components/vk'
import { AdminLayout, AdminStatCard, AdminTasksTable, AdminSidebar, ToastNotification } from '../../../components/admin'
import type { Task, EmployeeLoad, AdminStats, AdminTab } from '../../../types/admin'
import { dashboardApi, tasksApi } from '../../../services/api'
import type { ToastType } from '../../../components/admin/ToastNotification'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [toast, setToast] = useState<{ id: string; message: string; type: ToastType; duration?: number } | null>(null)

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard-manager'],
    queryFn: async () => {
      const response = await dashboardApi.getManagerDashboard()
      return response.data.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return await tasksApi.deleteTask(Number(taskId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
      setToast({ id: Date.now().toString(), message: 'Задача успешно удалена', type: 'success' })
    },
    onError: (error: any) => {
      console.error('Ошибка удаления задачи:', error)
      setToast({
        id: Date.now().toString(),
        message: error.response?.data?.message || 'Не удалось удалить задачу',
        type: 'error',
      })
    },
  })

  const assignMutation = useMutation({
    mutationFn: async (taskId: number) => {
      return await tasksApi.assignTask(taskId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
      setToast({ id: Date.now().toString(), message: 'Задача успешно назначена', type: 'success' })
    },
    onError: (error: any) => {
      console.error('Ошибка назначения задачи:', error)
      setToast({
        id: Date.now().toString(),
        message: error.response?.data?.message || 'Не удалось назначить задачу',
        type: 'error',
      })
    },
  })

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  const handleEdit = (id: string) => {
    navigate(`/admin/tasks?edit=${id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleAssign = (id: string) => {
    assignMutation.mutate(Number(id))
  }

  const stats: AdminStats = dashboardData?.stats || {
    total: 0,
    active: 0,
    overdue: 0,
    completed: 0,
  }

  const tasks: Task[] = (dashboardData?.tasks || []).map((task: any) => ({
    id: String(task.id),
    employee: task.employee || '-',
    employeeEmail: task.employeeEmail || '-',
    task: task.title || '-',
    date: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '-',
    progress: task.progress || 0,
    maxProgress: task.maxProgress || 0,
    status: task.status === 'completed' ? 'completed' : task.status === 'assigned' || task.status === 'in_progress' ? 'active' : 'overdue',
  }))

  const employeeLoads: EmployeeLoad[] = dashboardData?.employeeLoads || []

  if (isLoading) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
        <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
          <div>Загрузка...</div>
        </VKFlex>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
        <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
          <div>Ошибка загрузки данных</div>
        </VKFlex>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKSpacing size="l">
        <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Stats cards - выровнены в одну строку с правильными отступами */}
          <VKGrid columns={4} style={{ width: '100%', gap: 'var(--vk-spacing-6)' }}>
            <AdminStatCard label="Всего задач" value={stats.total} index={0} />
            <AdminStatCard label="Активных" value={stats.active} index={1} />
            <AdminStatCard label="Просроченных" value={stats.overdue} index={2} />
            <AdminStatCard label="Выполнено" value={stats.completed} index={3} />
          </VKGrid>

          {/* Main content: Двухколоночный макет - слева задачи, справа загрузка + аналитика */}
          <VKGrid
            columns={2}
            style={{
              gridTemplateColumns: '1fr 420px',
              alignItems: 'start',
              width: '100%',
              gap: 'var(--vk-spacing-8)',
            }}
            data-vk-admin-grid
          >
            {/* Left: Tasks table */}
            <VKFlex direction="column" grow style={{ minWidth: 0, maxWidth: '100%', width: '100%' }}>
              <AdminTasksTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onAssign={handleAssign} />
            </VKFlex>
            
            {/* Right: Employee load + AI analytics */}
            <VKFlex 
              direction="column" 
              style={{ 
                width: '100%',
                maxWidth: '420px',
                flexShrink: 0,
                gap: 'var(--vk-spacing-8)',
              }}
            >
              <AdminSidebar
                employeeLoads={employeeLoads}
                aiAnalysis={dashboardData?.aiAnalysis || { recommendations: 0, applied: 0 }}
              />
            </VKFlex>
          </VKGrid>
        </VKFlex>
      </VKSpacing>
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </AdminLayout>
  )
}

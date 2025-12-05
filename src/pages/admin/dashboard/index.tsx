import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { VKGrid, VKFlex } from '../../../components/vk'
import { AdminLayout, AdminStatCard, AdminTasksTable, AdminSidebar } from '../../../components/admin'
import type { Task, EmployeeLoad, AdminStats, AdminTab } from '../../../types/admin'
import { dashboardApi } from '../../../services/api'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard-manager'],
    queryFn: async () => {
      const response = await dashboardApi.getManagerDashboard()
      return response.data.data
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
      <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)' }}>
        {/* Stats cards - выровнены в одну строку, увеличенные отступы */}
        <VKGrid columns={4} style={{ width: '100%', gap: 'var(--vk-spacing-8)', rowGap: 'var(--vk-spacing-8)', columnGap: 'var(--vk-spacing-8)' }}>
          <AdminStatCard label="Всего задач" value={stats.total} index={0} />
          <AdminStatCard label="Активных" value={stats.active} index={1} />
          <AdminStatCard label="Просроченных" value={stats.overdue} index={2} />
          <AdminStatCard label="Выполнено" value={stats.completed} index={3} />
        </VKGrid>

        {/* Main content: Двухколоночный макет - слева задачи, справа загрузка + аналитика */}
        <VKGrid
          columns={2}
          style={{
            gridTemplateColumns: '1fr 400px',
            alignItems: 'start',
            width: '100%',
            gap: 'var(--vk-spacing-8)',
            rowGap: 'var(--vk-spacing-8)',
            columnGap: 'var(--vk-spacing-8)',
          }}
          data-vk-admin-grid
        >
          {/* Left: Tasks table - придерживается общей сетки, единая высота карточек */}
          <VKFlex direction="column" grow style={{ minWidth: 0, maxWidth: '100%', width: '100%' }}>
            <AdminTasksTable tasks={tasks} />
          </VKFlex>
          
          {/* Right: Employee load + AI analytics - выровнены, одинаковой высоты */}
          <VKFlex 
            direction="column" 
            style={{ 
              width: '400px', 
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
    </AdminLayout>
  )
}

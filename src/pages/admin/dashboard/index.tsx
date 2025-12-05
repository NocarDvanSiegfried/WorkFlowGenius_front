import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VKGrid, VKFlex } from '../../../components/vk'
import { AdminLayout, AdminStatCard, AdminTasksTable, AdminSidebar } from '../../../components/admin'
import type { Task, EmployeeLoad, AdminStats, AdminTab } from '../../../types/admin'

const mockTasks: Task[] = [
  {
    id: '1',
    employee: 'Иван Иванов',
    employeeEmail: 'ivan@example.com',
    task: 'Разработать API для задач',
    date: '2025-01-15',
    progress: 8,
    maxProgress: 12,
    status: 'active',
  },
  {
    id: '2',
    employee: 'Мария Петрова',
    employeeEmail: 'maria@example.com',
    task: 'Создать дизайн интерфейса',
    date: '2025-01-14',
    progress: 9,
    maxProgress: 10,
    status: 'completed',
  },
  {
    id: '3',
    employee: 'Алексей Сидоров',
    employeeEmail: 'alex@example.com',
    task: 'Провести тестирование',
    date: '2025-01-10',
    progress: 5,
    maxProgress: 10,
    status: 'overdue',
  },
]

const mockEmployeeLoads: EmployeeLoad[] = [
  { name: 'Иван Иванов', load: 8, maxLoad: 12 },
  { name: 'Мария Петрова', load: 9, maxLoad: 10 },
  { name: 'Алексей Сидоров', load: 5, maxLoad: 10 },
  { name: 'Елена Козлова', load: 6, maxLoad: 8 },
  { name: 'Дмитрий Волков', load: 11, maxLoad: 14 },
]

const stats: AdminStats = {
  total: 59,
  active: 34,
  overdue: 5,
  completed: 46,
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'tasks') navigate('/admin/tasks')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'analytics') navigate('/admin/analytics')
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
            <AdminTasksTable tasks={mockTasks} />
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
              employeeLoads={mockEmployeeLoads}
              aiAnalysis={{ recommendations: 12, applied: 8 }}
            />
          </VKFlex>
        </VKGrid>
      </VKFlex>
    </AdminLayout>
  )
}

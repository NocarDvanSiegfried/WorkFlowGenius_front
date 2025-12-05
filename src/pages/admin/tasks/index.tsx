import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VKFlex } from '../../../components/vk'
import { AdminLayout, AdminTasksTable } from '../../../components/admin'
import type { Task, AdminTab } from '../../../types/admin'

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
]

export function AdminTasksPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('tasks')

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'analytics') navigate('/admin/analytics')
  }

  const handleEdit = (_id: string) => {
    // TODO: Implement edit task functionality
  }

  const handleDelete = (_id: string) => {
    // TODO: Implement delete task functionality
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <VKFlex direction="column" gap="l">
        <AdminTasksTable tasks={mockTasks} onEdit={handleEdit} onDelete={handleDelete} />
      </VKFlex>
    </AdminLayout>
  )
}

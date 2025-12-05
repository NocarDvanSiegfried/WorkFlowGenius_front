import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKButton, VKInput, VKSelect, VKCard } from '../../../components/vk'
import { AdminLayout, AdminTasksTable, AddTaskModal, EditTaskModal } from '../../../components/admin'
import { ToastNotification } from '../../../components/admin/ToastNotification'
import type { Task, AdminTab } from '../../../types/admin'
import { tasksApi } from '../../../services/api'
import type { ToastType } from '../../../components/admin/ToastNotification'

export function AdminTasksPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<AdminTab>('tasks')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [toast, setToast] = useState<{ id: string; message: string; type: ToastType; duration?: number } | null>(null)

  const { data: tasksData, isLoading, error } = useQuery({
    queryKey: ['tasks', searchQuery, statusFilter],
    queryFn: async () => {
      const response = await tasksApi.getTasks(searchQuery, statusFilter === 'all' ? undefined : statusFilter)
      return response.data.data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await tasksApi.createTask(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
      setIsAddModalOpen(false)
      setToast({ id: Date.now().toString(), message: 'Задача успешно создана', type: 'success' })
    },
    onError: (error: any) => {
      console.error('Ошибка создания задачи:', error)
      setToast({
        id: Date.now().toString(),
        message: error.response?.data?.message || 'Не удалось создать задачу',
        type: 'error',
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ taskId, data }: { taskId: number; data: any }) => {
      return await tasksApi.updateTask(taskId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', selectedTaskId] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-manager'] })
      setIsEditModalOpen(false)
      setSelectedTaskId(undefined)
      setToast({ id: Date.now().toString(), message: 'Задача успешно обновлена', type: 'success' })
    },
    onError: (error: any) => {
      console.error('Ошибка обновления задачи:', error)
      setToast({
        id: Date.now().toString(),
        message: error.response?.data?.message || 'Не удалось обновить задачу',
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

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    if (tab === 'dashboard') navigate('/admin/dashboard')
    if (tab === 'team') navigate('/admin/team')
    if (tab === 'ai') navigate('/admin/ai')
    if (tab === 'ai-settings') navigate('/admin/ai-settings')
    if (tab === 'analytics') navigate('/admin/analytics')
    if (tab === 'team-dna') navigate('/admin/team-dna')
  }

  const handleEdit = (id: string) => {
    setSelectedTaskId(id)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCreateTask = (data: any) => {
    createMutation.mutate(data)
  }

  const handleUpdateTask = (data: any) => {
    if (selectedTaskId) {
      updateMutation.mutate({ taskId: Number(selectedTaskId), data })
    }
  }

  const handleAssignTask = (taskId: string) => {
    assignMutation.mutate(Number(taskId))
  }

  const filteredTasks = useMemo(() => {
    if (!tasksData) return []
    
    let filtered = tasksData
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((task: any) => {
        const title = task.title?.toLowerCase() || ''
        const description = task.description?.toLowerCase() || ''
        const employee = task.assignments?.[0]?.assigned_to_user?.name?.toLowerCase() || ''
        return title.includes(query) || description.includes(query) || employee.includes(query)
      })
    }
    
    return filtered
  }, [tasksData, searchQuery])

  const tasks: Task[] = filteredTasks.map((task: any) => {
    const assignment = task.assignments?.[0]
    const user = assignment?.assigned_to_user
    
    // Определяем статус для отображения
    let displayStatus: 'active' | 'completed' | 'overdue' = 'active'
    if (task.status === 'completed') {
      displayStatus = 'completed'
    } else if (task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed') {
      displayStatus = 'overdue'
    }
    
    return {
      id: String(task.id),
      employee: user?.name || '-',
      employeeEmail: user?.email || '-',
      task: task.title || '-',
      date: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '-',
      progress: assignment?.workload_points || 0,
      maxProgress: user?.max_workload || 0,
      status: displayStatus,
    }
  })

  const statusFilterOptions = [
    { value: 'all', label: 'Все задачи' },
    { value: 'pending', label: 'Ожидают' },
    { value: 'assigned', label: 'Назначены' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Выполнены' },
    { value: 'cancelled', label: 'Отменены' },
  ]

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
      <VKFlex direction="column" gap="l">
        {/* Панель управления: поиск, фильтры и кнопка создания */}
        <VKCard variant="default" padding="m">
          <VKFlex direction="column" gap="m">
            <VKFlex align="center" gap="m" style={{ flexWrap: 'wrap' }}>
              <VKInput
                type="text"
                placeholder="Поиск задач..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: '1', minWidth: '200px' }}
              />
              <VKSelect
                options={statusFilterOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ minWidth: '150px' }}
              />
              <VKButton variant="primary" onClick={() => setIsAddModalOpen(true)}>
                Создать задачу
              </VKButton>
            </VKFlex>
          </VKFlex>
        </VKCard>

        <AdminTasksTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onAssign={handleAssignTask} />

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateTask}
        />

        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedTaskId(undefined)
          }}
          taskId={selectedTaskId}
          onSubmit={handleUpdateTask}
        />

        <ToastNotification toast={toast} onClose={() => setToast(null)} />
      </VKFlex>
    </AdminLayout>
  )
}

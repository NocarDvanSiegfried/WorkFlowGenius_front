import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKButton, VKInput, VKSelect, VKSpacing, VKTitle, VKAnimatedCard } from '../../../components/vk'
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
      const params: any = {}
      if (searchQuery) params.search = searchQuery
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter
      const response = await tasksApi.getTasks(params)
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
      <VKSpacing size="l">
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-10)', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Панель управления: поиск, фильтры и кнопка создания */}
          <VKFlex justify="between" align="center" style={{ gap: 'var(--vk-spacing-6)', flexWrap: 'wrap' }}>
            <VKTitle
              level={2}
              weight="bold"
              style={{
                margin: 0,
                lineHeight: 'var(--vk-line-height-tight)',
                fontSize: 'var(--vk-font-size-2xl)',
                fontWeight: 'var(--vk-font-weight-bold)',
                color: 'var(--vk-color-text-primary)',
              }}
            >
              Управление задачами
            </VKTitle>
            <VKButton 
              variant="primary" 
              size="l" 
              onClick={() => setIsAddModalOpen(true)}
              style={{
                transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
              }}
            >
              Создать задачу
            </VKButton>
          </VKFlex>

          <VKAnimatedCard
            mode="shadow"
            padding="l"
            index={0}
            animationType="fade-in"
            data-vk-card-hover-main
            style={{
              border: '1px solid var(--vk-color-border-secondary)',
              borderRadius: 'var(--vk-radius-lg)',
              transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            }}
          >
            <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)' }}>
              <VKFlex align="center" style={{ gap: 'var(--vk-spacing-6)', flexWrap: 'wrap' }}>
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
              </VKFlex>
            </VKFlex>
          </VKAnimatedCard>

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
      </VKSpacing>
    </AdminLayout>
  )
}

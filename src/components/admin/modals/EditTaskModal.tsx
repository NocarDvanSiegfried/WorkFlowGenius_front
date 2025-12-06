import { useState, useEffect } from 'react'
import { VKFlex, VKFormItem, VKInput, VKSelect, VKButton, VKSeparator, VKSpacing, VKText } from '../../vk'
import { VKModal } from '../../vk/VKModal'
import { VKDatePicker } from '../../vk/VKDatePicker'
import { useQuery } from '@tanstack/react-query'
import { tasksApi } from '../../../services/api'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskId?: string
  onSubmit?: (data: { title?: string; description?: string; priority?: string; deadline?: string; estimated_hours?: number; status?: string }) => void
}

export function EditTaskModal({ isOpen, onClose, taskId, onSubmit }: EditTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('pending')
  const [deadline, setDeadline] = useState('')
  const [estimatedHours, setEstimatedHours] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [_isLoading, _setIsLoading] = useState(false)

  const { data: taskData, isLoading: isLoadingTask } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      if (!taskId) return null
      const response = await tasksApi.getTask(Number(taskId))
      return response.data.data
    },
    enabled: isOpen && !!taskId,
  })

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || '')
      setDescription(taskData.description || '')
      setPriority(taskData.priority || 'medium')
      setStatus(taskData.status || 'pending')
      setDeadline(taskData.deadline ? new Date(taskData.deadline).toISOString().slice(0, 16) : '')
      setEstimatedHours(taskData.estimated_hours ? String(taskData.estimated_hours) : '')
    }
  }, [taskData])

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setStatus('pending')
      setDeadline('')
      setEstimatedHours('')
      setErrors({})
    }
  }, [isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!title.trim()) {
      newErrors.title = 'Название задачи обязательно'
    }
    
    if (deadline) {
      const deadlineDate = new Date(deadline)
      if (deadlineDate < new Date()) {
        newErrors.deadline = 'Срок выполнения не может быть в прошлом'
      }
    }
    
    if (estimatedHours) {
      const hours = Number(estimatedHours)
      if (isNaN(hours) || hours <= 0) {
        newErrors.estimatedHours = 'Количество часов должно быть положительным числом'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }

    onSubmit?.({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      deadline: deadline || undefined,
      estimated_hours: estimatedHours ? Number(estimatedHours) : undefined,
    })
    
    onClose()
  }

  const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
    { value: 'urgent', label: 'Срочный' },
  ]

  const statusOptions = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'assigned', label: 'Назначена' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Выполнена' },
    { value: 'cancelled', label: 'Отменена' },
  ]

  if (isLoadingTask) {
    return (
      <VKModal isOpen={isOpen} onClose={onClose} title="Редактировать задачу" size="m">
        <VKFlex justify="center" align="center" style={{ padding: 'var(--vk-spacing-8)' }}>
          <VKText size="base" color="secondary">Загрузка...</VKText>
        </VKFlex>
      </VKModal>
    )
  }

  return (
    <VKModal isOpen={isOpen} onClose={onClose} title="Редактировать задачу" size="m">
      <VKFlex direction="column" gap="m">
        <VKFormItem label="Название задачи" required>
          <VKInput
            type="text"
            placeholder="Введите название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <VKText size="sm" color="danger" style={{ marginTop: 'var(--vk-spacing-2)' }}>{errors.title}</VKText>}
        </VKFormItem>
        
        <VKFormItem label="Описание">
          <VKInput
            type="text"
            placeholder="Введите описание задачи (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </VKFormItem>
        
        <VKFormItem label="Приоритет" required>
          <VKSelect
            options={priorityOptions}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </VKFormItem>
        
        <VKFormItem label="Статус" required>
          <VKSelect
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </VKFormItem>
        
        <VKFormItem label="Срок выполнения">
          <VKDatePicker
            value={deadline}
            onChange={(value) => setDeadline(value)}
            error={!!errors.deadline}
            helperText={errors.deadline}
          />
        </VKFormItem>
        
        <VKFormItem label="Оценка времени (часы)">
          <VKInput
            type="number"
            placeholder="Оценка времени в часах"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(e.target.value)}
            min="0"
            step="0.5"
          />
          {errors.estimatedHours && <VKText size="sm" color="danger" style={{ marginTop: 'var(--vk-spacing-2)' }}>{errors.estimatedHours}</VKText>}
        </VKFormItem>
        
        <VKSeparator wide />
        <VKSpacing size="s">
          <VKFlex justify="end" gap="s">
            <VKButton variant="secondary" onClick={onClose}>
              Отмена
            </VKButton>
            <VKButton variant="primary" onClick={handleSubmit} disabled={isLoadingTask}>
              Сохранить изменения
            </VKButton>
          </VKFlex>
        </VKSpacing>
      </VKFlex>
    </VKModal>
  )
}


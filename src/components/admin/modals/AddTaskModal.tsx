import { useState, useEffect } from 'react'
import { VKModal, VKFlex, VKFormItem, VKInput, VKSelect, VKButton, VKSeparator, VKSpacing, VKText, VKDatePicker } from '../../vk'
import { useQuery } from '@tanstack/react-query'
import { teamApi } from '../../../services/api'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: { title: string; description?: string; priority: string; deadline?: string; estimated_hours?: number }) => void
}

export function AddTaskModal({ isOpen, onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [deadline, setDeadline] = useState('')
  const [estimatedHours, setEstimatedHours] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: _teamData } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await teamApi.getTeam()
      return response.data.data
    },
    enabled: isOpen,
  })

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setDescription('')
      setPriority('medium')
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

  return (
    <VKModal isOpen={isOpen} onClose={onClose} title="Добавить задачу" size="m">
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
        
        <VKFormItem label="Срок выполнения">
          <VKDatePicker
            value={deadline}
            onChange={(value) => setDeadline(value)}
            min={new Date().toISOString().split('T')[0]}
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
            <VKButton variant="primary" onClick={handleSubmit}>
              Создать задачу
            </VKButton>
          </VKFlex>
        </VKSpacing>
      </VKFlex>
    </VKModal>
  )
}




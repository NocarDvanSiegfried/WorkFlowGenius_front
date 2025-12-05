import { VKModal, VKFlex, VKFormItem, VKInput, VKSelect, VKButton, VKSeparator, VKSpacing } from '../../vk'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskId?: string
  employees: Array<{ value: string; label: string }>
  onSubmit?: (data: { task: string; employee: string; date: string }) => void
}

export function EditTaskModal({ isOpen, onClose, employees, onSubmit }: EditTaskModalProps) {
  const handleSubmit = () => {
    onSubmit?.({ task: '', employee: '', date: '' })
    onClose()
  }

  return (
    <VKModal isOpen={isOpen} onClose={onClose} title="Редактировать задачу" size="m">
      <VKFlex direction="column" gap="m">
        <VKFormItem label="Задача" required>
          <VKInput type="text" placeholder="Введите название задачи" />
        </VKFormItem>
        <VKFormItem label="Исполнитель" required>
          <VKSelect options={employees} placeholder="Выберите сотрудника" />
        </VKFormItem>
        <VKFormItem label="Срок выполнения" required>
          <VKInput type="date" />
        </VKFormItem>
        <VKSeparator wide />
        <VKSpacing size="s">
          <VKFlex justify="end" gap="s">
            <VKButton variant="secondary" onClick={onClose}>
              Отмена
            </VKButton>
            <VKButton variant="primary" onClick={handleSubmit}>
              Сохранить
            </VKButton>
          </VKFlex>
        </VKSpacing>
      </VKFlex>
    </VKModal>
  )
}


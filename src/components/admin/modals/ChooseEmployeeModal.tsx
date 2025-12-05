import { VKModal, VKFlex, VKFormItem, VKSelect, VKButton, VKSeparator, VKSpacing, VKText } from '../../vk'

interface ChooseEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employees: Array<{ value: string; label: string }>
  onSubmit?: (employeeId: string) => void
}

export function ChooseEmployeeModal({ isOpen, onClose, employees, onSubmit }: ChooseEmployeeModalProps) {
  const handleSubmit = () => {
    onSubmit?.('')
    onClose()
  }

  return (
    <VKModal isOpen={isOpen} onClose={onClose} title="Выбрать сотрудника" size="m">
      <VKFlex direction="column" gap="m">
        <VKText size="base" color="secondary">
          Выберите сотрудника для назначения задачи
        </VKText>
        <VKFormItem label="Сотрудник" required>
          <VKSelect options={employees} placeholder="Выберите сотрудника" />
        </VKFormItem>
        <VKSeparator wide />
        <VKSpacing size="s">
          <VKFlex justify="end" gap="s">
            <VKButton variant="secondary" onClick={onClose}>
              Отмена
            </VKButton>
            <VKButton variant="primary" onClick={handleSubmit}>
              Выбрать
            </VKButton>
          </VKFlex>
        </VKSpacing>
      </VKFlex>
    </VKModal>
  )
}




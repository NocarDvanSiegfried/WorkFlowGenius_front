import { VKModal } from './VKModal'
import { VKButton } from './VKButton'

interface VKDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function VKDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
}: VKDialogProps) {
  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  return (
    <VKModal isOpen={isOpen} onClose={onClose} title={title} size="s">
      <div className="space-y-vk-4">
        <p className="text-vk-base text-vk-text-secondary">{message}</p>
        <div className="flex items-center justify-end gap-vk-2">
          <VKButton variant="secondary" onClick={handleCancel}>
            {cancelText}
          </VKButton>
          <VKButton variant="primary" onClick={handleConfirm}>
            {confirmText}
          </VKButton>
        </div>
      </div>
    </VKModal>
  )
}


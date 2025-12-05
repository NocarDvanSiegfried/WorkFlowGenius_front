import { VKInput, VKCard } from '../vk'

export function SearchPanel() {
  return (
    <VKCard variant="default" padding="m" style={{ width: '100%' }}>
      <VKInput
        type="text"
        placeholder="Поиск задач..."
        style={{ width: '100%' }}
      />
    </VKCard>
  )
}

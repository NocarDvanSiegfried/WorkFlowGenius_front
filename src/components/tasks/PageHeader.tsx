import { VKSectionHeader, VKCard } from '../vk'

export function PageHeader() {
  const userName = 'Иван Иванов'

  return (
    <VKCard variant="default" padding="m" style={{ width: '100%' }}>
      <VKSectionHeader
        title="Мои задачи"
        subtitle={`Привет, ${userName}! Вот твой обзор задач на сегодня.`}
      />
    </VKCard>
  )
}

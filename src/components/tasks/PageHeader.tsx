import { VKSectionHeader } from '../vk'

export function PageHeader() {
  const userName = 'Иван Иванов'

  return (
    <VKSectionHeader
      title="Мои задачи"
      subtitle={`Привет, ${userName}! Вот твой обзор задач на сегодня.`}
    />
  )
}


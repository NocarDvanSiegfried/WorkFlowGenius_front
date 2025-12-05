import { Link } from 'react-router-dom'
import { VKButton, VKSectionHeader } from '../components/vk'

export function HomePage() {
  return (
    <div className="min-h-screen bg-vk-bg-secondary flex items-center justify-center p-vk-4">
      <div className="max-w-vk-4xl mx-auto text-center animate-fade-in">
        <VKSectionHeader
          title="WorkFlowGenius"
          subtitle="Интеллектуальная система для автоматического распределения задач"
          className="mb-vk-8"
        />
        <div className="flex gap-vk-4 justify-center animate-scale-in">
          <Link to="/login">
            <VKButton variant="primary" size="l">
              Войти
            </VKButton>
          </Link>
          <Link to="/dashboard">
            <VKButton variant="secondary" size="l">
              Дашборд
            </VKButton>
          </Link>
        </div>
      </div>
    </div>
  )
}


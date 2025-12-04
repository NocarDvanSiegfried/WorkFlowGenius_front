import { Link } from 'react-router-dom'
import { VKButton } from './vk'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center w-full pt-vk-20 pb-vk-12 animate-fade-in">
      <div className="flex flex-col items-center text-center max-w-[850px] px-vk-4">
        <h2 className="text-vk-text-primary font-vk-bold text-vk-4xl leading-tight animate-slide-in-from-bottom">
          WorkFlowGenius
        </h2>
        <h3 className="text-vk-text-secondary font-vk-regular text-vk-2xl leading-normal mt-vk-3 animate-slide-in-from-bottom">
          Интеллектуальная система управления задачами
        </h3>
        <p className="text-vk-text-secondary font-vk-regular text-vk-lg leading-normal max-w-[650px] mt-vk-4 animate-fade-in">
          Автоматическое распределение задач с учётом навыков, загрузки и приоритетов. Умные уведомления и аналитика для эффективной работы команды.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-vk-6 mt-vk-8 animate-scale-in">
          <Link to="/login">
            <VKButton variant="primary" size="l" className="w-full sm:w-[296px]">
              Начать работу
            </VKButton>
          </Link>
          <VKButton variant="outline" size="l" className="w-full sm:w-[341px]">
            Посмотреть демо
          </VKButton>
        </div>
      </div>
    </section>
  )
}

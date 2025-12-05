import { Link } from 'react-router-dom'
import { VKButton, VKSectionHeader, VKCard } from '../components/vk'
import { FeatureCardSmall, FeatureCardLarge } from '../components/cards'
import { ClockIcon, TrendingUpIcon, DollarSignIcon } from '../components/icons'

export function MainMenuPage() {
  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full">
      <main className="w-full pb-vk-20">
        <div className="w-full flex flex-col">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-vk-1360 mx-auto pt-vk-20 pb-vk-16 px-vk-4 gap-vk-12 animate-fade-in">
            <div className="flex flex-col flex-1 max-w-vk-60 w-full lg:w-auto">
              <h2 className="text-vk-text-primary font-vk-bold text-vk-l leading-tight mb-vk-6 animate-slide-in-from-bottom">
                VK TaskFlow для умного распределения задач
              </h2>
              <p className="text-vk-text-secondary font-vk-regular text-vk-m leading-relaxed mb-vk-8 animate-fade-in">
                Используйте возможности ИИ для оптимизации рабочего процесса: учитывайте загрузку сотрудников, их предпочтения и компетенции. Это идеальное дополнение к VK WorkSpace, которое сделает вашу работу более эффективной и слаженной
              </p>
              <div className="animate-scale-in">
                <Link to="/login">
                  <VKButton variant="primary" size="l">
                    Начать работу
                  </VKButton>
                </Link>
              </div>
            </div>
            <VKCard variant="elevated" className="flex-1 max-w-vk-60 w-full lg:w-auto h-vk-75 lg:h-vk-100 rounded-vk-xl shadow-vk-2 flex items-center justify-center bg-gradient-to-br from-vk-accent-blue-alpha to-vk-bg-secondary animate-fade-in">
              <div className="text-vk-text-tertiary font-vk-regular text-vk-base">Иллюстрация</div>
            </VKCard>
          </section>

          {/* Benefits Section */}
          <section className="mt-vk-20">
            <div className="max-w-vk-1360 mx-auto px-vk-4">
              <VKSectionHeader title="Преимущества для вашего бизнеса" className="text-center mb-vk-12" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-vk-6">
                <FeatureCardSmall
                  title="Экономия времени"
                  value="40%"
                  description="Автоматическое распределение задач с VK TaskFlow сокращает до 40% времени, которое менеджеры тратят на организацию работы."
                  icon={ClockIcon}
                  iconColorClass="text-vk-status-info"
                  bgColorClass="bg-vk-accent-blue-alpha"
                  className="animate-scale-in"
                />
                <FeatureCardSmall
                  title="Снижение затрат"
                  value="25%"
                  description="Оптимальная загрузка сотрудников снижает операционные расходы на 25%."
                  icon={DollarSignIcon}
                  iconColorClass="text-vk-status-positive"
                  bgColorClass="bg-vk-status-positive/10"
                  className="animate-scale-in delay-100"
                />
                <FeatureCardSmall
                  title="Рост прибыли"
                  value="Увеличение"
                  description="Повышение продуктивности команды увеличивает доход компании."
                  icon={TrendingUpIcon}
                  iconColorClass="text-vk-status-warning"
                  bgColorClass="bg-vk-status-warning/10"
                  className="animate-scale-in delay-200"
                />
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="mt-vk-20">
            <div className="max-w-vk-1360 mx-auto px-vk-4">
              <VKSectionHeader title="Ключевые возможности" className="text-center mb-vk-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-vk-6">
              <FeatureCardLarge
                title="Алгоритмы ИИ для распределения задач"
                items={[
                  'Анализ загруженности и компетенций сотрудников',
                  'Оптимизация распределения для равномерной нагрузки',
                  'Учет предпочтений и личных режимов работы'
                ]}
                className="animate-slide-in-from-left"
              />
              <FeatureCardLarge
                title="Умная система уведомлений"
                items={[
                  'Адаптивные уведомления с учетом предпочтений',
                  'Интеграция с календарями для напоминаний',
                  'Приоритизация срочных и важных задач'
                ]}
                className="animate-fade-in"
              />
              <FeatureCardLarge
                title="Интерфейс для сотрудников"
                items={[
                  'Удобная очередь задач с фильтрацией и сортировкой',
                  'Настройка личных предпочтений уведомлений',
                  'Простой и интуитивный дизайн'
                ]}
                className="animate-slide-in-from-right"
              />
              <FeatureCardLarge
                title="Панель администратора"
                items={[
                  'Отслеживание всех задач в реальном времени',
                  'Аналитика производительности сотрудников',
                  'Настройка алгоритмов распределения'
                ]}
                className="animate-fade-in"
              />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

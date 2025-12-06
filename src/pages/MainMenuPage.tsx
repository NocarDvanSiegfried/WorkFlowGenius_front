import {
  VKButton,
  VKSectionHeader,
  VKGrid,
  VKFlex,
  VKTitle,
  VKText,
  VKAnimatedCard,
  VKLink,
} from '../components/vk'
import { FeatureCardSmall, FeatureCardLarge } from '../components/cards'
import { ClockIcon, TrendingUpIcon, DollarSignIcon } from '../components/icons'

export function MainMenuPage() {
  return (
    <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-16)' }}>
      {/* Hero Section - выровнены по высоте и ширине */}
      <VKGrid 
        columns={2}
        style={{
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'start',
          width: '100%',
          gap: 'var(--vk-spacing-10)',
          rowGap: 'var(--vk-spacing-10)',
          columnGap: 'var(--vk-spacing-10)',
        }}
        data-vk-hero-grid
      >
        <VKAnimatedCard 
          variant="default" 
          padding="l" 
          index={0} 
          animationType="fade-in"
          data-vk-card-hover-main
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            minHeight: '360px',
            transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          }}
        >
          <VKFlex direction="column" gap="l" style={{ width: '100%' }}>
            <VKTitle 
              level={2} 
              weight="bold" 
              style={{ 
                margin: 0, 
                lineHeight: 'var(--vk-line-height-tight)', 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                fontSize: 'var(--vk-font-size-3xl)',
                fontWeight: 'var(--vk-font-weight-bold)',
                color: 'var(--vk-color-text-primary)',
              }}
            >
              VK TaskFlow для умного распределения задач
            </VKTitle>
            <VKText 
              size="base" 
              color="secondary" 
              style={{ 
                margin: 0, 
                lineHeight: 'var(--vk-line-height-relaxed)', 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                fontSize: 'var(--vk-font-size-base)',
              }}
            >
              Используйте возможности ИИ для оптимизации рабочего процесса: учитывайте загрузку сотрудников, их предпочтения и компетенции. Это идеальное дополнение к VK WorkSpace, которое сделает вашу работу более эффективной и слаженной
            </VKText>
            <VKLink to="/login" style={{ textDecoration: 'none', marginTop: 'var(--vk-spacing-2)' }}>
              <VKButton 
                variant="primary" 
                size="l"
                style={{
                  transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                }}
              >
                Начать работу
              </VKButton>
            </VKLink>
          </VKFlex>
        </VKAnimatedCard>

        <VKAnimatedCard 
          variant="elevated" 
          padding="l" 
          index={1} 
          animationType="slide-in-from-right"
          data-vk-card-hover-main
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '360px',
            transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
          }}
        >
          <VKFlex direction="column" align="center" justify="center">
            <VKText size="base" color="tertiary">
              Иллюстрация
            </VKText>
          </VKFlex>
        </VKAnimatedCard>
      </VKGrid>

      {/* Benefits Section - 3 cards in row, одинаковой высоты, увеличенные отступы */}
      <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)' }}>
        <VKFlex justify="center" style={{ marginBottom: 'var(--vk-spacing-6)' }}>
          <VKSectionHeader title="Преимущества для вашего бизнеса" />
        </VKFlex>
        <VKGrid 
          columns={3}
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'start',
            gap: 'var(--vk-spacing-10)',
            rowGap: 'var(--vk-spacing-10)',
            columnGap: 'var(--vk-spacing-10)',
          }}
          data-vk-feature-grid
        >
          <FeatureCardSmall
            title="Экономия времени"
            value="40%"
            description="Автоматическое распределение задач с VK TaskFlow сокращает до 40% времени, которое менеджеры тратят на организацию работы."
            icon={ClockIcon}
            iconColor="info"
            bgColor="blue"
            index={0}
          />
          <FeatureCardSmall
            title="Снижение затрат"
            value="25%"
            description="Оптимальная загрузка сотрудников снижает операционные расходы на 25%."
            icon={DollarSignIcon}
            iconColor="positive"
            bgColor="positive"
            index={1}
          />
          <FeatureCardSmall
            title="Рост прибыли"
            value="Увеличение"
            description="Повышение продуктивности команды увеличивает доход компании."
            icon={TrendingUpIcon}
            iconColor="warning"
            bgColor="warning"
            index={2}
          />
        </VKGrid>
      </VKFlex>

      {/* Features Section - 2×2 grid на обычных экранах, 4 колонки на больших (1920+), четкая блочная сетка, равномерные отступы */}
      <VKFlex direction="column" style={{ width: '100%', gap: 'var(--vk-spacing-10)' }}>
        <VKFlex justify="center" style={{ marginBottom: 'var(--vk-spacing-6)' }}>
          <VKSectionHeader title="Ключевые возможности" />
        </VKFlex>
        <VKGrid 
          columns={2}
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            alignItems: 'start',
            gap: 'var(--vk-spacing-10)',
            rowGap: 'var(--vk-spacing-10)',
            columnGap: 'var(--vk-spacing-10)',
          }}
          data-vk-features-grid
        >
          <FeatureCardLarge
            title="Алгоритмы ИИ для распределения задач"
            items={[
              'Анализ загруженности и компетенций сотрудников',
              'Оптимизация распределения для равномерной нагрузки',
              'Учет предпочтений и личных режимов работы'
            ]}
            index={0}
          />
          <FeatureCardLarge
            title="Умная система уведомлений"
            items={[
              'Адаптивные уведомления с учетом предпочтений',
              'Интеграция с календарями для напоминаний',
              'Приоритизация срочных и важных задач'
            ]}
            index={1}
          />
          <FeatureCardLarge
            title="Интерфейс для сотрудников"
            items={[
              'Удобная очередь задач с фильтрацией и сортировкой',
              'Настройка личных предпочтений уведомлений',
              'Простой и интуитивный дизайн'
            ]}
            index={2}
          />
          <FeatureCardLarge
            title="Панель администратора"
            items={[
              'Отслеживание всех задач в реальном времени',
              'Аналитика производительности сотрудников',
              'Настройка алгоритмов распределения'
            ]}
            index={3}
          />
        </VKGrid>
      </VKFlex>
    </VKFlex>
  )
}

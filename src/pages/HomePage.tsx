import { VKButton, VKSectionHeader, VKFlex, VKSpacing, VKAnimatedCard, VKLink } from '../components/vk'

export function HomePage() {
  return (
    <VKFlex direction="column" align="center" justify="center">
      <VKAnimatedCard variant="default" padding="m" index={0} animationType="fade-in">
        <VKSpacing size="m">
          <VKFlex direction="column" align="center" justify="center" gap="m">
            <VKSectionHeader
              title="WorkFlowGenius"
              subtitle="Интеллектуальная система для автоматического распределения задач"
            />
            <VKFlex direction="row" gap="m" justify="center">
              <VKLink to="/login">
                <VKButton variant="primary" size="m">
                  Войти
                </VKButton>
              </VKLink>
              <VKLink to="/dashboard">
                <VKButton variant="secondary" size="m">
                  Дашборд
                </VKButton>
              </VKLink>
            </VKFlex>
          </VKFlex>
        </VKSpacing>
      </VKAnimatedCard>
    </VKFlex>
  )
}

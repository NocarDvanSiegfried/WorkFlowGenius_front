import { VKHeader, VKContainer, VKFlex, VKGrid, VKTitle, VKButton, VKNavLink, VKLink } from './vk'

export function GlobalHeader() {
  return (
    <VKHeader style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      backgroundColor: 'var(--vk-color-background-content)',
      borderBottom: '1px solid var(--vk-color-border-secondary)',
    }}>
      <VKContainer size="xl" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <VKGrid
          columns={2}
          gap="l"
          style={{
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            height: '64px',
            minHeight: '64px',
            width: '100%',
          }}
        >
          {/* Logo */}
          <VKLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <VKTitle level={3} weight="semibold" style={{ margin: 0, whiteSpace: 'nowrap' }}>
              VK TaskFlow
            </VKTitle>
          </VKLink>

          {/* Navigation */}
          <VKFlex 
            direction="row" 
            align="center" 
            justify="end" 
            gap="l" 
            style={{ 
              flexShrink: 0,
              height: '100%',
              alignItems: 'center',
            }}
          >
            <VKNavLink to="/" exact>
              Главная
            </VKNavLink>
            <VKNavLink to="/tasks">
              Мои задачи
            </VKNavLink>
            <VKNavLink to="/admin">
              Администрирование
            </VKNavLink>
            <VKLink to="/login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <VKButton variant="primary" size="m">
                Войти
              </VKButton>
            </VKLink>
          </VKFlex>
        </VKGrid>
      </VKContainer>
    </VKHeader>
  )
}

import { VKHeader, VKContainer, VKFlex, VKGrid, VKTitle, VKButton, VKNavLink, VKLink } from './vk'
import { NotificationsDropdown } from './notifications/NotificationsDropdown'
import { authStore } from '../store/authStore'

export function GlobalHeader() {
  const isAuthenticated = !!authStore.getState().token

  return (
    <VKHeader style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      backgroundColor: 'var(--vk-color-background-content)',
      borderBottom: '1px solid var(--vk-color-border-secondary)',
      backdropFilter: 'blur(10px)',
      transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
    }}>
      <VKContainer size="xl" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <VKGrid
          columns={2}
          gap="l"
          style={{
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            height: '72px',
            minHeight: '72px',
            width: '100%',
            padding: '0 var(--vk-spacing-6)',
          }}
        >
          {/* Logo */}
          <VKLink 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center',
              transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            }}
          >
            <VKTitle 
              level={3} 
              weight="semibold" 
              style={{ 
                margin: 0, 
                whiteSpace: 'nowrap',
                fontSize: 'var(--vk-font-size-xl)',
                fontWeight: 'var(--vk-font-weight-semibold)',
                color: 'var(--vk-color-text-primary)',
                transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
              }}
            >
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
            {isAuthenticated && <NotificationsDropdown />}
            {!isAuthenticated && (
              <VKLink 
                to="/login" 
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center',
                  transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                }}
              >
                <VKButton 
                  variant="primary" 
                  size="m"
                  style={{
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  Войти
                </VKButton>
              </VKLink>
            )}
          </VKFlex>
        </VKGrid>
      </VKContainer>
    </VKHeader>
  )
}

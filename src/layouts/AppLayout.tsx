import { ReactNode } from 'react'
import { GlobalHeader } from '../components/GlobalHeader'
import { GlobalFooter } from '../components/GlobalFooter'
import { VKPage, VKFlex, VKPageContainer } from '../components/vk'

interface AppLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function AppLayout({ children, showHeader = true, showFooter = true }: AppLayoutProps) {
  return (
    <VKPage style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeader && <GlobalHeader />}

      <VKFlex 
        direction="column" 
        grow 
        style={{ 
          flex: 1,
          minHeight: 0,
          paddingTop: showHeader ? '0' : '0',
        }}
      >
        <VKPageContainer maxWidth="1440">
          {children}
        </VKPageContainer>
      </VKFlex>

      {showFooter && (
        <VKFlex style={{ marginTop: 'auto' }}>
          <GlobalFooter />
        </VKFlex>
      )}
    </VKPage>
  )
}

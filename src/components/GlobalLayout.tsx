import { ReactNode } from 'react'
import { GlobalHeader } from './GlobalHeader'
import { GlobalFooter } from './GlobalFooter'
import { VKPage, VKContainer, VKFlex, VKSpacing } from './vk'

interface GlobalLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function GlobalLayout({ children, showHeader = true, showFooter = true }: GlobalLayoutProps) {
  return (
    <VKPage>
      {showHeader && <GlobalHeader />}

      <VKFlex direction="column" grow>
        <VKContainer size="xl">
          <VKSpacing size="l">
            {children}
          </VKSpacing>
        </VKContainer>
      </VKFlex>

      {showFooter && <GlobalFooter />}
    </VKPage>
  )
}

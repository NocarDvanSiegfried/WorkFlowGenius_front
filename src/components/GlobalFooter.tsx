import {
  VKContainer,
  VKGrid,
  VKFlex,
  VKSpacing,
  VKTitle,
  VKText,
  VKSeparator,
  VKLink,
  VKFooter,
  VKAnimatedColumn,
} from './vk'

interface FooterColumnProps {
  title: string
  links: Array<{ label: string; to: string }>
  index?: number
}

function FooterColumn({ title, links, index = 0 }: FooterColumnProps) {
  return (
    <VKAnimatedColumn index={index}>
      <VKFlex direction="column" gap="s">
        <VKTitle level={5} weight="medium">
          {title}
        </VKTitle>
        <VKFlex direction="column" gap="s">
          {links.map((link, linkIndex) => (
            <VKLink key={linkIndex} to={link.to} size="sm" color="secondary" style={{ textDecoration: 'none' }}>
              {link.label}
            </VKLink>
          ))}
        </VKFlex>
      </VKFlex>
    </VKAnimatedColumn>
  )
}

export function GlobalFooter() {
  const footerColumns = [
    {
      title: 'Сервисы',
      links: [
        { label: 'Задачи', to: '/tasks' },
        { label: 'Помощник', to: '/admin' },
      ],
    },
    {
      title: 'Компания',
      links: [
        { label: 'О нас', to: '/about' },
        { label: 'Контакты', to: '/contacts' },
      ],
    },
    {
      title: 'Клиентам',
      links: [
        { label: 'Техподдержка', to: '/support' },
        { label: 'Документация', to: '/docs' },
        { label: 'Видеоуроки', to: '/tutorials' },
        { label: 'Инструкции', to: '/guides' },
      ],
    },
    {
      title: 'Тарифы',
      links: [
        { label: 'Тарифные планы', to: '/pricing' },
        { label: 'Сравнение тарифов', to: '/pricing/compare' },
      ],
    },
    {
      title: 'Партнерам',
      links: [
        { label: 'Партнерская программа', to: '/partners' },
        { label: 'Преимущества', to: '/partners/benefits' },
      ],
    },
  ]

  return (
    <VKFooter style={{ 
      marginTop: 'auto',
      width: '100%',
      backgroundColor: 'var(--vk-color-background-secondary)',
      borderTop: '1px solid var(--vk-color-border-secondary)',
    }}>
      <VKContainer size="l" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <VKSpacing size="l">
          <VKSpacing size="m">
            <VKTitle level={3} weight="semibold">
              VK TaskFlow
            </VKTitle>
          </VKSpacing>
          <VKSeparator wide />
        </VKSpacing>

        <VKSpacing size="l">
          <VKGrid columns={5} gap="l">
            {footerColumns.map((column, index) => (
              <FooterColumn key={index} title={column.title} links={column.links} index={index} />
            ))}
          </VKGrid>
        </VKSpacing>

        <VKSpacing size="m">
          <VKSeparator wide />
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex justify="center">
            <VKText size="sm" color="secondary">
              © 2025 VK TaskFlow. Все права защищены.
            </VKText>
          </VKFlex>
        </VKSpacing>
      </VKContainer>
    </VKFooter>
  )
}

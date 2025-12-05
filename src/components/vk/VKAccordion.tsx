import { ReactNode, useState, CSSProperties } from 'react'
import { VKText } from './index'

interface VKAccordionItem {
  title: string
  content: ReactNode
  defaultOpen?: boolean
}

interface VKAccordionProps {
  items: VKAccordionItem[]
  allowMultiple?: boolean
  className?: string
  style?: CSSProperties
}

export function VKAccordion({ items, allowMultiple = false, className = '', style }: VKAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((item, index) => (item.defaultOpen ? index : -1)).filter((i) => i !== -1))
  )

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(index)
      }
      return newSet
    })
  }

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--vk-spacing-2)',
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index)

        return (
          <div
            key={index}
            style={{
              border: '1px solid var(--vk-color-border-secondary)',
              borderRadius: 'var(--vk-radius-md)',
              overflow: 'hidden',
              transition: 'all var(--vk-transition-base) var(--vk-motion-easing-standard)',
            }}
          >
            <button
              onClick={() => toggleItem(index)}
              style={{
                width: '100%',
                padding: 'var(--vk-spacing-4)',
                background: 'var(--vk-color-background-content)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left',
                transition: 'background-color var(--vk-transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--vk-color-background-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--vk-color-background-content)'
              }}
              aria-expanded={isOpen}
            >
              <VKText size="base" weight="medium" style={{ margin: 0 }}>
                {item.title}
              </VKText>
              <span
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--vk-transition-base) var(--vk-motion-easing-standard)',
                  fontSize: 'var(--vk-font-size-lg)',
                  color: 'var(--vk-color-text-secondary)',
                }}
              >
                ▼
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height var(--vk-transition-base) var(--vk-motion-easing-standard)',
              }}
            >
              <div style={{ padding: 'var(--vk-spacing-4)', paddingTop: 0 }}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


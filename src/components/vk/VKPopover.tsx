import { ReactNode, useState, useRef, useEffect, CSSProperties } from 'react'
import { VKCard } from './VKCard'

interface VKPopoverProps {
  children: ReactNode
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: 'click' | 'hover'
}

export function VKPopover({
  children,
  content,
  placement = 'bottom',
  isOpen: controlledIsOpen,
  onOpenChange,
  trigger = 'click',
}: VKPopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const gap = 8

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - gap
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
        left = triggerRect.left - popoverRect.width - gap
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
        left = triggerRect.right + gap
        break
    }

    setPosition({ top, left })
  }

  const handleOpen = () => {
    if (!isControlled) {
      setInternalIsOpen(true)
    }
    onOpenChange?.(true)
    setTimeout(updatePosition, 0)
  }

  const handleClose = () => {
    if (!isControlled) {
      setInternalIsOpen(false)
    }
    onOpenChange?.(false)
  }

  useEffect(() => {
    if (isOpen) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (trigger === 'click' && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          popoverRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          handleClose()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, trigger])

  const popoverStyle: CSSProperties = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity var(--vk-transition-base) var(--vk-motion-easing-standard), transform var(--vk-transition-base) var(--vk-motion-easing-standard)',
    pointerEvents: isOpen ? 'auto' : 'none',
  }

  const triggerProps =
    trigger === 'click'
      ? { onClick: isOpen ? handleClose : handleOpen }
      : {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        }

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-block' }} {...triggerProps}>
        {children}
      </div>
      <div ref={popoverRef} style={popoverStyle}>
        <VKCard variant="elevated" padding="m" style={{ minWidth: '200px' }}>
          {content}
        </VKCard>
      </div>
    </>
  )
}


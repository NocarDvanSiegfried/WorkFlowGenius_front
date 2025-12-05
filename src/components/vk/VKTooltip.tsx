import { ReactNode, useState, useRef, useEffect, CSSProperties } from 'react'

interface VKTooltipProps {
  children: ReactNode
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
}

export function VKTooltip({ children, content, placement = 'top', delay = 200, disabled = false }: VKTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const gap = 8

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - gap
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + gap
        break
    }

    setPosition({ top, left })
  }

  const handleMouseEnter = () => {
    if (disabled) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      setTimeout(updatePosition, 0)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isVisible])

  const tooltipStyle: CSSProperties = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 1000,
    padding: 'var(--vk-spacing-2) var(--vk-spacing-3)',
    backgroundColor: 'var(--vk-color-background-inverse)',
    color: 'var(--vk-color-text-inverse)',
    borderRadius: 'var(--vk-radius-md)',
    fontSize: 'var(--vk-font-size-sm)',
    lineHeight: 'var(--vk-line-height-sm)',
    maxWidth: '200px',
    wordWrap: 'break-word',
    pointerEvents: 'none',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity var(--vk-transition-base) var(--vk-motion-easing-standard), transform var(--vk-transition-base) var(--vk-motion-easing-standard)',
    boxShadow: 'var(--vk-shadow-elevation-3)',
  }

  return (
    <>
      <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'inline-block' }}>
        {children}
      </div>
      {!disabled && (
        <div ref={tooltipRef} style={tooltipStyle}>
          {content}
        </div>
      )}
    </>
  )
}


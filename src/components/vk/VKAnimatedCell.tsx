import { HTMLAttributes, ReactNode } from 'react'
import { VKCell } from './VKCell'

interface VKAnimatedCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  before?: ReactNode
  after?: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  multiline?: boolean
  disabled?: boolean
  index?: number
}

export function VKAnimatedCell({
  children,
  before,
  after,
  subtitle,
  description,
  multiline = false,
  disabled = false,
  index = 0,
  className = '',
  ...props
}: VKAnimatedCellProps) {
  const delay = index * 50

  return (
    <VKCell
      before={before}
      after={after}
      subtitle={subtitle}
      description={description}
      multiline={multiline}
      disabled={disabled}
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </VKCell>
  )
}



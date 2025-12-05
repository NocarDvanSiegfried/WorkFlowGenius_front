import { Link, useLocation } from 'react-router-dom'
import { HTMLAttributes, ReactNode } from 'react'

interface VKNavLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
  to: string
  exact?: boolean
}

export function VKNavLink({ children, to, exact = false, className = '', ...props }: VKNavLinkProps) {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)

  const baseStyles: React.CSSProperties = {
    fontSize: 'var(--vk-font-size-base)',
    lineHeight: 'var(--vk-line-height-normal)',
    whiteSpace: 'nowrap',
    transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
    position: 'relative',
    paddingBottom: 'var(--vk-spacing-1)',
    textDecoration: 'none',
  }

  const activeStyles: React.CSSProperties = isActive
    ? {
        color: 'var(--vk-color-accent-blue)',
        fontWeight: 'var(--vk-font-weight-medium)',
      }
    : {
        color: 'var(--vk-color-text-primary)',
        fontWeight: 'var(--vk-font-weight-regular)',
      }

  return (
    <Link
      to={to}
      className={className}
      style={{ ...baseStyles, ...activeStyles }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'var(--vk-color-text-link-hover)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'var(--vk-color-text-primary)'
        }
      }}
      {...(props as Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)}
    >
      {children}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--vk-color-accent-blue)',
            borderRadius: '2px 2px 0 0',
          }}
        />
      )}
    </Link>
  )
}

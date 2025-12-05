import { AnchorHTMLAttributes, ReactNode, CSSProperties } from 'react'
import { Link } from 'react-router-dom'

interface VKLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
  to?: string
  href?: string
  size?: 'xs' | 'sm' | 'base' | 'm' | 'l'
  color?: 'primary' | 'secondary' | 'accent'
  external?: boolean
}

const sizeValues = {
  xs: 'var(--vk-font-size-xs)',
  sm: 'var(--vk-font-size-sm)',
  base: 'var(--vk-font-size-base)',
  m: 'var(--vk-font-size-md)',
  l: 'var(--vk-font-size-lg)',
}

const colorValues = {
  primary: {
    color: 'var(--vk-color-text-primary)',
    hoverColor: 'var(--vk-color-text-link-hover)',
  },
  secondary: {
    color: 'var(--vk-color-text-secondary)',
    hoverColor: 'var(--vk-color-text-link-hover)',
  },
  accent: {
    color: 'var(--vk-color-accent-blue)',
    hoverColor: 'var(--vk-color-accent-blue-hover)',
  },
}

export function VKLink({
  children,
  to,
  href,
  size = 'base',
  color = 'secondary',
  external = false,
  className = '',
  style,
  ...props
}: VKLinkProps) {
  const linkStyle: CSSProperties = {
    fontSize: sizeValues[size],
    color: colorValues[color].color,
    transition: 'color var(--vk-transition-base)',
    textDecoration: 'none',
    ...style,
  }

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        style={linkStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colorValues[color].hoverColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colorValues[color].color
        }}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'style'>)}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={linkStyle}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colorValues[color].hoverColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colorValues[color].color
        }}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      className={className}
      style={linkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = colorValues[color].hoverColor
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = colorValues[color].color
      }}
      {...props}
    >
      {children}
    </a>
  )
}

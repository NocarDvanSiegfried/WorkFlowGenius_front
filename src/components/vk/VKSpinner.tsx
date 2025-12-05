import { CSSProperties } from 'react'

interface VKSpinnerProps {
  size?: 's' | 'm' | 'l'
  color?: 'primary' | 'secondary' | 'accent'
  className?: string
  style?: CSSProperties
}

const sizeValues = {
  s: '16px',
  m: '24px',
  l: '32px',
}

export function VKSpinner({ size = 'm', color = 'primary', className = '', style }: VKSpinnerProps) {
  const spinnerStyle: CSSProperties = {
    display: 'inline-block',
    width: sizeValues[size],
    height: sizeValues[size],
    border: `2px solid var(--vk-color-background-secondary)`,
    borderTopColor:
      color === 'primary'
        ? 'var(--vk-color-accent-blue)'
        : color === 'secondary'
        ? 'var(--vk-color-text-secondary)'
        : 'var(--vk-color-accent-blue)',
    borderRadius: '50%',
    animation: 'vk-spin 0.8s linear infinite',
    ...style,
  }

  return (
    <>
      <style>
        {`
          @keyframes vk-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className={className} style={spinnerStyle} aria-label="Загрузка" role="status" />
    </>
  )
}


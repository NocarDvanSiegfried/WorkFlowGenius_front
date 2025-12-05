import { CSSProperties } from 'react'

interface VKSkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave' | 'none'
  className?: string
  style?: CSSProperties
}

export function VKSkeleton({
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  className = '',
  style,
}: VKSkeletonProps) {
  const skeletonStyle: CSSProperties = {
    backgroundColor: 'var(--vk-color-background-secondary)',
    borderRadius: variant === 'circular' ? '50%' : variant === 'text' ? '4px' : 'var(--vk-radius-md)',
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
    animation:
      animation === 'pulse'
        ? 'vk-skeleton-pulse 1.5s ease-in-out infinite'
        : animation === 'wave'
        ? 'vk-skeleton-wave 1.6s ease-in-out infinite'
        : 'none',
    ...style,
  }

  return (
    <>
      <style>
        {`
          @keyframes vk-skeleton-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          @keyframes vk-skeleton-wave {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
        `}
      </style>
      <div className={className} style={skeletonStyle} />
    </>
  )
}


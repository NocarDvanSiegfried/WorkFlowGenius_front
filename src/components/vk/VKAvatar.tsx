import { HTMLAttributes } from 'react'

interface VKAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 's' | 'm' | 'l' | 'xl'
  name?: string
  online?: boolean
}

export function VKAvatar({ src, alt, size = 'm', name, online, className = '', ...props }: VKAvatarProps) {
  const sizeStyles = {
    s: 'w-8 h-8 text-vk-xs',
    m: 'w-10 h-10 text-vk-sm',
    l: 'w-12 h-12 text-vk-base',
    xl: 'w-16 h-16 text-vk-lg',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeStyles[size]} ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-vk-accent-blue flex items-center justify-center text-white font-vk-semibold">
          {name ? getInitials(name) : '?'}
        </div>
      )}
      {online !== undefined && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            online ? 'bg-vk-status-positive' : 'bg-vk-gray-500'
          }`}
        />
      )}
    </div>
  )
}


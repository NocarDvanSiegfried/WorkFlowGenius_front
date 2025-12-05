import { ImgHTMLAttributes } from 'react'

interface VKImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

const objectFitStyles = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
}

export function VKImage({
  src,
  alt,
  objectFit = 'cover',
  className = '',
  ...props
}: VKImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full ${objectFitStyles[objectFit]} ${className}`}
      {...props}
    />
  )
}



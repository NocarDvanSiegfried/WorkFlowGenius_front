import { VKCard } from '../vk'

interface FeatureCardSmallProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  iconColorClass: string
  bgColorClass: string
  className?: string
}

export function FeatureCardSmall({
  title,
  value,
  description,
  icon: Icon,
  iconColorClass,
  bgColorClass,
  className = '',
}: FeatureCardSmallProps) {
  return (
    <VKCard
      variant="elevated"
      padding="l"
      className={`w-full h-full flex flex-col justify-between bg-vk-bg-content transition-all duration-vk-base ease-vk-standard hover:shadow-vk-2 hover:scale-vk-hover active:scale-vk-active ${className}`}
    >
      <div className="flex items-center gap-vk-4">
        <div className={`w-vk-12-5 h-vk-12-5 rounded-full flex items-center justify-center ${bgColorClass}`}>
          <Icon className={`w-vk-7 h-vk-7 ${iconColorClass}`} strokeWidth={2} />
        </div>
        <h3 className="text-vk-accent-blue font-vk-bold text-vk-lg underline leading-tight">{title}</h3>
      </div>
      <div className="flex flex-col mt-vk-4">
        <span className="text-vk-text-primary font-vk-bold text-vk-3xl leading-tight">{value}</span>
        <p className="text-vk-text-secondary font-vk-regular text-vk-sm leading-normal mt-vk-2">{description}</p>
      </div>
    </VKCard>
  )
}


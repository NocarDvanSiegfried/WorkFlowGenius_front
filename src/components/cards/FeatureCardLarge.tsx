import { VKCard } from '../vk'
import { CheckIcon } from '../icons'

interface FeatureCardLargeProps {
  title: string
  items: string[]
  className?: string
}

export function FeatureCardLarge({ title, items, className = '' }: FeatureCardLargeProps) {
  return (
    <VKCard
      variant="outlined"
      padding="l"
      className={`w-full h-full flex flex-col transition-all duration-vk-base ease-vk-standard hover:shadow-vk-2 hover:scale-vk-hover active:scale-vk-active ${className}`}
    >
      <h3 className="text-vk-accent-blue font-vk-semibold text-vk-m underline leading-tight mb-vk-4">{title}</h3>
      <div className="flex flex-col gap-vk-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-vk-3">
            <CheckIcon className="w-vk-icon-m h-vk-icon-m text-vk-accent-blue flex-shrink-0 mt-vk-0-5" strokeWidth={2} />
            <p className="text-vk-text-secondary font-vk-regular text-vk-sm leading-normal">{item}</p>
          </div>
        ))}
      </div>
    </VKCard>
  )
}


import { VKCard } from '../vk'

export function CardsRowLarge2A() {
  return (
    <div className="flex flex-col xl:flex-row gap-vk-20 items-start justify-start w-full">
      <VKCard
        variant="default"
        padding="l"
        className="w-full max-w-[850px] h-[400px] bg-gradient-to-br from-vk-accent-blue to-vk-status-positive flex items-center justify-center animate-fade-in"
      >
        <span className="text-white font-vk-regular text-vk-xl">Карточка 4</span>
      </VKCard>
      <VKCard variant="default" padding="l" className="w-full max-w-[850px] h-[400px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-xl">Карточка 5</span>
      </VKCard>
    </div>
  )
}

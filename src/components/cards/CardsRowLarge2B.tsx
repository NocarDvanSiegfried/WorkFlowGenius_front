import { VKCard } from '../vk'

export function CardsRowLarge2B() {
  return (
    <div className="flex flex-col xl:flex-row gap-vk-20 items-start justify-start w-full">
      <VKCard variant="default" padding="l" className="w-full max-w-[850px] h-[400px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-xl">Карточка 6</span>
      </VKCard>
      <VKCard variant="default" padding="l" className="w-full max-w-[850px] h-[400px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-xl">Карточка 7</span>
      </VKCard>
    </div>
  )
}

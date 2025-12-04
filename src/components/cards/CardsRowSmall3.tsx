import { VKCard } from '../vk'

export function CardsRowSmall3() {
  return (
    <div className="flex flex-col md:flex-row gap-vk-16 items-start justify-start w-full">
      <VKCard variant="default" padding="l" className="w-full max-w-[550px] h-[260px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-lg">Карточка 1</span>
      </VKCard>
      <VKCard variant="default" padding="l" className="w-full max-w-[550px] h-[260px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-lg">Карточка 2</span>
      </VKCard>
      <VKCard variant="default" padding="l" className="w-full max-w-[550px] h-[260px] flex items-center justify-center animate-fade-in">
        <span className="text-vk-text-secondary font-vk-regular text-vk-lg">Карточка 3</span>
      </VKCard>
    </div>
  )
}

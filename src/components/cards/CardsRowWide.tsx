import { VKCard } from '../vk'

export function CardsRowWide() {
  return (
    <VKCard variant="default" padding="l" className="w-full max-w-[1780px] h-[300px] flex items-center justify-center animate-fade-in">
      <span className="text-vk-text-secondary font-vk-regular text-vk-xl">Широкая карточка</span>
    </VKCard>
  )
}

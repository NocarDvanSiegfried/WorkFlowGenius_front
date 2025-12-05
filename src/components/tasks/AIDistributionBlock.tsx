import { VKCard } from '../vk'

export function AIDistributionBlock() {
  return (
    <VKCard
      variant="default"
      padding="m"
      className="mb-vk-4 bg-gradient-to-br from-vk-accent-blue-alpha to-vk-status-positive/10"
    >
      <div className="flex items-center gap-vk-3">
        <div className="w-vk-8 h-vk-8 rounded-full bg-vk-accent-blue-alpha flex items-center justify-center flex-shrink-0">
          <svg
            className="w-vk-icon-s h-vk-icon-s text-vk-accent-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-vk-text-primary font-vk-regular text-vk-sm leading-normal">
            Задачи распределены на основе ИИ. Рекомендуем сфокусироваться на задачах с высоким приоритетом.
          </p>
        </div>
      </div>
    </VKCard>
  )
}


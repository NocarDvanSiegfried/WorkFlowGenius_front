import { VKInput } from '../vk'

export function SearchPanel() {
  return (
    <div className="relative mb-vk-3">
      <div className="absolute left-vk-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <svg
          className="w-5 h-5 text-vk-text-tertiary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <VKInput
        type="text"
        placeholder="Поиск задач..."
        className="pl-vk-12"
      />
    </div>
  )
}


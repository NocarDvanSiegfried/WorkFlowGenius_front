export function SearchPanel() {
  return (
    <div className="relative mb-3">
      <input
        type="text"
        placeholder="Поиск задач..."
        className="w-full h-[48px] pl-12 pr-4 bg-white border border-[#E5E7EB] rounded-[10px] font-unbounded font-normal text-[14px] leading-[17.36px] text-black placeholder:text-[#8B8B8B] focus:outline-none focus:border-[#0077FF] focus:ring-1 focus:ring-[#0077FF] transition-all duration-200"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <svg
          className="w-5 h-5 text-[#8B8B8B]"
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
    </div>
  )
}


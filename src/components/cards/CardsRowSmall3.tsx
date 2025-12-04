export function CardsRowSmall3() {
  return (
    <div className="flex flex-col md:flex-row gap-[65px] items-start justify-start w-full">
      <div className="w-full max-w-[550px] h-[260px] bg-white border border-[#6B6B6B] border-opacity-50 rounded-[15px] flex items-center justify-center">
        <span className="text-[#6B6B6B] font-unbounded font-normal text-lg">Card 1</span>
      </div>
      <div className="w-full max-w-[550px] h-[260px] bg-white border border-[#6B6B6B] border-opacity-50 rounded-[15px] flex items-center justify-center">
        <span className="text-[#6B6B6B] font-unbounded font-normal text-lg">Card 2</span>
      </div>
      <div className="w-full max-w-[550px] h-[260px] bg-white border border-[#6B6B6B] border-opacity-50 rounded-[15px] flex items-center justify-center">
        <span className="text-[#6B6B6B] font-unbounded font-normal text-lg">Card 3</span>
      </div>
    </div>
  )
}

export function CardsRowLarge2A() {
  return (
    <div className="flex flex-col xl:flex-row gap-[80px] items-start justify-start w-full">
      <div className="w-full max-w-[850px] h-[400px] bg-gradient-to-br from-[#088ED4] to-[#38AB79] rounded-[15px] flex items-center justify-center">
        <span className="text-white font-unbounded font-normal text-xl">Card 4</span>
      </div>
      <div className="w-full max-w-[850px] h-[400px] bg-white border border-[#6B6B6B] border-opacity-50 rounded-[15px] flex items-center justify-center">
        <span className="text-[#6B6B6B] font-unbounded font-normal text-xl">Card 5</span>
      </div>
    </div>
  )
}

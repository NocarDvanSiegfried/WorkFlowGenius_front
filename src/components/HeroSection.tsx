import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center w-full pt-[160px] pb-[60px]">
      <div className="flex flex-col items-center text-center max-w-[850px] px-4">
        <h2 className="text-black font-unbounded font-bold text-[48px] leading-[59.52px]">
          WorkFlowGenius
        </h2>
        <h3 className="text-[#6B6B6B] font-unbounded font-normal text-[24px] leading-[29.76px] mt-3">
          Интеллектуальная система управления задачами
        </h3>
        <p className="text-[#6B6B6B] font-unbounded font-light text-[18px] leading-[22.32px] max-w-[650px] mt-4">
          Автоматическое распределение задач с учётом навыков, загрузки и приоритетов. Умные уведомления и аналитика для эффективной работы команды.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-[24px] mt-8">
          <Link
            to="/login"
            className="w-full sm:w-[296px] h-[75px] bg-[#0077FF] rounded-[10px] flex items-center justify-center hover:bg-[#0066DD] transition-colors"
          >
            <span className="text-white font-unbounded font-normal text-[24px] leading-[29.76px]">
              Начать работу
            </span>
          </Link>

          <button className="w-full sm:w-[341px] h-[75px] bg-white border border-[#0077FF] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-[#0077FF] font-unbounded font-normal text-[24px] leading-[29.76px]">
              Посмотреть демо
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export function PageHeader() {
  const userName = 'Иван Иванов'

  return (
    <div className="mb-4">
      <h1 className="text-black font-unbounded font-semibold text-[28px] leading-[34.72px] mb-1">
        Мои задачи
      </h1>
      <p className="text-[#8B8B8B] font-unbounded font-normal text-[14px] leading-[17.36px]">
        Привет, {userName}! Вот твой обзор задач на сегодня.
      </p>
    </div>
  )
}


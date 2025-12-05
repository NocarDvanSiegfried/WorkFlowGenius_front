import { useEffect, useState, useRef } from 'react'
import { VKCard } from '../vk'

interface Toast {
  id: string
  message: string
  isVisible: boolean
}

const aiTips = [
  'Вы близки к перегрузке — рекомендуется перераспределить задачи',
  'Система выявила задачу с риском просрочки: «Написать тесты для модуля авторизации»',
  'Рекомендуем начать задачу «Обновить документацию API» сегодня утром',
  'Ваша производительность за неделю выросла на 12%. Отличная работа!',
  'У вас 3 просроченные задачи. Рекомендуем завершить их в первую очередь',
  'Задача «Провести code review» требует внимания — дедлайн через 2 часа',
  'Рекомендуем сделать перерыв после завершения текущей задачи для поддержания продуктивности',
  'У вас 5 задач с высоким приоритетом. Рекомендуем сфокусироваться на них',
]

export function AIToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const currentIndexRef = useRef(0)

  useEffect(() => {
    const showNextToast = () => {
      const index = currentIndexRef.current
      const newToast: Toast = {
        id: `toast-${Date.now()}-${index}`,
        message: aiTips[index],
        isVisible: true,
      }

      setToasts((prev) => [...prev, newToast])
      currentIndexRef.current = (currentIndexRef.current + 1) % aiTips.length

      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) =>
            toast.id === newToast.id ? { ...toast, isVisible: false } : toast
          )
        )

        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id))
        }, 300)
      }, 5000)
    }

    const interval = setInterval(showNextToast, 8000)

    showNextToast()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-vk-4 right-vk-4 md:bottom-vk-6 md:right-vk-6 z-50 flex flex-col-reverse gap-vk-2 max-w-vk-80 md:max-w-vk-90 pointer-events-none">
      {toasts.map((toast) => (
        <VKCard
          key={toast.id}
          variant="default"
          padding="s"
          className={`pointer-events-auto transition-all duration-vk-base ease-vk-standard ${
            toast.isVisible
              ? 'opacity-100 translate-x-0 animate-slide-in-from-right'
              : 'opacity-0 translate-x-4 pointer-events-none animate-fade-out'
          }`}
        >
          <div className="flex items-start gap-vk-2">
            <div className="w-vk-icon-xl h-vk-icon-xl rounded-full bg-vk-accent-blue-alpha flex items-center justify-center flex-shrink-0">
              <svg
                className="w-vk-icon-xs h-vk-icon-xs text-vk-accent-blue"
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
            <p className="text-vk-text-secondary font-vk-regular text-vk-sm flex-1">
              {toast.message}
            </p>
          </div>
        </VKCard>
      ))}
    </div>
  )
}


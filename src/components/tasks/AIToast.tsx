import { useEffect, useState, useRef } from 'react'
import { VKCard, VKFlex, VKText } from '../vk'

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
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--vk-spacing-4)',
        right: 'var(--vk-spacing-4)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 'var(--vk-spacing-2)',
        maxWidth: '320px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <VKCard
          key={toast.id}
          variant="default"
          padding="m"
          style={{
            pointerEvents: 'auto',
            opacity: toast.isVisible ? 1 : 0,
            transform: toast.isVisible ? 'translateX(0)' : 'translateX(16px)',
            transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
            boxShadow: 'var(--vk-shadow-elevation-3)',
          }}
        >
          <VKFlex align="start" gap="s">
            <VKFlex
              align="center"
              justify="center"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--vk-color-accent-blue-alpha)',
                flexShrink: 0,
              }}
            >
              <svg
                style={{
                  width: '12px',
                  height: '12px',
                  color: 'var(--vk-color-accent-blue)',
                }}
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
            </VKFlex>
            <VKText size="sm" color="secondary" style={{ margin: 0 }}>
              {toast.message}
            </VKText>
          </VKFlex>
        </VKCard>
      ))}
    </div>
  )
}

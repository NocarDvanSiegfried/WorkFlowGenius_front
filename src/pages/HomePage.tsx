import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        WorkFlowGenius
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Интеллектуальная система для автоматического распределения задач
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Войти
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Дашборд
        </Link>
      </div>
    </div>
  )
}


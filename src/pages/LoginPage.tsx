import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { api } from '../services/api'
import { getApiError } from '../utils/errors'
import { VKCard, VKInput, VKButton, VKSectionHeader } from '../components/vk'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.success && response.data.data) {
        setAuth(response.data.data.user, response.data.data.access_token)
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      const apiError = getApiError(err)
      setError(apiError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-vk-bg-secondary flex items-center justify-center p-vk-4 animate-fade-in">
      <VKCard variant="elevated" padding="l" className="w-full max-w-md animate-scale-in">
        <VKSectionHeader title="Вход" className="mb-vk-6 text-center" />
        <form onSubmit={handleSubmit} className="space-y-vk-4">
          <div>
            <label htmlFor="email" className="block text-vk-sm font-vk-medium text-vk-text-primary mb-vk-1">
              Email
            </label>
            <VKInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!error}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-vk-sm font-vk-medium text-vk-text-primary mb-vk-1">
              Пароль
            </label>
            <VKInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={!!error}
            />
          </div>
          {error && (
            <div className="text-vk-status-negative text-vk-sm">{error}</div>
          )}
          <VKButton
            type="submit"
            variant="primary"
            size="l"
            loading={loading}
            className="w-full"
          >
            Войти
          </VKButton>
        </form>
      </VKCard>
    </div>
  )
}


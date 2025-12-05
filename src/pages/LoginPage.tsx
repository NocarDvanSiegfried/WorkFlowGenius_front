import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { api } from '../services/api'
import { getApiError } from '../utils/errors'
import { VKInput, VKButton, VKSectionHeader, VKFlex, VKFormItem, VKText, VKAnimatedCard } from '../components/vk'

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
    <VKFlex direction="column" align="center" justify="center" style={{ minHeight: 'calc(100vh - 128px)' }}>
      <VKAnimatedCard 
        variant="elevated" 
        padding="l" 
        index={0} 
        animationType="fade-in"
        style={{ width: '100%', maxWidth: '420px' }}
        data-vk-card-hover
      >
        <VKFlex direction="column" gap="m">
          <VKFlex justify="center">
            <VKSectionHeader title="Вход" />
          </VKFlex>
          <form onSubmit={handleSubmit}>
            <VKFlex direction="column" gap="m">
              <VKFormItem label="Email" required>
                <VKInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!error}
                />
              </VKFormItem>
              <VKFormItem label="Пароль" required>
                <VKInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!error}
                />
              </VKFormItem>
              {error && (
                <VKText size="sm" color="primary" style={{ margin: 0 }}>
                  {error}
                </VKText>
              )}
              <VKFlex>
                <VKButton
                  type="submit"
                  variant="primary"
                  size="m"
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  Войти
                </VKButton>
              </VKFlex>
            </VKFlex>
          </form>
        </VKFlex>
      </VKAnimatedCard>
    </VKFlex>
  )
}

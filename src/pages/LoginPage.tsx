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
    <VKFlex 
      direction="column" 
      align="center" 
      justify="center" 
      style={{ 
        minHeight: 'calc(100vh - 128px)',
        padding: 'var(--vk-spacing-8)',
      }}
    >
      <VKAnimatedCard 
        variant="elevated" 
        padding="l" 
        index={0} 
        animationType="scale-in"
        style={{ 
          width: '100%', 
          maxWidth: '440px',
          transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
        }}
        data-vk-card-hover-main
      >
        <VKFlex direction="column" gap="l">
          <VKFlex justify="center" style={{ marginBottom: 'var(--vk-spacing-2)' }}>
            <VKSectionHeader title="Вход" />
          </VKFlex>
          <form onSubmit={handleSubmit}>
            <VKFlex direction="column" gap="l">
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
                <VKText 
                  size="sm" 
                  color="danger" 
                  style={{ 
                    margin: 0,
                    padding: 'var(--vk-spacing-3)',
                    backgroundColor: 'var(--vk-color-background-accent)',
                    borderRadius: 'var(--vk-radius-md)',
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
                >
                  {error}
                </VKText>
              )}
              <VKFlex style={{ marginTop: 'var(--vk-spacing-2)' }}>
                <VKButton
                  type="submit"
                  variant="primary"
                  size="l"
                  loading={loading}
                  style={{ 
                    width: '100%',
                    transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                  }}
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

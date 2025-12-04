import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components'
import { MainMenuPage, LoginPage, DashboardPage } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App


import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components'
import { MainMenuPage, LoginPage, DashboardPage, TasksPage } from './pages'

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
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  )
}

export default App


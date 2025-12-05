import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedRoute } from './components'
import { MainMenuPage, LoginPage, DashboardPage, TasksPage, AdminPage, UIKitPage } from './pages'

function App() {
  return (
    <Layout>
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ui-kit" element={<UIKitPage />} />
      </Routes>
    </Layout>
  )
}

export default App


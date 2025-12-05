import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedRoute } from './components'
import { MainMenuPage, LoginPage, DashboardPage, TasksPage, UIKitPage } from './pages'
import { AdminIndexPage } from './pages/admin'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { AdminTasksPage } from './pages/admin/tasks'
import { AdminAIPage } from './pages/admin/ai'
import { AdminAnalyticsPage } from './pages/admin/analytics'

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
        <Route path="/admin" element={<AdminIndexPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/tasks" element={<AdminTasksPage />} />
        <Route path="/admin/ai" element={<AdminAIPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/ui-kit" element={<UIKitPage />} />
      </Routes>
    </Layout>
  )
}

export default App


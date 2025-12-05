import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedRoute } from './components'
import { MainMenuPage, LoginPage, DashboardPage, TasksPage, TaskDetailPage, UIKitPage } from './pages'
import { AdminIndexPage } from './pages/admin'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { AdminTasksPage } from './pages/admin/tasks'
import { AdminTeamPage } from './pages/admin/team'
import { AdminAIPage } from './pages/admin/ai'
import { AdminAISettingsPage } from './pages/admin/ai-settings'
import { AdminAnalyticsPage } from './pages/admin/analytics'
import { AdminTeamDNAPage } from './pages/admin/team-dna'

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
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="/admin" element={<AdminIndexPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/tasks" element={<AdminTasksPage />} />
        <Route path="/admin/team" element={<AdminTeamPage />} />
        <Route path="/admin/ai" element={<AdminAIPage />} />
        <Route path="/admin/ai-settings" element={<AdminAISettingsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/admin/team-dna" element={<AdminTeamDNAPage />} />
        <Route path="/ui-kit" element={<UIKitPage />} />
      </Routes>
    </Layout>
  )
}

export default App


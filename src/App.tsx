import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { MainMenuPage, LoginPage, DashboardPage, TasksPage, TaskDetailPage, UIKitPage } from './pages'
import { AdminIndexPage } from './pages/admin'

// Lazy loading для админских страниц
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard').then(m => ({ default: m.AdminDashboardPage })))
const AdminTasksPage = lazy(() => import('./pages/admin/tasks').then(m => ({ default: m.AdminTasksPage })))
const AdminTeamPage = lazy(() => import('./pages/admin/team').then(m => ({ default: m.AdminTeamPage })))
const AdminAIPage = lazy(() => import('./pages/admin/ai').then(m => ({ default: m.AdminAIPage })))
const AdminAISettingsPage = lazy(() => import('./pages/admin/ai-settings').then(m => ({ default: m.AdminAISettingsPage })))
const AdminAnalyticsPage = lazy(() => import('./pages/admin/analytics').then(m => ({ default: m.AdminAnalyticsPage })))
const AdminTeamDNAPage = lazy(() => import('./pages/admin/team-dna').then(m => ({ default: m.AdminTeamDNAPage })))

// Loading fallback для lazy компонентов
const AdminPageFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px',
    fontSize: 'var(--vk-font-size-base)',
    color: 'var(--vk-color-text-secondary)',
  }}>
    Загрузка...
  </div>
)

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainMenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="/admin" element={<AdminIndexPage />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminDashboardPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/tasks" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminTasksPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/team" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminTeamPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/ai" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminAIPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/ai-settings" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminAISettingsPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/analytics" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminAnalyticsPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/team-dna" 
          element={
            <Suspense fallback={<AdminPageFallback />}>
              <AdminTeamDNAPage />
            </Suspense>
          } 
        />
        <Route path="/ui-kit" element={<UIKitPage />} />
      </Routes>
    </Layout>
  )
}

export default App


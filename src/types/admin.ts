export type TaskStatus = 'active' | 'completed' | 'overdue'

export type RecommendationPriority = 'high' | 'medium' | 'low'

export type AdminTab = 'dashboard' | 'tasks' | 'ai' | 'analytics' | 'team' | 'ai-settings' | 'team-dna'

export interface Task {
  id: string
  employee: string
  employeeEmail: string
  task: string
  date: string
  progress: number
  maxProgress: number
  status: TaskStatus
}

export interface EmployeeLoad {
  name: string
  load: number
  maxLoad: number
}

export interface AIAnalysis {
  recommendations: number
  applied: number
}

export interface Recommendation {
  id: string
  title: string
  description: string
  priority: RecommendationPriority
  applied: boolean
}

export interface AdminStats {
  total: number
  active: number
  overdue: number
  completed: number
}




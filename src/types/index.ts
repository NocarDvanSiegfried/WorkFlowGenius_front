export interface User {
  id: number
  email: string
  name: string
  role: 'manager' | 'employee'
  current_workload?: number
  max_workload?: number
  created_at?: string
}

export interface Task {
  id: number
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  deadline?: string
  estimated_hours?: number
  created_by: number
  created_at?: string
  updated_at?: string
}

export interface Assignment {
  id: number
  task_id: number
  assigned_to: number
  assigned_by: number
  assigned_at?: string
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  workload_points: number
  completed_at?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string
}


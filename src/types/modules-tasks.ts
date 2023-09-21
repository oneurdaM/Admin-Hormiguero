export interface Module {
  id: number
  name: string
}

export interface ModuleResponse {
    data: Module[]
    total: number
    totalPages: number
    currentPage: number
    perPage: number
  }

export interface Task {
  id: number
  name: string
}

export interface TaskResponse {
    data: Task[]
    total: number
    totalPages: number
    currentPage: number
    perPage: number
  }

export interface Department {
  id: number
  number: number
  name: string
  createdAt: string
}

export interface CreateDepartment {
  Id: number
  number: number
  name: string
  createdAt: string
}

export interface DepartmentResponse {
  data: Department[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type DepartmentRegistration = {
  Id?: number
  number?: number
  name: string
  createdAt?: string | Date
  stock?: number,
  slug?: string
}

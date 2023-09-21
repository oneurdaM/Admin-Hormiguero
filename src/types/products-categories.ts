export interface ProductCategory {
  id: number
  number: number
  name: string
  createdAt: string
}

export interface CreateProductCategory {
  Id: number
  number: number
  name: string
  createdAt: string
}

export interface ProductCategoryResponse {
  data: ProductCategory[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type ProductCategoryRegistration = {
  Id?: number
  number?: number
  name: string
  createdAt?: string
  stock?: number
}

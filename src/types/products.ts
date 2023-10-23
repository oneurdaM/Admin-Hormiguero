export interface Product {
  id: number
  capacity?: number
  thumbnail: string
  title: string
  description: string
  price: number
  slug: string
  catalogId: number
}

export interface CreateProduct {
  content: string
  userId: number
  image?: string
}

export interface ProductResponse {
  data: Product[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type ProductRegistration = {
  title: string
  description: string
  thumbnail: string
  capacity?: number | null
  stock?: number | null
  price?: number | null
  slug: string
  catalogId: number | null
}

import { PaginatorInfo, QueryOptions } from '.'

export interface CategoryResponse {
  data: Category[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type Category = {
  id?: number
  slug?: string
  image?: string | null
  thumbnail?: string | null
  content?: string | null
  title?: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  is_approved?: boolean
}

export type CreateCategoryInput = {
  slug?: string
  image?: string | null
  content?: string | null
  name?: string
  is_approved?: boolean
  thumbnail?: string | null
}

export interface CategoryQueryOptions extends QueryOptions {
  search: string
}

export type CategoryPaginator = PaginatorInfo<Category>

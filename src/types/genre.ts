import { PaginatorInfo, QueryOptions } from '.'

export type Genre = {
  id?: number
  name: string
  type?: string
}

export type GenreInput = {
  name: string
  type?: string
}

export type GenrePagination = {
  data: Genre[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface GenresQueryOptions extends QueryOptions {
  search?: string
  type?: string
}

export type GenresPaginator = PaginatorInfo<Genre>

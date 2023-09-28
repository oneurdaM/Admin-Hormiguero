import { PaginatorInfo, QueryOptions } from '.'

export type Genre = {
  id?: number
  name: string
}

export type GenreInput = {
  name: string
}

export type GenrePagination = {
  genders: Genre[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface GenresQueryOptions extends QueryOptions {
  search?: string
}

export type GenresPaginator = PaginatorInfo<Genre>

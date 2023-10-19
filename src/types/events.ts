import { PaginatorInfo, QueryOptions } from '.'

export interface Event {
  id?: number
  title: string
  synopsis: string
  company: string
  dramaturgy: string
  director: string
  public?: boolean
  video?: string | null
  schedule?: string[] | []
  schedules?: string[] | []
  thumbnailUrl: string | null
  gender?: number[] | []
  cast?: number[] | []
  days?: number
  type?: string
  spaceId?: number
}

export interface EventsResponse {
  data: Event[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type EventInput = {
  name: string
  type?: string
}

export type EventPagination = {
  events: Event[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface EventsQueryOptions extends QueryOptions {
  search?: string
  type?: string
}

export type EventsPaginator = PaginatorInfo<Event>

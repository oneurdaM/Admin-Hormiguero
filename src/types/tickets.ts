import { PaginatorInfo, QueryOptions } from '.'

export interface Ticket {
  userId?: string
  name: string
  price: number
  image?: string
  dateAndHour: string
}

export interface TicketsResponse {
  data: Ticket[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type TicketInput = {
  name: string
  price?: number
}

export type TicketPagination = {
  tickets: Ticket[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface TicketsQueryOptions extends QueryOptions {
  search?: string
}

export type TicketsPaginator = PaginatorInfo<Ticket>

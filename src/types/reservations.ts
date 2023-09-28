import { SpacesResponse } from './spaces'

export interface Reservation {
  reason: string
  name: string
  email: string
  phone: string
  address: string
  effectiveFrom: string | Date
  expiresAt: string | Date
  space: number | string
}

export interface ReservationsResponse {
  id: number | string
  reason: string
  name: string
  email: string
  phone: string
  address?: string
  createdAt: string | Date
  effectiveFrom?: string | Date
  expiresAt?: string | Date
  space: SpacesResponse
  total: number
  payment: boolean
  location: string
  cost: number
  status: boolean | string
}

export type ReservationPagination = {
  data: ReservationsResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type ReservationRegistration = {
  reason: string
  name: string
  email: string
  phone: string
  address: string
  effectiveFrom: string | Date
  expiresAt: string | Date
  space?: number | string | null
}

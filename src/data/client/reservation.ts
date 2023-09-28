import { GenericQueryOptions } from '@/types'
import {
  ReservationPagination,
  ReservationRegistration,
  ReservationsResponse,
} from '@/types/reservations'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const reservationClient = {
  getReservations: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<ReservationPagination>(API_ENDPOINTS.RESERVATIONS, {
      ...params,
      search: search,
    })
  },
  getReservation: ({ id }: { id: number }) => {
    return HttpClient.get<ReservationsResponse>(
      `${API_ENDPOINTS.RESERVATIONS}/${id}`
    )
  },

  createReservation: (variables: ReservationRegistration) => {
    return HttpClient.post(API_ENDPOINTS.RESERVATIONS, variables)
  },

  updateReservation: ({
    id,
    input,
  }: {
    id: string
    input: ReservationRegistration
  }) => {
    return HttpClient.put(`${API_ENDPOINTS.RESERVATIONS}/${id}`, input)
  },

  cancelReservation: ({ id }: { id: string }) => {
    return HttpClient.delete(`${API_ENDPOINTS.RESERVATIONS}/${id}`)
  },
}

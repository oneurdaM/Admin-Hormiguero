import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { API_ENDPOINTS } from './client/api-endpoints'
import { QueryOptionsType } from '../types'
import {
  ReservationPagination,
  ReservationsResponse,
} from '@/types/reservations'
import { mapPaginatorData } from '@/utils/data-mappers'
import { reservationClient } from './client/reservation'

export const useReservationsQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<ReservationPagination, Error>(
    [API_ENDPOINTS.RESERVATIONS, params],
    () => reservationClient.getReservations(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    reservations: data?.data as ReservationsResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useReservationQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<ReservationsResponse, Error>(
    [API_ENDPOINTS.RESERVATIONS, id],
    () => reservationClient.getReservation({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    reservation: data,
    loading: isLoading,
    error,
  }
}

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(reservationClient.createReservation, {
    onSuccess() {
      toast.success('Se creó una nueva reservación')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.RESERVATIONS)
    },
  })
}

export const useUpdateReservationMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(reservationClient.updateReservation, {
    onSuccess() {
      toast.success('Se actualizó la reservación')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.RESERVATIONS)
    },
  })
}

export const useDeleteReservationMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(reservationClient.cancelReservation, {
    onSuccess: () => {
      toast.success('Se canceló la reservación')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.RESERVATIONS)
    },
  })
}

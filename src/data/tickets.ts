import {
  TicketsPaginator,
  TicketsQueryOptions,
  TicketsResponse,
  Ticket,
} from '@/types/tickets'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { ticketsClient } from './client/ticket'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type TicketByIdResponse = {
  event: Ticket
  message: string
}

export const useTicketsQuery = (options: Partial<TicketsQueryOptions>) => {
  const { data, isLoading, error } = useQuery<TicketsResponse, Error>(
    [API_ENDPOINTS.TICKETS, options],
    () => ticketsClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    tickets: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useTicketQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<TicketsPaginator, Error>(
    [API_ENDPOINTS.TICKETS, id],
    () => ticketsClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    ticket: data,
    loading: isLoading,
    error,
  }
}

export const useCreateTicketMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(ticketsClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo evento.')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.TICKETS)
    },
  })
}

export const useUpdateTicketMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(ticketsClient.update, {
    onSuccess() {
      toast.success('Se actualizó el ticket')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.TICKETS)
    },
  })
}

export const useDeleteTicketMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(ticketsClient.delete, {
    onSuccess: () => {
      toast.success('Se eleminó el evento')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.TICKETS)
    },
  })
}

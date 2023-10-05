import {
  EventsPaginator,
  EventsQueryOptions,
  EventsResponse,
} from '@/types/events'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { eventsClient } from './client/events'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type EventByIdResponse = {
  event: Event
  message: string
}

export const useEventsQuery = (options: Partial<EventsQueryOptions>) => {
  const { data, isLoading, error } = useQuery<EventsResponse, Error>(
    [API_ENDPOINTS.EVENTS, options],
    () => eventsClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    events: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useEventQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<EventsPaginator, Error>(
    [API_ENDPOINTS.EVENTS, id],
    () => eventsClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  const transformedDates: Record<string, { day: string; time: string }> = {}

  if (data) {
    for (let i = 0; i < data.schedules.length; i++) {
      const date = new Date(data.schedules[i])
      const day = date.toISOString().slice(0, 10)
      const time = date.toISOString().slice(11, 16)

      transformedDates[`date${i}`] = { day, time }
    }
  }

  return {
    event: { ...data, days: data?.schedules.length ?? 0, ...transformedDates },
    loading: isLoading,
    error,
  }
}

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(eventsClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo evento.')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS)
    },
  })
}

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(eventsClient.update, {
    onSuccess() {
      toast.success('Se actualizó el evento')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS)
    },
  })
}

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(eventsClient.delete, {
    onSuccess: () => {
      toast.success('Se eleminó el evento')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS)
    },
  })
}

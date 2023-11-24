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
    for (let i = 0; i < data?.schedules.length; i++) {
      const date = new Date(data?.schedules[i])
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

//Este dato puede tener la data del response al mandarlo a llamar en el onsucces
export const useCreateEventMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(eventsClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo evento.')
      // router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

// export const useCreateEventMutation = () => {
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   const mutation = useMutation(eventsClient.register, {
//     onSuccess: (data) => {
//       toast.success('Se creó un nuevo evento.')
//       // Puedes acceder al resultado de la mutación a través de la variable 'data'
//       // router.back()
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.EVENTS)
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
//     },
//   })

//   return mutation
// }

export const validateSpaceEventMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(eventsClient.validateDateSpace, {
    onSuccess() {
      //  toast.success('Se creó un nuevo evento.')
      // router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VALIDATE_DATE)
    },
    onError: (error: any) => {
      const date = error.response.data.data.startDate
      const dateFormat =
        date.split('T')[0] + ' ' + date.split('T')[1].split('.')[0]
      toast.error(
        'Fecha invalida, el dia y la hora ' +
          dateFormat +
          ' tienen evento para ' +
          error.response.data.data.spaceId
      )
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
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
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
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

export const useCreateSpaceEventMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(eventsClient.spaceEvent, {
    onSuccess() {
      toast.success('Se logro.')
      // router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACE_EVENT)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

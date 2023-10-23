import { useQuery, useQueryClient, useMutation } from 'react-query'
import { CastsQueryOptions, CastsPagination, Cast } from '@/types/casts'
import { mapPaginatorData } from '@/utils/data-mappers'
import { API_ENDPOINTS } from './client/api-endpoints'
import { castsClient } from './client/casts'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export type CastByIdResponse = {
  cast: Cast
  message: string
}

export const useCastsQuery = (options: Partial<CastsQueryOptions>) => {
  const { data, isLoading, error } = useQuery<CastsPagination, Error>(
    [API_ENDPOINTS.CAST, options],
    () => castsClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    casts: data?.casts,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useCastQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<CastsPagination, Error>(
    [API_ENDPOINTS.CAST, id],
    () => castsClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    cast: data,
    loading: isLoading,
    error,
  }
}

export const useCreateCastMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(castsClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo miembro del elenco.')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CAST)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useUpdateCastMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(castsClient.update, {
    onSuccess() {
      toast.success('Se actualizó el miembro del elenco')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CAST)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useDeleteCastMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(castsClient.delete, {
    onSuccess: () => {
      toast.success('Se eleminó el miembro del elenco')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CAST)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

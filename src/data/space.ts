import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { API_ENDPOINTS } from './client/api-endpoints'
import { spaceClient } from './client/space'
import { QueryOptionsType } from '../types'
import { SpacePagination, SpacesResponse } from '@/types/spaces'
import { mapPaginatorData } from '@/utils/data-mappers'

export const useSpacesQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<SpacePagination, Error>(
    [API_ENDPOINTS.SPACES, params],
    () => spaceClient.getSpaces(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    spaces: data?.data as SpacesResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useSpaceQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<SpacesResponse, Error>(
    [API_ENDPOINTS.SPACES, id],
    () => spaceClient.getSpace({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    space: data,
    loading: isLoading,
    error,
  }
}

export const useCreateSpaceMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(spaceClient.createSpace, {
    onSuccess() {
      toast.success('Se creó un nuevo espacio')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useUpdateSpaceMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(spaceClient.updateSpace, {
    onSuccess() {
      toast.success('Se actualizó la información del espacio')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualzar'
      )
    },
  })
}

export const useDeleteSpaceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(spaceClient.deleteSpace, {
    onSuccess: () => {
      toast.success('Se eliminó el espacio')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

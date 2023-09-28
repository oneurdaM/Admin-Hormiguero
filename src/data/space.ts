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
  })
}

// export const useUnblockUserMutation = () => {
//   const queryClient = useQueryClient()

//   return useMutation(spaceClient.unblock, {
//     onSuccess() {
//       toast.success('Usuario desbloqueado')
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.USERS)
//     },
//   })
// }

// export const useBlockUserMutation = () => {
//   const queryClient = useQueryClient()

//   return useMutation(spaceClient.block, {
//     onSuccess() {
//       toast.success('Usuario bloqueado')
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.USERS)
//     },
//   })
// }

export const useDeleteSpaceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(spaceClient.deleteSpace, {
    onSuccess: () => {
      toast.success('Se eliminó el espacio')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
  })
}

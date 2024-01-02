/* eslint-disable @typescript-eslint/no-explicit-any */
import { BannerResponse, Banner } from '@/types/banner'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { bannerClient } from './client/banner'
import { useRouter } from 'next/router'
import { blogClient } from './client/blog'

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(bannerClient.create, {
    onSuccess: () => {
      toast.success('Se creó un nuevo banner')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useBannersQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<BannerResponse, Error>(
    [API_ENDPOINTS.BLOG, options],
    () => bannerClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  const pagination = {
    total: data?.total ? parseInt(data.total.toString()) : 0,
    currentPage: data?.currentPage ? parseInt(data.currentPage.toString()) : 1,
    totalPages: data?.totalPages ? parseInt(data.totalPages.toString()) : 0,
    perPage: data?.perPage ? parseInt(data.perPage.toString()) : 0,
  }

  return {
    banner: data?.data as Banner[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(pagination as any),
    error,
  }
}

export const useUpdateBannerMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(bannerClient.update, {
    onSuccess: () => {
      toast.success('Se actualizó la nota.')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useBannerQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<BannerResponse, Error>(
    [API_ENDPOINTS.BANNER, id],
    () => bannerClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    banner: data,
    loading: isLoading,
    error,
  }
}

export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(bannerClient.delete, {
    onSuccess: () => {
      toast.success('Se eliminó la nota')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { blogClient } from './client/blog'
import { useRouter } from 'next/router'

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(blogClient.create, {
    onSuccess: () => {
      toast.success('Se creó una nueva nota')
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

export const useNotesQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<BlogResponse, Error>(
    [API_ENDPOINTS.BLOG, options],
    () => blogClient.paginated(options),
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
    notes: data?.notes as Note[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(pagination as any),
    error,
  }
}

export const useNoteQuery = ({ slug }: { slug: string }) => {
  return useQuery<Note, Error>([API_ENDPOINTS.BLOG, slug], () =>
    blogClient.bySlug({ slug })
  )
}

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(blogClient.update, {
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

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(blogClient.delete, {
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

import {
  Category,
  CategoryPaginator,
  CategoryQueryOptions,
  CategoryResponse,
} from '@/types/category'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { categoryClient } from './client/category'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type BlogCategoryResponse = {
  data: Category
  message: string
}

export const useCategoriesQuery = (options: Partial<CategoryQueryOptions>) => {
  const { data, isLoading, error } = useQuery<CategoryPaginator, Error>(
    [API_ENDPOINTS.CATEGORY, options],
    () => categoryClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    categories: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useCategoryQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<BlogCategoryResponse, Error>(
    [API_ENDPOINTS.CATEGORY, id],
    () => categoryClient.byID({ id }),
    {
      keepPreviousData: true,
    }
  )
  return {
    category: data,
    loading: isLoading,
    error,
  }
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(categoryClient.create, {
    onSuccess: () => {
      toast.success('Se ha creado la categoría correctamente')
      router.back()
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(categoryClient.update, {
    onSuccess: () => {
      toast.success('Se actualizó la categoría')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(categoryClient.delete, {
    onSuccess: () => {
      toast.success('Se eliminó la cateogría')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

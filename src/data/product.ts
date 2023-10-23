/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductResponse } from '@/types/products'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { productClient } from './client/product'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type ProductByIdResponse = {
  product: Product
  message: string
}

export const useProductsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<ProductResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    () => productClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    products: data?.data as Product[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useProductQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<ProductByIdResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, id],
    () => productClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    product: data,
    loading: isLoading,
    error,
  }
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(productClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo producto')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(productClient.update, {
    onSuccess() {
      toast.success('Se actualizó el producto')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(productClient.delete, {
    onSuccess: () => {
      toast.success('Se eliminó el producto')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

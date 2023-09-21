/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductResponse } from '@/types/products'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { productClient } from './client/product'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'

export type ProductByIdResponse = {
  product: Product
  message: string
}

export const useProductsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<ProductResponse, Error>(
    [API_ENDPOINTS, options],
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

  return useMutation(productClient.register, {
    onSuccess() {
      toast.success('Product created successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
  })
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(productClient.update, {
    onSuccess() {
      toast.success('Product updated successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(productClient.delete, {
    onSuccess: () => {
      toast.success('Product deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS)
    },
  })
}

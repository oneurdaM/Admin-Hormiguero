/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ProductCategory,
  ProductCategoryResponse,
} from '@/types/products-categories'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { productCategoryClient } from './client/product-category'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'

export const useProductsCategoriesQuery = (
  options: Partial<QueryOptionsType>
) => {
  const { data, isLoading, error } = useQuery<ProductCategoryResponse, Error>(
    [API_ENDPOINTS, options],
    () => productCategoryClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    productsCategories: data?.data as ProductCategory[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export type ProductCategoryByIdResponse = {
  productCategory: ProductCategory
  message: string
}

export const useProductCategoryQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<
    ProductCategoryByIdResponse,
    Error
  >([API_ENDPOINTS.PRODUCTS, id], () => productCategoryClient.byId({ id }), {
    keepPreviousData: true,
  })

  return {
    catalog: data,
    loading: isLoading,
    error,
  }
}

export const useCreateProductCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(productCategoryClient.register, {
    onSuccess() {
      toast.success('Se creó una nueva categoría')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS_CATEGORIES)
    },
  })
}

export const useUpdateProductCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(productCategoryClient.update, {
    onSuccess() {
      toast.success('Category updated successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS_CATEGORIES)
    },
  })
}

export const useDeleteProductCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(productCategoryClient.delete, {
    onSuccess: () => {
      toast.success('Category deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS_CATEGORIES)
    },
  })
}
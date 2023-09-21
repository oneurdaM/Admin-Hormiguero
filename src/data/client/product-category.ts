import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import {
  ProductCategoryResponse,
  ProductCategoryRegistration,
} from '@/types/products-categories'
import { ProductCategoryByIdResponse } from '../product-category'

export const productCategoryClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<ProductCategoryResponse>(
      API_ENDPOINTS.PRODUCTS_CATEGORIES,
      {
        ...params,
        search: search,
      }
    )
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<ProductCategoryByIdResponse>(
      `${API_ENDPOINTS.PRODUCTS_CATEGORIES}/${id}`
    )
  },

  register: (variables: ProductCategoryRegistration) => {
    return HttpClient.post(API_ENDPOINTS.PRODUCTS_CATEGORIES, variables)
  },

  update: ({
    id,
    input,
  }: {
    id: string
    input: ProductCategoryRegistration
  }) => {
    return HttpClient.put(`${API_ENDPOINTS.PRODUCTS_CATEGORIES}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.PRODUCTS_CATEGORIES}/${id}`)
  },
}

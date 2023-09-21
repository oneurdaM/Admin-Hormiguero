import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { ProductResponse, ProductRegistration } from '@/types/products'
import { ProductByIdResponse } from '../product'

export const productClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<ProductResponse>(API_ENDPOINTS.PRODUCTS, {
      ...params,
      search: search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<ProductByIdResponse>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`
    )
  },

  register: (variables: ProductRegistration) => {
    return HttpClient.post(API_ENDPOINTS.PRODUCTS, variables)
  },

  update: ({ id, input }: { id: string; input: ProductRegistration }) => {
    return HttpClient.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, input)
  },

  delete: (id:number) => {
    return HttpClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)
  }
}

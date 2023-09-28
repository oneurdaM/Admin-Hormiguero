import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { OrderResponse, OrderRegistration } from '@/types/orders'
import { OrderQueryResponse } from '../order'

export const orderClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<OrderResponse>(API_ENDPOINTS.ORDERS, {
      ...params,
      search: search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<OrderQueryResponse>(`${API_ENDPOINTS.ORDERS}/${id}`)
  },

  register: (variables: OrderRegistration) => {
    return HttpClient.post(API_ENDPOINTS.ORDERS, variables)
  },

  update: ({ id, input }: { id: number; input: OrderRegistration }) => {
    return HttpClient.put(`${API_ENDPOINTS.ORDERS}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.ORDERS}/${id}`)
  },
}

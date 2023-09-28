import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { AlertResponse, AlertRegistration } from '@/types/alerts'
import { AlertQueryResponse } from '../alert'

export const alertClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<AlertResponse>(API_ENDPOINTS.ALERTS, {
      ...params,
      search: search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<AlertQueryResponse>(`${API_ENDPOINTS.ALERTS}/${id}`)
  },

  register: (variables: AlertRegistration) => {
    return HttpClient.post(API_ENDPOINTS.ALERTS, variables)
  },

  update: ({ id, input }: { id: number; input: AlertRegistration }) => {
    return HttpClient.put(`${API_ENDPOINTS.ALERTS}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.ALERTS}/${id}`)
  },
}

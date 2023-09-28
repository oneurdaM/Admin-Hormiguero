import { QueryOptions } from '@/types'
import {
  CastsPagination,
  CastsQueryOptions,
  CastsResponse,
  CastInput,
} from '@/types/casts'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const castsClient = {
  paginated: ({ search, ...params }: Partial<CastsQueryOptions>) => {
    return HttpClient.get<CastsPagination>(API_ENDPOINTS.CAST, {
      ...params,
      search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<CastsPagination>(`${API_ENDPOINTS.CAST}/${id}`)
  },

  register: (variables: CastInput) => {
    return HttpClient.post(API_ENDPOINTS.CAST, variables)
  },

  update: ({ id, input }: { id: string; input: CastsPagination }) => {
    return HttpClient.put(`${API_ENDPOINTS.CAST}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.CAST}/${id}`)
  },
}

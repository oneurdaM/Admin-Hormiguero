import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import {
  DepartmentResponse,
  DepartmentRegistration,
} from '@/types/department'
import { DepartmentByIdResponse } from '../department'

export const DepartmentClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<DepartmentResponse>(
      API_ENDPOINTS.DEPARTMENTS,
      {
        ...params,
        search: search,
      }
    )
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<DepartmentByIdResponse>(
      `${API_ENDPOINTS.DEPARTMENTS}/${id}`
    )
  },

  register: (variables: DepartmentRegistration) => {
    return HttpClient.post(API_ENDPOINTS.DEPARTMENTS, variables)
  },

  update: ({
    id,
    input,
  }: {
    id: string
    input: DepartmentRegistration
  }) => {
    return HttpClient.put(`${API_ENDPOINTS.DEPARTMENTS}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.DEPARTMENTS}/${id}`)
  },
}

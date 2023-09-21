import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { NoticeResponse, NoticeRegistration } from '@/types/notices'
import { NoticResponse } from '../notice'

export const noticeClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<NoticeResponse>(API_ENDPOINTS.NOTICE, {
      ...params,
      search: search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<NoticResponse>(`${API_ENDPOINTS.NOTICE}/${id}`)
  },

  register: (variables: NoticeRegistration) => {
    return HttpClient.post(API_ENDPOINTS.NOTICE, variables)
  },

  update: ({ id, input }: { id: string; input: NoticeRegistration }) => {
    return HttpClient.put(`${API_ENDPOINTS.NOTICE}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.NOTICE}/${id}`)
  },
}

import { HttpClient } from '@/data/client/http-client'
import { QueryOptions } from '@/types'
import { EventsPaginator, EventsResponse, Event } from '@/types/events'
import { API_ENDPOINTS } from './api-endpoints'

export const eventsClient = {
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<EventsResponse>(API_ENDPOINTS.EVENTS, {
      ...params,
      search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<EventsPaginator>(`${API_ENDPOINTS.EVENTS}/${id}`)
  },

  register: (variables: Event) => {
    return HttpClient.post(API_ENDPOINTS.EVENTS, variables)
  },

  update: ({ id, input }: { id: string; input: Event }) => {
    console.log('llegue aqui', input)
    return HttpClient.put(`${API_ENDPOINTS.EVENTS}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.EVENTS}/${id}`)
  },

  spaceEvent: (variables: Event) => {
    return HttpClient.post(API_ENDPOINTS.SPACE_EVENT, variables)
  },
  validateDateSpace: (variables: Event) => {
    return HttpClient.post(API_ENDPOINTS.VALIDATE_DATE, variables)
  },
}

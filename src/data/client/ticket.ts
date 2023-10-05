import { HttpClient } from '@/data/client/http-client'
import { QueryOptions } from '@/types'
import { TicketsPaginator, TicketsResponse, Ticket } from '@/types/tickets'
import { API_ENDPOINTS } from './api-endpoints'

export const ticketsClient = {
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<TicketsResponse>(API_ENDPOINTS.TICKETS, {
      ...params,
      search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<TicketsPaginator>(`${API_ENDPOINTS.TICKETS}/${id}`)
  },

  register: (variables: Ticket) => {
    // console.log(variables)
    return HttpClient.post(API_ENDPOINTS.TICKETS, variables)
  },

  update: ({ id, input }: { id: string; input: Ticket }) => {
    return HttpClient.put(`${API_ENDPOINTS.TICKETS}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.TICKETS}/${id}`)
  },
}

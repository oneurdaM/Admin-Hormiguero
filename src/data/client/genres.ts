import { QueryOptions } from '@/types'
import { GenrePagination, GenresQueryOptions, GenreInput } from '@/types/genre'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const genresClient = {
  paginated: ({ search, ...params }: Partial<GenresQueryOptions>) => {
    return HttpClient.get<GenrePagination>(API_ENDPOINTS.GENRE, {
      ...params,
      search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<GenrePagination>(`${API_ENDPOINTS.GENRE}/${id}`)
  },

  register: (variables: GenreInput) => {
    return HttpClient.post(API_ENDPOINTS.GENRE, variables)
  },

  update: ({ id, input }: { id: string; input: GenreInput }) => {
    return HttpClient.put(`${API_ENDPOINTS.GENRE}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.GENRE}/${id}`)
  },
}

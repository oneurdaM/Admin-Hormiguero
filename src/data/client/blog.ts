import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { HttpClient } from '@/data/client/http-client'
import { BlogResponse, CreateNote, Note } from '@/types/blog'
import { QueryOptions } from '@/types/index'
import { crudFactory } from './crud-factory'

export const blogClient = {
  ...crudFactory<Note, QueryOptions, CreateNote>(API_ENDPOINTS.BLOG),
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<BlogResponse>(API_ENDPOINTS.BLOG, {
      ...params,
      search,
    })
  },
}

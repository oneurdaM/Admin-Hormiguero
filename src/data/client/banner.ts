/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { HttpClient } from '@/data/client/http-client'
import { QueryOptions } from '@/types'
import { crudFactory } from './crud-factory'
import { BannerResponse, CreateNote, Banner } from '@/types/banner'

export const bannerClient = {
  ...crudFactory<Banner, QueryOptions, CreateNote>(API_ENDPOINTS.BANNER),
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<BannerResponse>(API_ENDPOINTS.BANNER, {
      ...params,
      search,
    })
  },

  byId: ({ id }: { id: number }) => {
    return HttpClient.get<BannerResponse>(`${API_ENDPOINTS.BANNER}/${id}`)
  },
}

import { GenericQueryOptions } from '@/types'
import {
  SpacePagination,
  SpaceRegistration,
  SpacesResponse,
  BlockSpaceInput,
} from '@/types/spaces'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const spaceClient = {
  getSpaces: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<SpacePagination>(API_ENDPOINTS.SPACES, {
      ...params,
      search: search,
    })
  },
  getSpace: ({ id }: { id: number }) => {
    return HttpClient.get<SpacesResponse>(`${API_ENDPOINTS.SPACES}/${id}`)
  },

  createSpace: (variables: SpaceRegistration) => {
    return HttpClient.post(API_ENDPOINTS.SPACES, variables)
  },

  updateSpace: ({ id, input }: { id: string; input: SpacesResponse }) => {
    return HttpClient.put(`${API_ENDPOINTS.SPACES}/${id}`, input)
  },

  deleteSpace: (id: string) => {
    return HttpClient.delete(`${API_ENDPOINTS.SPACES}/spaces/${id}`)
  },

  unblock: (variables: BlockSpaceInput) => {
    return HttpClient.put(
      `${API_ENDPOINTS.SPACES}/activar/${variables.id}`,
      variables
    )
  },
  block: (variables: BlockSpaceInput) => {
    return HttpClient.put(
      `${API_ENDPOINTS.SPACES}/activar/${variables.id}`,
      variables
    )
  },

  // toggleSpace: (variables: ReserveSpace) => {
  //   return HttpClient.put(
  //     `${API_ENDPOINTS.SPACES}/${variables.id}/togle`,
  //     variables
  //   )
  // },
}

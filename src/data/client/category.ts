import {
  Category,
  CategoryPaginator,
  CategoryQueryOptions,
  CreateCategoryInput,
} from '@/types/category'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'
import { BlogCategoryResponse } from '../category'

export const categoryClient = {
  ...crudFactory<Category, QueryOptions, CreateCategoryInput>(
    API_ENDPOINTS.CATEGORY
  ),

  pagination: ({ search, ...params }: Partial<CategoryQueryOptions>) => {
    return HttpClient.get<CategoryPaginator>(API_ENDPOINTS.CATEGORY, {
      ...params,
      search,
    })
  },

  byID({ id }: { id?: number }) {
    return HttpClient.get<BlogCategoryResponse>(
      `${API_ENDPOINTS.CATEGORY}/${id}`
    )
  },

  update: ({ id, input }: { id: number; input: CreateCategoryInput }) => {
    return HttpClient.put(`${API_ENDPOINTS.CATEGORY}/${id}`, input)
  },

  delete: (id: number) => {
    return HttpClient.delete(`${API_ENDPOINTS.CATEGORY}/${id}`)
  },
}

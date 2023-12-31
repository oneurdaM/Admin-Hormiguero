import type { PaginatorInfo } from '@/types'
import { HttpClient } from './http-client'

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    get() {
      return HttpClient.get<Type>(`${endpoint}`)
    },
    bySlug({ slug }: { slug?: string }) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`)
    },
    create(data: InputType | any) {
      console.log(data)
      return HttpClient.post<Type>(endpoint, data)
    },
    update({ id, ...input }: Partial<InputType> & { id: number }) {
      console.log(id, input)
      return HttpClient.put<Type>(`${endpoint}/${id}`, input)
    },
    delete(id: number) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    },
  }
}

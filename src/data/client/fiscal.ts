/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { HttpClient } from '@/data/client/http-client'
import { QueryOptions } from '@/types'
import { crudFactory } from './crud-factory'
import {
  FiscalResponse,
  CreateFiscal,
  Fiscal,
  FiscalPaginator,
} from '@/types/fiscal'

export const fiscalClient = {
  ...crudFactory<Fiscal, QueryOptions, CreateFiscal>(API_ENDPOINTS.FISCALGET),
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<FiscalResponse>(API_ENDPOINTS.FISCALGET, {
      ...params,
      search,
    })
  },
  byId: ({ id }: { id: number }) => {
    return HttpClient.get<FiscalResponse>(`${API_ENDPOINTS.FISCALGET}/${id}`)
  },
  createP(data: CreateFiscal | any) {
    console.log(data)
    return HttpClient.post<FiscalResponse>(
      API_ENDPOINTS.FISCALGET + '/createDatosFiscales',
      data
    )
  },
}

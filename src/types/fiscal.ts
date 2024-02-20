import { PaginatorInfo, QueryOptions } from '.'

export interface FiscalResponse {
  fiscal: Fiscal[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface Fiscal {
  id: number
  contribuyente: string
  razonSocial: string
  rfc: string
  domicilio: string
  firmaElectronica: string
  selloDigital: string
}

export interface CreateFiscal {
  fiscald?: number
  contribuyente: string
  razonSocial: string
  rfc: string
  domicilio: string
  firmaElectronica: string
  selloDigital: string
}

export type FiscalPaginator = PaginatorInfo<Fiscal>

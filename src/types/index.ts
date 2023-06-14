/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import { Alert } from './alerts'
import { Role, UsersResponse as User } from './users'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface LocationInput {
  lat?: number
  lng?: number
  city?: string
  state?: string
  country?: string
  zip?: string
  formattedAddress?: string
}

export interface MakeRoleInput {
  id: number
  role: Role
}
export interface BlockUserInput {
  id: number
  banned: boolean
}

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
  search?: string
}

export interface Attachment {
  thumbnail: string
  original: string
  id?: string
}

export interface UserQueryOptions extends QueryOptions {
  search: string
}

export interface PaginatorInfo<T> {
  data: T[]
  totalPages: number
  total: number
  currentPage: number
  perPage: number
  hasMorePages: boolean
}
export interface MappedPaginatorInfo {
  data: any[]
  totalPages: number
  total: number
  currentPage: number
  perPage: number
  hasMorePages: boolean
}

export interface LoginInput {
  identifier: string
  password: string
}

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export interface PaginationUserOptions {
  page?: number
  limit?: number
  search?: string
}

export type QueryOptionsType = {
  page?: number
  search?: string
  limit?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export type UserPaginator = PaginatorInfo<User>
export type AlertPaginator = PaginatorInfo<Alert>

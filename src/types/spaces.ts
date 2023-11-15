export interface Space {
  id?: number | string
  dimensions: string | number
  capacity: number
  price: number
  active: boolean
  location: string
  image: string
}

export interface SpacesResponse {
  id?: number | string
  dimensions: string | number
  capacity: number
  price: number
  active: boolean
  location: string
  image: string
}

export type SpacePagination = {
  data: SpacesResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type SpaceRegistration = {
  id?: number | string
  dimensions?: string | number
  capacity?: number
  price?: number
  location?: string
  active?: boolean
}

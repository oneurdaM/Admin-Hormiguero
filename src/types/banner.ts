export interface BannerResponse {
  banner: Banner[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface Banner {
  id: number
  thumbnailUrl: string
  title: string
  description: string
}

export interface CreateNote {
  bannerId?: number
  thumbnailUrl: string
  title: string
  description: string
}

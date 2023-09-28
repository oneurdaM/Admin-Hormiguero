export interface Order {
  id: string | number
  createdAt: Date | string | null
  deliverDate?: Date | string | null
  status?: string | null

  category: string
  name: string
  email: string
  phone: string
  address: string
  total: number
}

export interface CreateOrder {
  content: string
  userId: number
  image?: string
}

export enum OrderStatus {
  Dispatch = 'DISPATCH',
  Pending = 'PENDING',
  Complete = 'COMPLETE',
}

export interface OrderResponse {
  data: Order[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type OrderRegistration = {
  id: string | number
  createdAt: Date | string | null
  deliverDate?: Date | string | null
  status?: string | null

  category: string
  name: string
  email: string
  phone: string
  address: string
  total: number
}

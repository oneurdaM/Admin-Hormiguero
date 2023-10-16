export interface UsersResponse {
  id: number
  username: string
  email: string
  firstName: string
  middleName?: string | null
  lastName: string
  image?: string | null
  emailVerified?: boolean
  birthDate?: null | string
  registrationDate?: Date
  lastSeen?: Date
  role: string
  banned: boolean
  online?: boolean

  // oneSignalId?: null
}

export interface Tracking {
  id: number
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
  userId: number
}

export enum Role {
  // User = 'USER',
  Director = 'DIRECTOR',
  Coordination = 'COORDINATOR',
  Communication = 'COMMUNICATOR',
  Technicalarea = 'TECHNICIAN',
  Cafeteria = 'BARTENDER',
}

export type UserPagination = {
  users: UsersResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type UserRegistration = {
  email: string
  username: string
  password: string
  firstName: string
  middleName?: string | null
  lastName?: string
  birthDate?: string
  role?: string | null
}

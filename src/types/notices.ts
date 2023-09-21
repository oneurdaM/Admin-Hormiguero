export interface Notice {
  creator?: string
  notice: string
  description?: string
  effectiveFrom: string
  expiredAt: string
  notifies_to: number | null
  days: string[]
  schedules?: string
  is_approved?: boolean
  type?: string
  priority?: string
}

export interface CreateNotice {
  content: string
  userId: number
  image?: string
}

export enum NoticeStatus {
  Created = 'CREATED',
  UnderReview = 'UNDER_REVIEW',
  Solved = 'SOLVED',
  Rejected = 'REJECTED',
  FalseAlarm = 'FALSE_ALARM',
}

export enum RepeatNotice {
  daily = 'DAY',
  weekly = 'WEEK',
  monthly = 'MONTH',
  event = 'EVENT',
  custom = 'CUSTOM',
}

export interface NoticeResponse {
  data: Notice[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type NoticeRegistration = {
  creator?: string
  notice: string
  description?: string
  effectiveFrom: string
  expiredAt: string
  notifies_to: number | null
  days: string[]
  schedules?: string
  is_approved?: boolean
  type?: string
  priority?: string
}

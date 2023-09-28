export interface Alert {
  creator?: string
  alert: string
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

export interface CreateAlert {
  content: string
  userId: number
  image?: string
}

export enum AlertStatus {
  Created = 'CREATED',
  UnderReview = 'UNDER_REVIEW',
  Solved = 'SOLVED',
  Rejected = 'REJECTED',
  FalseAlarm = 'FALSE_ALARM',
}

export enum RepeatAlert {
  daily = 'DAY',
  weekly = 'WEEK',
  monthly = 'MONTH',
  event = 'EVENT',
  custom = 'CUSTOM',
}

export interface AlertResponse {
  data: Alert[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type AlertRegistration = {
  creator?: string
  alert: string
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

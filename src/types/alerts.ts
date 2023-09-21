export interface Alert {
  id: number
  description: string
  alertName: string
  module: string
  task: string
  repeat: RepeatAlert
  dateRange: {
    start: string
    end: string
  }
  userCreates?: {
    email: string
    id: number
    name: string
  }
  userReceives?: {
    email: string
    id: number
    name: string
  }
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

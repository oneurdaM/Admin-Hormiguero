/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertResponse } from '@/types/alerts'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { alertClient } from './client/alert'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type AlertQueryResponse = {
  data: Alert
  message: string
}

export const useAlertsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<AlertResponse, Error>(
    [API_ENDPOINTS, options],
    () => alertClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    alerts: data?.data as Alert[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
    data,
  }
}

export const useAlertQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<AlertQueryResponse, Error>(
    [API_ENDPOINTS.ALERTS, id],
    () => alertClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )
  return {
    Alert: data?.data,
    loading: isLoading,
    error,
  }
}

export const useCreateAlertMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(alertClient.register, {
    onSuccess() {
      toast.success('Alert created successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
  })
}

export const useUpdateAlertMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(alertClient.update, {
    onSuccess() {
      toast.success('Alert updated successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
  })
}

export const useDeleteAlertMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(alertClient.delete, {
    onSuccess: () => {
      toast.success('Alert deleted successfully')
      router.reload()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
  })
}

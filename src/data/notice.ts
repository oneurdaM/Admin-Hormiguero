/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notice, NoticeResponse } from '@/types/notices'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { noticeClient } from './client/notice'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'
import { NoticeRegistration } from '@/types/notices'

export type NoticResponse = {
  data: Notice
  message: string
}

export const useNoticesQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<NoticeResponse, Error>(
    [API_ENDPOINTS, options],
    () => noticeClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    alerts: data?.data as Notice[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
    data,
  }
}

export const useNoticeQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<NoticResponse, Error>(
    [API_ENDPOINTS.NOTICE, id],
    () => noticeClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )
  return {
    notice: data?.data,
    loading: isLoading,
    error,
  }
}

export const useCreateNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(noticeClient.register, {
    onSuccess() {
      toast.success('Notice created successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.NOTICE)
    },
  })
}

export const useUpdateNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(noticeClient.update, {
    onSuccess() {
      toast.success('Notice updated successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.NOTICE)
    },
  })
}

export const useDeleteNoticeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(noticeClient.delete, {
    onSuccess: () => {
      toast.success('Notice deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.NOTICE)
    },
  })
}

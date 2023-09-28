/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderResponse } from '@/types/orders'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { orderClient } from './client/order'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type OrderQueryResponse = {
  data: Order
  message: string
}

export const useOrdersQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<OrderResponse, Error>(
    [API_ENDPOINTS, options],
    () => orderClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    orders: data?.data as Order[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
    data,
  }
}

export const useOrderQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<OrderQueryResponse, Error>(
    [API_ENDPOINTS.NOTICE, id],
    () => orderClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )
  return {
    order: data?.data,
    loading: isLoading,
    error,
  }
}

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(orderClient.update, {
    onSuccess() {
      toast.success('Notice updated successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.NOTICE)
    },
  })
}

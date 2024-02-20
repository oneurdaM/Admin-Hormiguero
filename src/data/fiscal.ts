/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { fiscalClient } from './client/fiscal'
import { useRouter } from 'next/router'
import { Fiscal, FiscalResponse } from '@/types/fiscal'

export const useCreateFiscalMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(fiscalClient.createP, {
    onSuccess: () => {
      toast.success('Se crearon los datos fiscales')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.FISCALGET)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useFiscalMutation = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<FiscalResponse, Error>(
    [API_ENDPOINTS.FISCALGET, id],
    () => fiscalClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )
  let dataFiscal
  if (data) {
    //@ts-ignore
    dataFiscal = data[0]
  }

  return {
    fiscalr: dataFiscal,
    loading: isLoading,
    error,
  }
}

export const useUpdateFiscalMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(fiscalClient.update, {
    onSuccess: () => {
      toast.success('Se actualizaron los datos .')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.FISCALGET)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(fiscalClient.delete, {
    onSuccess: () => {
      toast.success('Se eliminó la nota')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

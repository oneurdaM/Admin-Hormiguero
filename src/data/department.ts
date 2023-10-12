/* eslint-disable @typescript-eslint/no-explicit-any */
import { Department, DepartmentResponse } from '@/types/department'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { QueryOptionsType } from '../types'
import { DepartmentClient } from './client/department'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type DepartmentByIdResponse = {
  Department: Department
  message: string
}

export const useDepartmentsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<DepartmentResponse, Error>(
    [API_ENDPOINTS, options],
    () => DepartmentClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    departments: data?.data as Department[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useDepartmentQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<DepartmentByIdResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, id],
    () => DepartmentClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    department: data,
    loading: isLoading,
    error,
  }
}

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(DepartmentClient.register, {
    onSuccess() {
      toast.success('Se creó una nueva categoría')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DEPARTMENTS)
    },
  })
}

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(DepartmentClient.update, {
    onSuccess() {
      toast.success('Category updated successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DEPARTMENTS)
    },
  })
}

export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(DepartmentClient.delete, {
    onSuccess: () => {
      toast.success('Category deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DEPARTMENTS)
    },
  })
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPagination, UsersResponse } from '@/types/users'
import { AUTH_CRED } from '@/utils/constants'
import { mapPaginatorData } from '@/utils/data-mappers'
import Cookies from 'js-cookie'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { userClient } from './client/user'
import { useRouter } from 'next/router'

export const useUsersQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPagination, Error>(
    [API_ENDPOINTS.USERS, params],
    () => userClient.fetchUsers(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    users: data?.users as UsersResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(userClient.update, {
    onSuccess() {
      toast.success('Se actualizó la información de usuario')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(userClient.changePassword, {
    onSuccess() {
      toast.success('Se actualizó la contraseña')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME)
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(userClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo usuario')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER)
    },
  })
}

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.unblock, {
    onSuccess() {
      toast.success('Usuario desbloqueado')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.block, {
    onSuccess() {
      toast.success('Usuario bloqueado')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export function useLogin() {
  return useMutation(userClient.login)
}

export const useMeQuery = () => {
  return useQuery<UsersResponse, Error>([API_ENDPOINTS.ME], userClient.me)
}

export const useLogoutMutation = () => {
  Cookies.remove(AUTH_CRED)
  return {
    message: 'Logged out successfully',
  }
}

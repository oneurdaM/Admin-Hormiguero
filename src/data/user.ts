import { useQuery, useMutation, useQueryClient } from 'react-query'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { API_ENDPOINTS } from './client/api-endpoints'
import { userClient } from './client/user'
import { AUTH_CRED } from '@/utils/constants'
import { Routes } from '@/config/routes'
import { UsersResponse } from '@/types/users'

export function useLogin() {
  return useMutation(userClient.login)
}

export const useMeQuery = () => {
  return useQuery<UsersResponse, Error>([API_ENDPOINTS.ME], userClient.me)
}

export const useLogoutMutation = () => {
  const router = useRouter()
  const { t } = useTranslation()
  Cookies.remove(AUTH_CRED)
  router.replace(Routes.login)
  toast.success(t('common:successfully-logout'))
  return {
    isSuccess: true,
  }
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(userClient.update, {
    onSuccess() {
      toast.success('User updated successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME)
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useForgetPasswordMutation = () => {
  return useMutation(userClient.forgetPassword, {
    onSuccess() {
      toast.success('Se envió el enlace a su e-mail')
    },
  })
}

export const useResetPasswordMutation = () => {
  return useMutation(userClient.resetPassword)
}

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation(userClient.verifyForgetPasswordToken)
}

export const useUserQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<UsersResponse, Error>(
    [API_ENDPOINTS.USERS, id],
    () => userClient.get({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    user: data,
    loading: isLoading,
    error,
  }
}

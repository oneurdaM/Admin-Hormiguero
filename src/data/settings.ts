import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { API_ENDPOINTS } from './client/api-endpoints'
import { settingsClient } from './client/settings'
import { useSettings } from '@/contexts/settings.context'

export const useUpdateSettingsMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { updateSettings } = useSettings()

  return useMutation(settingsClient.update, {
    onSuccess: (data) => {
      updateSettings(data?.options)
      toast.success(t('common:successfully-updated'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualizar'
      )
    },
  })
}

export const useSettingsQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>(
    API_ENDPOINTS.SETTINGS,
    settingsClient.get,
    {
      onError: (error) => {
        console.log(error)
      },
    }
  )

  return {
    settings: data?.data ?? {},
    error,
    loading: isLoading,
  }
}

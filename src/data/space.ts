import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { getAuthCredentials } from '@/utils/auth-utils'
import { API_ENDPOINTS } from './client/api-endpoints'
import { spaceClient } from './client/space'
import { QueryOptionsType } from '../types'
import { SpacePagination, SpacesResponse } from '@/types/spaces'
import { mapPaginatorData } from '@/utils/data-mappers'
import moment from 'moment'
import axios from 'axios'

export const useSpacesQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<SpacePagination, Error>(
    [API_ENDPOINTS.SPACES, params],
    () => spaceClient.getSpaces(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    spaces: data?.data as SpacesResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useSpaceQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<SpacesResponse, Error>(
    [API_ENDPOINTS.SPACES, id],
    () => spaceClient.getSpace({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    space: data,
    loading: isLoading,
    error,
  }
}

export const useCreateSpaceMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(spaceClient.createSpace, {
    onSuccess() {
      toast.success('Se creó un nuevo espacio')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Error: no se pudo crear')
    },
  })
}

export const useUpdateSpaceMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(spaceClient.updateSpace, {
    onSuccess() {
      toast.success('Se actualizó la información del espacio')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo actualzar'
      )
    },
  })
}

export const useDeleteSpaceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(spaceClient.deleteSpace, {
    onSuccess: () => {
      toast.success('Se eliminó el espacio')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? 'Error: no se pudo eliminar'
      )
    },
  })
}

export const useUnblockSpaceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(spaceClient.unblock, {
    onSuccess() {
      toast.success('Espacio desbloqueado')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
  })
}

export const useBlockSpaceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(spaceClient.block, {
    onSuccess() {
      toast.success('Espacio bloqueado')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SPACES)
    },
  })
}

const { token } = getAuthCredentials()
const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT

let config = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
}
export const getRents = async (month: any) => {
  try {
    console.log('month', month)
    const startDate = month
      ? 'startDate=' +
        moment(month).startOf('month').format('YYYY-MM-DD') +
        ' 00:00:00&'
      : ''
    const endDate = month
      ? 'endDate=' +
        moment(month).endOf('month').format('YYYY-MM-DD') +
        ' 23:59:00'
      : ''

    let fetchingRents = true
    const response = await axios.get(
      endpoint + '/rents/obtenerReservas?' + startDate + endDate,
      config
    )
    console.log('response get rents', response)
    if (response.status === 200) {
      fetchingRents = false
      for (let i in response.data) {
        response.data[i].name = response.data[i].space.name
        response.data[i].startDate = response.data[i].startDate.split('T')[0]
      }

      return {
        rents: response.data,
        fetchingRents,
        error: '',
      }
    } else {
      fetchingRents = false

      return {
        rents: [],
        fetchingRents,
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      rents: [],
      fetchingRents: false,
      error: error?.response.data.message,
    }
  }
}

export const getAvailabilitySpaces = async (
  day: any,
  spaceId: number,
  duration: number
) => {
  try {
    const startDate = day ? '&startDate=' + day : ''
    const endDate = day
      ? '&endDate=' +
        moment(day).add(duration, 'hours').format('YYYY-MM-DD HH:00')
      : ''

    console.log(startDate, endDate)
    const response = await axios.get(
      endpoint + '/rents/validation?spaceId=' + spaceId + startDate + endDate,
      config
    )
    console.log('response', response)
    if (response.status === 200) {
      return {
        isAvailable: true,
        error: '',
      }
    } else {
      return {
        eventsSpaces: false,
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      eventsSpaces: false,
      error: error?.response.data.message,
    }
  }
}

export const rentSpace = async (
  spaceSelected: any,
  form: any,
  metodo: any,
  id: any
) => {
  try {
    const rents = []
    for (let i in form) {
      const rent = {
        spaceId: spaceSelected.id,
        userId: id,
        startDate: form[i].day.format('YYYY-MM-DD HH:00'),
        endDate: form[i].day
          .add(form[i].duration, 'hours')
          .format('YYYY-MM-DD HH:00'),
      }
      rents.push(rent)
    }
    const body = {
      userId: id,
      deliveryDate: null,
      deliveryStatus: null,
      products: null,
      seats: null,
      rents: rents,
      payment: {
        userId: id,
        name: spaceSelected.name,
        type: 'GENERAL',
        total: spaceSelected.price * form.length,
        method: metodo,
      },
    }
    console.log('body', body)
    const response = await axios.post(endpoint + '/orders', body, config)
    console.log('response', response)
    if (response.status === 200) {
      return {
        seatsResponse: response.data,
        error: '',
      }
    } else {
      console.error('error en else', response)
      return {
        seatsResponse: [],
        error: response.data.message,
      }
    }
  } catch (error: any) {
    return {
      seatsResponse: [],
      error: error?.response.data.message,
    }
  }
}

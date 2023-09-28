import { useQuery, useQueryClient, useMutation } from 'react-query'
import { GenresQueryOptions, GenrePagination, Genre } from '@/types/genre'
import { mapPaginatorData } from '@/utils/data-mappers'
import { API_ENDPOINTS } from './client/api-endpoints'
import { genresClient } from './client/genres'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export type GenreByIdResponse = {
  genre: Genre
  message: string
}

export const useGenresQuery = (options: Partial<GenresQueryOptions>) => {
  const { data, isLoading, error } = useQuery<GenrePagination, Error>(
    [API_ENDPOINTS.GENRE, options],
    () => genresClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    genres: data?.genders,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useGenreQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<GenrePagination, Error>(
    [API_ENDPOINTS.GENRE, id],
    () => genresClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    product: data,
    loading: isLoading,
    error,
  }
}

export const useCreateGenreMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(genresClient.register, {
    onSuccess() {
      toast.success('Se creó un nuevo género.')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GENRE)
    },
  })
}

export const useUpdateGenreMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(genresClient.update, {
    onSuccess() {
      toast.success('Se actualizó el género')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GENRE)
    },
  })
}

export const useDeleteGenreMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(genresClient.delete, {
    onSuccess: () => {
      toast.success('Se eleminó el género')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GENRE)
    },
  })
}

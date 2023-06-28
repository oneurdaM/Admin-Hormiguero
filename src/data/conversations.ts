import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
  useQuery,
} from 'react-query'
import { toast } from 'react-toastify'

import { conversationsClient } from './client/conversations'
import { API_ENDPOINTS } from './client/api-endpoints'
import { useTranslation } from 'react-i18next'
import { DataChat, MessagePaginator, MessageQueryOptions } from '@/types'
import { mapPaginatorData } from '@/utils/data-mappers'

export const useMessageSeen = () => {
  const queryClient = useQueryClient()
  return useMutation(conversationsClient.messageSeen, {
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.MESSAGE)
      queryClient.invalidateQueries(API_ENDPOINTS.CONVERSIONS)
    },
  })
}

export const useSendMessage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  return useMutation(conversationsClient.messageCreate, {
    onSuccess: () => {
      toast.success(t('common:text-message-sent'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.MESSAGE)
      queryClient.invalidateQueries(API_ENDPOINTS.CONVERSIONS)
    },
  })
}

export const useMessagesQuery = (options: Partial<MessageQueryOptions>) => {
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery<MessagePaginator, Error>(
    [API_ENDPOINTS.MESSAGE, options],
    ({ queryKey, pageParam }) =>
      conversationsClient.getMessage(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ currentPage, latestPage }) =>
        latestPage > currentPage && { page: currentPage + 1 },
    }
  )

  function handleLoadMore() {
    if (Boolean(hasNextPage)) {
      fetchNextPage()
    }
  }

  console.log('DATA -USER MESSAGES QUERY', data)

  return {
    messages: data?.pages?.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    loading: isLoading,
    error,
    isFetching,
    refetch,
    isSuccess,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  }
}

export const useConversationQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading, isFetching } = useQuery<DataChat, Error>(
    [`${API_ENDPOINTS.CONVERSIONS}/${id}`],
    () => conversationsClient.getConversion({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    data: data ?? [],
    error,
    loading: isLoading,
    isFetching,
  }
}

export const useConversationsQuery = (
  options: Partial<MessageQueryOptions>
) => {
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery<any, Error>(
    [API_ENDPOINTS.CONVERSIONS, options],
    ({ queryKey, pageParam }) =>
      conversationsClient.allConversation(
        Object.assign({}, queryKey[1], pageParam)
      ),
    {
      getNextPageParam: ({ currentPage, latestPage }) =>
        latestPage > currentPage && { page: currentPage + 1 },
    }
  )

  function handleLoadMore() {
    if (Boolean(hasNextPage)) {
      fetchNextPage()
    }
  }

  return {
    conversations: data?.pages?.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    loading: isLoading,
    error,
    isFetching,
    refetch,
    isSuccess,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  }
}

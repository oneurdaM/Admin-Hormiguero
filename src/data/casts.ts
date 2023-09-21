import { useQuery } from 'react-query'
import { CastsQueryOptions, CastsPagination } from "@/types/casts";
import { mapPaginatorData } from "@/utils/data-mappers";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { castsClient } from "./client/casts";


export const useCastsQuery = (options: Partial<CastsQueryOptions>) => {
	const {data,isLoading,error} = useQuery<CastsPagination,Error>(
		[API_ENDPOINTS.CATEGORY,options],
		() => castsClient.pagination(options),
		{
			keepPreviousData: true,
		}
	)

	return {
		casts: data?.casts,
		loading: isLoading,
		paginatorInfo: mapPaginatorData(data as any),
		error,
	}
}

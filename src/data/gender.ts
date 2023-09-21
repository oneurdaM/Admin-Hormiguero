import { useQuery } from 'react-query'
import { GendersQueryOptions, GenderPagination } from "@/types/gender";
import { mapPaginatorData } from "@/utils/data-mappers";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { gendersClient } from "./client/genders";


export const useGendersQuery = (options: Partial<GendersQueryOptions>) => {
	const {data,isLoading,error} = useQuery<GenderPagination,Error>(
		[API_ENDPOINTS.CATEGORY,options],
		() => gendersClient.pagination(options),
		{
			keepPreviousData: true,
		}
	)

	return {
		casts: data?.genders,
		loading: isLoading,
		paginatorInfo: mapPaginatorData(data as any),
		error,
	}
}

import {QueryOptions} from "@/types";
import {CastsPagination,CastsQueryOptions,CastsResponse,CastInput} from "@/types/casts";
import {API_ENDPOINTS} from "./api-endpoints";
import {crudFactory} from "./crud-factory";
import {HttpClient} from "./http-client";


export const castsClient = {
	...crudFactory<CastsResponse,QueryOptions,CastInput>(
		API_ENDPOINTS.CAST
	),
	pagination: ({search,...params}: Partial<CastsQueryOptions>) => {
		return HttpClient.get<CastsPagination>(API_ENDPOINTS.CAST,{
			...params,
			search,
		})
	},
}
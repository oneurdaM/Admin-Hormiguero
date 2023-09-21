import {QueryOptions} from "@/types";
import {GenderPagination,GendersQueryOptions,Gender,GenderInput} from "@/types/gender";
import {API_ENDPOINTS} from "./api-endpoints";
import {crudFactory} from "./crud-factory";
import {HttpClient} from "./http-client";


export const gendersClient = {
	...crudFactory<Gender,QueryOptions,GenderInput>(
		API_ENDPOINTS.GENDER
	),
	pagination: ({search,...params}: Partial<GendersQueryOptions>) => {
		return HttpClient.get<GenderPagination>(API_ENDPOINTS.GENDER,{
			...params,
			search,
		})
	},
}
import {PaginatorInfo,QueryOptions} from '.'

export type CastsResponse = {
	id?: number;
	name: string;
}

export type CastInput = {
	name: string;
}

export type CastsPagination = {
	casts: CastsResponse[];
	total: number;
	totalPages: number;
	currentPage: number;
	perPage: number;
}

export interface CastsQueryOptions extends QueryOptions {
	search?: string
}

export type CastsPaginator = PaginatorInfo<CastsResponse>
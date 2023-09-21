import {PaginatorInfo,QueryOptions} from '.'

export type Gender = {
	id?: number;
	name: string;
}

export type GenderInput = {
	name: string;
}

export type GenderPagination = {
	genders: Gender[];
	total: number;
	totalPages: number;
	currentPage: number;
	perPage: number;
}

export interface GendersQueryOptions extends QueryOptions {
	search?: string
}

export type GendersPaginator = PaginatorInfo<Gender>
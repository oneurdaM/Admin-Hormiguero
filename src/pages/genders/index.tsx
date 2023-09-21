import {useState} from "react";
import {useTranslation} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import Layout from '@/components/layout/admin'
import Card from "@/components/common/card";
import Search from "@/components/common/search";
import LinkButton from "@/components/ui/link-button";
import {Routes} from "@/config/routes";
import GendersList from "@/components/genders/genders-list";
import {useGendersQuery} from "@/data/gender";

export default function Genres() {
	const {t} = useTranslation()
	const [searchTerm,setSearchTerm] = useState('')
	const [page,setPage] = useState(1)

	const {casts,paginatorInfo,loading} = useGendersQuery({
		limit: 10,
		page,
		search: searchTerm,
	});

	function handleSearch({searchText}: {searchText: string}) {
		setSearchTerm(searchText)
		setPage(1)
	}

	function handlePagination(current: number) {
		setPage(current)
	}

	return (
		<>
			<Card className="mb-8 flex flex-col items-center md:flex-row">
				<div className="mb-4 md:mb-0 md:w-1/4">
					<h1 className="text-lg font-semibold text-heading">
						{t('form:input-label-genres')}
					</h1>
				</div>

				<div className="flex w-full items-center ms-auto md:w-3/4">
					<Search onSearch={handleSearch} />
					<LinkButton
						href={`${Routes.genders.create}`}
						className="h-12 ms-4 md:ms-6"
					>
						<span>+ {t('form:button-label-add-genres')}</span>
					</LinkButton>
				</div>
			</Card>

			{loading ? null : (
				<GendersList
					genders={casts ?? []}
					paginatorInfo={paginatorInfo}
					onPagination={handlePagination}
				/>
			)}
		</>
	)
}
Genres.Layout = Layout;

export const getStaticProps = async ({locale}: any) => ({
	props: {
		...(await serverSideTranslations(locale,['table','common','form'])),
	},
})

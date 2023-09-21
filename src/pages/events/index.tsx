import {useState} from "react";
import {useTranslation} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import Layout from '@/components/layout/admin'
import Card from "@/components/common/card";
import Search from "@/components/common/search";
import LinkButton from "@/components/ui/link-button";
import {Routes} from "@/config/routes";
import {useEventsQuery} from "@/data/events";
import EventList from "@/components/events/events-lists";
export default function Events() {
	const {t} = useTranslation()
	const [searchTerm,setSearchTerm] = useState('')
	const [page,setPage] = useState(1)
	const {events, paginatorInfo, loading,error} = useEventsQuery({
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
						{t('form:input-label-events')}
					</h1>
				</div>

				<div className="flex w-full items-center ms-auto md:w-3/4">
					<Search onSearch={handleSearch} />
					<LinkButton
						href={`${Routes.events.create}`}
						className="h-12 ms-4 md:ms-6"
					>
						<span>+ {t('form:button-label-add-event')}</span>
					</LinkButton>
				</div>
			</Card>

			{loading ? null : (
				<EventList
					events={events ?? []}
					paginatorInfo={paginatorInfo}
					onPagination={handlePagination}
				/>
			)}
		</>
	)
}
Events.Layout = Layout;

export const getStaticProps = async ({locale}: any) => ({
	props: {
		...(await serverSideTranslations(locale,['table','common','form'])),
	},
})

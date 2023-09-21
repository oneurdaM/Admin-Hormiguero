import {AlignType,Table} from '../ui/table'
import {MappedPaginatorInfo} from '@/types';
import Pagination from '../ui/pagination'
import Image from 'next/image';
import {siteSettings} from '@/settings/site.settings';
import {IEvent} from '@/types/events';
import ActionButtons from '../ui/action-buttons';
import {useRouter} from 'next/router';

type EventListProps = {
	events: IEvent[],
	paginatorInfo?: MappedPaginatorInfo | null
	onPagination?: (current: number) => void
}
const EventList = ({events,paginatorInfo,onPagination}: EventListProps) => {
	const router = useRouter();

	const columns = [
		{
			title: 'Image',
			dataIndex: 'thumbnailUrl',
			key: 'thumbnailUrl',
			align: 'center' as AlignType,
			render: (image: string) => (
				<Image
					src={image ?? siteSettings.logo.url}
					alt="thumbnailUrl"
					width={40}
					height={40}
				/>
			),
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			align: 'center' as AlignType,

		},
		{
			title: 'Company',
			dataIndex: 'company',
			key: 'company',
			align: 'center' as AlignType,

		},
		{
			title: 'Director',
			dataIndex: 'director',
			key: 'director',
			align: 'center' as AlignType,
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center' as AlignType,
		},
		{
			title: 'Updated At',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			align: 'center' as AlignType,
		},
		{
			title: 'Acciones',
			dataIndex: 'id',
			key: 'id',
			align: 'center' as AlignType,
			render: (id: string) => {
			  return (
				<ActionButtons
				  id={id}
				  detailsUrl={`${router.asPath}/${id}`}
				  deleteModalView="DELETE_EVENT"
				  editModalView="EDIT_EVENT"
				/>
			  )
			},
		  },

	];
	return (
		<>
			<div className="mb-6 overflow-hidden rounded shadow">
				<Table columns={columns} data={events} rowKey={'id'} />
			</div>
			{!!paginatorInfo?.total && (
				<div className="flex items-center justify-end">
					<Pagination
						total={paginatorInfo.total}
						current={paginatorInfo.currentPage}
						pageSize={paginatorInfo.perPage}
						onChange={onPagination}
					/>
				</div>
			)}
		</>
	);
}

export default EventList;
import Pagination from '../ui/pagination'
import {AlignType,Table} from '../ui/table';

import {MappedPaginatorInfo} from "@/types";
import {CastsResponse} from "@/types/casts";


type CastListProps = {
	casts: CastsResponse[],
	paginatorInfo?: MappedPaginatorInfo | null
	onPagination?: (current: number) => void
}
const CastList = ({casts,paginatorInfo,onPagination}: CastListProps) => {

	const columns: any[] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Created At',
			dataIndex: 'created_at',
			key: 'created_at',
			align: 'center' as AlignType,
		},
		{
			title: 'Updated At',
			dataIndex: 'updated_at',
			align: 'center' as AlignType,
		}
	]
	return (
		<>
			<div className="mb-6 overflow-hidden rounded shadow">
				<Table columns={columns} data={casts} rowKey={'id'} />
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

export default CastList;
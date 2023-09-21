import Pagination from '../ui/pagination'
import {AlignType,Table} from '../ui/table';

import {MappedPaginatorInfo} from "@/types";
import {Gender} from "@/types/gender";

type GenderListProps = {
	genders: Gender[],
	paginatorInfo?: MappedPaginatorInfo | null
	onPagination?: (current: number) => void
}

const GendersList = ({genders,paginatorInfo,onPagination}: GenderListProps) => {
	const columns: any[] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			align: 'center' as AlignType,
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
	];
	return (
		<>
			<div className="mb-6 overflow-hidden rounded shadow">
				<Table columns={columns} data={genders} rowKey={'id'} />
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

export default GendersList
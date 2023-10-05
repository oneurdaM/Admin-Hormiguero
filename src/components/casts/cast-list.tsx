import Pagination from '../ui/pagination'
import { AlignType, Table } from '../ui/table'

import { MappedPaginatorInfo } from '@/types'
import { CastsResponse } from '@/types/casts'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'

type CastListProps = {
  casts: CastsResponse[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}
const CastList = ({ casts, paginatorInfo, onPagination }: CastListProps) => {
  const columns: any[] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'right' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={Routes.casts.details({ id })}
            deleteModalView={'DELETE_CAST'}
          />
        )
      },
    },
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
  )
}

export default CastList

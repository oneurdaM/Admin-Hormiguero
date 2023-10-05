import Pagination from '../ui/pagination'
import { AlignType, Table } from '../ui/table'

import { MappedPaginatorInfo } from '@/types'
import { Genre } from '@/types/genre'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'

type GenreListProps = {
  genres: Genre[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}

const GenresList = ({
  genres,
  paginatorInfo,
  onPagination,
}: GenreListProps) => {
  const columns: any[] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as AlignType,
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
            detailsUrl={Routes.genres.details({ id })}
            deleteModalView={'DELETE_GENRE'}
          />
        )
      },
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={genres} rowKey={'id'} />
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

export default GenresList

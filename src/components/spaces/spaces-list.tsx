import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import Badge from '../ui/badge/badge'
import ActionButtons from '../ui/action-buttons'
import { Space } from '@/types/spaces'
import { MappedPaginatorInfo } from '@/types/index'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'

type SpacesProps = {
  spaces: Space[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedSpace?: (space: Space) => void
}

const SpacesList = ({ spaces, paginatorInfo, onPagination }: SpacesProps) => {
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Direccion',
      dataIndex: 'location',
      key: 'location',
      align: 'center',
      render: (location: string) => (
        <span className="line-clamp-2">{location}</span>
      ),
    },
    {
      title: 'Espacio',
      dataIndex: 'dimensions',
      key: 'dimensions',
      align: 'center',
      render: (dimensions: number) => (
        <span className="line-clamp-2">
          {dimensions} m<sup>2</sup>
        </span>
      ),
    },
    {
      title: 'Aforo',
      dataIndex: 'capacity',
      key: 'emcapacityail',
      align: 'center',
    },
    {
      title: 'Costo',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },

    {
      title: 'Estatus',
      dataIndex: 'active',
      key: 'active',
      align: 'center' as AlignType,
      render: (active: boolean) => (
        <Badge
          text={active ? 'Disponible' : 'Reservado'}
          color={active ? 'bg-[#10B981]' : 'bg-[#dc2626]'}
        />
      ),
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
            detailsUrl={Routes.spaces.details({ id })}
            deleteModalView="DELETE_SPACE"
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={spaces ?? []} rowKey={'id'} />
      </div>
      {!!paginatorInfo && (
        <Pagination
          total={paginatorInfo.total}
          current={paginatorInfo.currentPage}
          pageSize={paginatorInfo.perPage}
          onChange={onPagination}
        />
      )}
    </>
  )
}

export default SpacesList

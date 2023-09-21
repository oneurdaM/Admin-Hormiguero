import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import { Notice } from '@/types/notices'
import { MappedPaginatorInfo } from '@/types/index'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { formatDate } from '@/utils/format-date'
import { Routes } from '@/config/routes'

type AlertListProps = {
  alerts: Notice[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (alert: Notice) => void
}

const AlertList = ({ alerts, paginatorInfo, onPagination }: AlertListProps) => {
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'notice',
      key: 'alertName',
      align: 'center',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: 100,
    },
    {
      title: 'Creada por',
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
    },
    {
      title: 'Usuario Crea',
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      width: 100,
    },
    {
      title: 'Usuario Recibe',
      dataIndex: 'userReceives',
      key: 'userReceives',
      align: 'center',
      width: 100,
    },
    {
      title: 'Fecha inicio',
      dataIndex: 'effectiveFrom',
      key: 'effectiveFrom',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Fecha fin',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Días',
      dataIndex: 'days',
      key: 'days',
      align: 'center',
      // render: (day: string) => (
      //   <div className="text-sm text-gray-600">{}</div>
      // ),
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
            detailsUrl={Routes.alerts.details({ id })}
            deleteModalView={'DELETE_NOTICE'}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={alerts ?? []} rowKey={'id'} />
      </div>
      {!!paginatorInfo && (
        <div>
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

export default AlertList

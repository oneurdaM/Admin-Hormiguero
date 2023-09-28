import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import Badge from '../ui/badge/badge'
import StatusColor from './order-status-color'
import ActionButtons from '../ui/action-buttons'
import { Order } from '@/types/orders'
import { MappedPaginatorInfo } from '@/types/index'
import { AlignType } from 'rc-table/lib/interface'
import { formatDate } from '@/utils/format-date'
import { Routes } from '@/config/routes'

type OrdersProps = {
  orders: Order[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (alert: Order) => void
}

const OrdersList = ({ orders, paginatorInfo, onPagination }: OrdersProps) => {
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
    },
    {
      title: 'Usuario',
      dataIndex: ['user', 'name'],
      key: 'user',
      align: 'center',
    },
    {
      title: 'Correo electrónico',
      dataIndex: ['user', 'email'],
      key: 'email',
      align: 'center',
    },
    {
      title: 'Telefono',
      dataIndex: ['user', 'phone'],
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Dirección',
      dataIndex: ['user', 'address'],
      key: 'address',
      align: 'center',
    },
    {
      title: 'Fecha pedido',
      dataIndex: 'effectiveFrom',
      key: 'effectiveFrom',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Fecha entrega',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Estatus',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as AlignType,
      render: (text: string) => <Badge text={text} color={StatusColor(text)} />,
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'right' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons id={id} detailsUrl={Routes.orders.details({ id })} />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={orders ?? []} rowKey={'id'} />
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

export default OrdersList

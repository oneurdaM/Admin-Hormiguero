import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import Badge from '../ui/badge/badge'
import ActionButtons from '../ui/action-buttons'
import { Reservation, ReservationsResponse } from '@/types/reservations'
import { MappedPaginatorInfo } from '@/types/index'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'
import { formatDate } from '@/utils/format-date'

type reservationsProps = {
  reservations: ReservationsResponse[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedReservation?: (space: Reservation) => void
}

const ReservationsList = ({
  reservations,
  paginatorInfo,
  onPagination,
}: reservationsProps) => {
  const columns: any = [
    {
      title: 'Folio/ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      key: 'reason',
      align: 'center',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Nombre del lugar',
      dataIndex: 'space',
      key: 'space',
      align: 'center',
    },
    {
      title: 'Direccion',
      dataIndex: 'location', //address
      key: 'location', //address
      align: 'center',
    },
    {
      title: 'Fecha reserva',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Fecha entrega',
      dataIndex: 'effectiveFrom',
      key: 'effectiveFrom',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Fecha devolución',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      align: 'center',
      render: (date: string) => (
        <div className="text-sm text-gray-600">{date && formatDate(date)} </div>
      ),
    },
    {
      title: 'Estatus pago',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center' as AlignType,
      render: (payment: boolean) => (
        <Badge
          text={payment ? 'Pagado' : 'Pendiente'}
          color={payment ? 'bg-[#10B981]' : 'bg-[#dc2626]'}
        />
      ),
    },
    {
      title: 'Costo',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'right' as AlignType,
      render: (id: string, { status }: ReservationsResponse) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={Routes.reservations.details({ id })}
            reservationStatus={true}
            isReservationActive={!status}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={reservations ?? []} rowKey={'id'} />
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

export default ReservationsList

import { siteSettings } from '@/settings/site.settings'
import Image from 'next/image'

import Pagination from '../ui/pagination'
import { MappedPaginatorInfo } from '@/types'
import { AlignType, Table } from '../ui/table'
import { Ticket } from '@/types/tickets'
// import { Routes } from '@/config/routes'
// import ActionButtons from '../ui/action-buttons'

type TicketsListProps = {
  tickets: Ticket[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}

const TicketsList = ({
  tickets,
  paginatorInfo,
  onPagination,
}: TicketsListProps) => {
  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: (image: string) => (
        <div className="flex justify-center">
          <Image
            src={image ?? siteSettings.logo.url}
            alt="image"
            width={80}
            height={80}
          />
        </div>
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as AlignType,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as AlignType,
      render: (text: string) => <span>${text}</span>,
    },
    // {
    //   title: 'Acciones',
    //   dataIndex: 'id',
    //   key: 'id',
    //   align: 'center' as AlignType,
    //   render: (id: string) => {
    //     return (
    //       <ActionButtons id={id} detailsUrl={Routes.tickets.details({ id })} />
    //     )
    //   },
    // },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={tickets} rowKey={'id'} />
      </div>
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={parseInt(paginatorInfo.total)}
            current={parseInt(paginatorInfo.currentPage)}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default TicketsList

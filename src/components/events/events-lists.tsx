import { siteSettings } from '@/settings/site.settings'
import Image from 'next/image'

import Pagination from '../ui/pagination'
import ActionButtons from '../ui/action-buttons'
import { MappedPaginatorInfo } from '@/types'
import { AlignType, Table } from '../ui/table'
import { Event } from '@/types/events'
import { Routes } from '@/config/routes'

type EventListProps = {
  events: Event[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}

const EventList = ({ events, paginatorInfo, onPagination }: EventListProps) => {
  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',

      render: (image: string) => (
        <div className="flex justify-center">
          <Image
            src={image ?? siteSettings.logo.url}
            alt="thumbnailUrl"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
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
            detailsUrl={Routes.events.details({ id })}
            // deleteModalView="DELETE_EVENT"
          />
        )
      },
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={events} rowKey={'id'} />
      </div>
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={parseInt(paginatorInfo.total)}
            current={parseInt(paginatorInfo.currentPage)}
            pageSize={parseInt(paginatorInfo.perPage)}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default EventList

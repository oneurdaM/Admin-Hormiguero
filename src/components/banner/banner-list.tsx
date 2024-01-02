/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignType, Table } from '@/components/ui/table'
import { Routes } from '@/config/routes'
import { Banner } from '@/types/banner'
import { MappedPaginatorInfo } from '@/types/index'
import Image from 'next/image'
import LanguageSwitcher from '../ui/lang-action/action'
import Pagination from '../ui/pagination'
import TitleWithSort from '../ui/title-with-sort'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'

type BannerListProps = {
  banners: Banner[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
}

const BannerList = ({
  banners,
  paginatorInfo,
  onPagination,
}: BannerListProps) => {
  const columns = [
    {
      title: 'Imágen',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      align: 'center' as AlignType,
      width: 74,
      render: (image: string) => (
        <Image
          src={image}
          alt="artile"
          className="overflow-hidden rounded"
          width={42}
          height={42}
        />
      ),
    },
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as AlignType,
      render: (content: string) => (
        <span className="line-clamp-2">{content}</span>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      align: 'center' as AlignType,
      render: (content: string) => (
        <span className="line-clamp-2">{content}</span>
      ),
    },
    {
      title: 'Ruta',
      dataIndex: 'url',
      key: 'url',
      width: 100,
      render: (content: string) => (
        <span className="line-clamp-2">{content}</span>
      ),
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
            deleteModalView="DELETE_BANNER"
            detailsUrl={Routes.banner.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          rowKey="id"
          scroll={{ x: 900 }}
          columns={columns}
          emptyText="No hay banners creados"
          data={banners ?? []}
        />
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

export default BannerList

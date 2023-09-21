import { Table } from '../ui/table'
import Pagination from '../ui/pagination'
import Image from 'next/image'

import { siteSettings } from '@/settings/site.settings'
import { Product } from '@/types/products'
import { MappedPaginatorInfo } from '@/types/index'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'

type ProductsListProps = {
  products: Product[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (alert: Product) => void
}

const ProductsList = ({
  products,
  paginatorInfo,
  onPagination,
}: ProductsListProps) => {
  const columns: any = [
    {
      title: 'Imagen',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: 'center' as AlignType,
      render: (image: string) => (
        <Image
          src={image ?? siteSettings.logo.url}
          alt="thumbnail"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    // {
    //   title: 'Catalogo',
    //   dataIndex: 'catalog',
    //   key: 'catalog',
    //   align: 'center',
    // },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text: number) => {
        return <span>$ {text}</span>
      },
    },
    {
      title: 'Inventario',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
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
            deleteModalView='DELETE_PRODUCT'
            detailsUrl={Routes.products.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={products ?? []} rowKey={'id'} />
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

export default ProductsList

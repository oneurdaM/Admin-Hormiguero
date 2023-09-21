import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import { ProductCategory } from '@/types/products-categories'
import { MappedPaginatorInfo } from '@/types/index'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'

type ProductsCategoriesListProps = {
  productsCategories: ProductCategory[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedCategory?: (alert: ProductCategory) => void
}

const ProductsCategoriesList = ({
  productsCategories,
  paginatorInfo,
  onPagination,
}: ProductsCategoriesListProps) => {
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
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
            deleteModalView={'DELETE_CATALOG'}
            detailsUrl={Routes.productsCategories.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table
          columns={columns}
          data={productsCategories ?? []}
          rowKey={'id'}
        />
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

export default ProductsCategoriesList

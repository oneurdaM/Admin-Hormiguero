import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import { Department } from '@/types/department'
import { MappedPaginatorInfo } from '@/types/index'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'

type DepartmentProps = {
  departments: Department[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedCategory?: (alert: Department) => void
}

const Department = ({
  departments,
  paginatorInfo,
  onPagination,
}: DepartmentProps) => {
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
            detailsUrl={Routes.departments.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table columns={columns} data={departments ?? []} rowKey={'id'} />
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

export default Department

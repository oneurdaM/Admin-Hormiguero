import React from 'react'

import { Table } from '@/components/ui/table'
import Pagination from '@/components/ui/pagination'
import ActionButtons from '@/components/ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Module } from '@/types/modules-tasks'
import { MappedPaginatorInfo } from '@/types/index'

type AlertListProps = {
  modules: Module[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (module: Module) => void
}

function ModulesList({ modules, paginatorInfo, onPagination }: AlertListProps) {
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'moduleName',
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
            editModalView={'ALERT_EDIT'}
            deleteModalView={'ALERT_DELETE'}
            // detailsUrl={Routes.alerts.details({ id })}
            // userStatus={true}
            // isUserActive={true}
          />
        )
      },
    },
  ]
  return (
    <>
      <div className="my-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          data={
            modules ?? [
              { id: 1, name: 'module 1' },
              { id: 2, name: 'module 2' },
            ]
          }
          rowKey={'id'}
        />
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

export default ModulesList

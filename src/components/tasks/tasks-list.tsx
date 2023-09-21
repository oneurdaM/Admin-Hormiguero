import React from 'react'

import { Table } from '@/components/ui/table'
import Pagination from '@/components/ui/pagination'
import ActionButtons from '@/components/ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Task } from '@/types/modules-tasks'
import { MappedPaginatorInfo } from '@/types/index'

type AlertListProps = {
  tasks: Task[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (task: Task) => void
}

function TasksList({ tasks, paginatorInfo, onPagination }: AlertListProps) {
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'taskName',
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
            tasks ?? [
              { id: 1, name: 'task 1' },
              { id: 2, name: 'task 2' },
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

export default TasksList

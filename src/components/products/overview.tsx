import React from 'react'
import { Table } from '../ui/table'
import { create } from 'yup/lib/Reference'

function Overview() {
  const columns: any = [
    {
      title: 'Total Productos',
      dataIndex: 'totalProducts',
      key: 'totalProducts',
      align: 'center',
    },
    {
      title: 'Sin Inventario',
      dataIndex: 'outOfStock',
      key: 'outOfStock',
      align: 'center',
    },
    {
      title: 'Total Items',
      dataIndex: 'totalItems',
      key: 'totalItems',
      align: 'center',
    },
    {
      title: 'Modulos',
      dataIndex: 'modules',
      key: 'modules',
      align: 'center',
    },
  ]

  return (
    <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
      <Table
        columns={columns}
        data={[{ total: 0, outOfStock: 0, items: 0, modules: 0 }]}
        rowKey={'id'}
      />
    </div>
  )
}

export default Overview

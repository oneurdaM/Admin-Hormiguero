'use client'
import React from 'react'
import BillboardCard from './billboard-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'
import { MappedPaginatorInfo } from '@/types'

type BillboardListProps = {
  billboards: Event[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | any
  onPagination: (page: number) => void
  loading: boolean
}

const BillboardList = ({
  billboards,
  paginatorInfo,
  onPagination,
  loading,
}: BillboardListProps) => {
  if (paginatorInfo?.total === 0 && !loading) {
    return <ErrorMessage message="Aún no hay ningún evento para mostrar" />
  }

  if (loading) {
    return <Loader text="Cargando..." />
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {billboards?.map((item) => (
          <BillboardCard event={item} key={item.id} />
        ))}
      </div>

      <div className="my-4 flex items-center justify-end">
        {!!paginatorInfo?.total && (
          <Pagination
            total={parseInt(paginatorInfo.total.toString())}
            current={parseInt(paginatorInfo.currentPage.toString())}
            pageSize={parseInt(paginatorInfo.perPage.toString())}
            onChange={onPagination}
            className="text-light"
          />
        )}
      </div>
    </>
  )
}

export default BillboardList

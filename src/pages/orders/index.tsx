import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import OrdersList from '@/components/orders/orders-list'
import Card from '@/components/common/card'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import { useOrdersQuery } from '@/data/order'

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const {
    orders,
    loading,
    error,
    paginatorInfo,
  } = useOrdersQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  // if (loading) return <Loader text="Cargando pedidos..." />

  // if (error) return <ErrorMessage message={error.message} />

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">Pedidos</h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-2/3">
          <Search onSearch={handleSearch} />
        </div>
      </Card>

      <OrdersList
        orders={orders}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

Orders.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

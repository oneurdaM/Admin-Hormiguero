import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import Card from '@/components/common/card'
import ProductsList from '@/components/products/products-list'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import Search from '@/components/common/search'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useProductsQuery } from '@/data/product'
// import Overview from '@/components/products/overview'

function ProductsTab() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { products, loading, error, paginatorInfo } = useProductsQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) return <Loader text="Cargando productos..." />

  if (error) return <ErrorMessage message={error.message} />

  function handlePagination(current: number) {
    setPage(current)
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:products-title')}
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center justify-between md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.products.create}`}
            className="ms-4 h-12 md:ms-6"
          >
            <span>+ {t('form:button-label-add-product')}</span>
          </LinkButton>
        </div>
      </Card>
      {/* <Overview /> */}
      <ProductsList
        products={products ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default ProductsTab

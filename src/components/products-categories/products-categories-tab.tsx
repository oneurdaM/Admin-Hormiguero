import React from 'react'
import { useState } from 'react'

import Card from '@/components/common/card'
import ProductsCategoriesList from './products-categories-list'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import Search from '@/components/common/search'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useProductsCategoriesQuery } from '@/data/product-category'

function ProductsCategoriesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { productsCategories, loading, error, paginatorInfo } =
    useProductsCategoriesQuery({
      limit: 5,
      page,
      search: searchTerm,
    })

  if (loading) return <Loader text="Cargando categorías..." />

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
            Categorías de productos
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center justify-between md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.productsCategories.create}`}
            className="ms-4 h-12 md:ms-6"
          >
            <span>+ Añadir Categoría</span>
          </LinkButton>
        </div>
      </Card>
      <ProductsCategoriesList
        productsCategories={productsCategories ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default ProductsCategoriesTab

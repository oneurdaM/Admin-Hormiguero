import React from 'react'
import { useState } from 'react'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import ErrorMessage from '@/components/ui/error-message'
import LinkButton from '@/components/ui/link-button'
import Loader from '@/components/ui/loader/loader'
import { Routes } from '@/config/routes'
import { useCategoriesQuery } from '@/data/category'
import CategoryList from '@/components/category/category-list'

function CategoryTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { categories, loading, error, paginatorInfo } = useCategoriesQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) return <Loader text="Cargando categorías..." />

  if (error) return <ErrorMessage message={error.message} />

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
          <h1 className="text-lg font-semibold text-heading">Categorías</h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-2/3">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.categories.create}`}
            className="h-12 w-full md:ms-6 md:w-auto"
          >
            <span>+ Agregar Categoría</span>
          </LinkButton>
        </div>
      </Card>

      <CategoryList
        categories={categories ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default CategoryTab

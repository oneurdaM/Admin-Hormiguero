import React from 'react'
import { useState } from 'react'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import { useBannersQuery } from '@/data/banner'
import BannerList from '@/components/banner/banner-list'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'

function BannerTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { banner, error, loading, paginatorInfo } = useBannersQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) {
    return <Loader text="Cargando Banners..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:w-1/3 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">Banners</h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-2/3">
          <Search onSearch={handleSearch} />

          <LinkButton
            className="h-12 w-full md:ms-6 md:w-auto"
            href={`${Routes.banner.create}`}
          >
            <span>+</span>
          </LinkButton>
        </div>
      </Card>
      <BannerList
        banners={banner}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default BannerTab

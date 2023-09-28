import { useState } from 'react'

import Card from '@/components/common/card'
import SpacesList from './spaces-list'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import Search from '@/components/common/search'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useSpacesQuery } from '@/data/space'

function Spaces() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { spaces, loading, error, paginatorInfo } = useSpacesQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  // if (loading) return <Loader text="Cargando catálogo de espacios..." />

  // if (error) return <ErrorMessage message={error.message} />

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
          <h1 className="text-lg font-semibold text-heading">Espacios</h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-2/3">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.spaces.create}`}
            className="h-12 w-full md:ms-6 md:w-auto"
          >
            <span>+</span>
          </LinkButton>
        </div>
      </Card>
      <SpacesList
        spaces={spaces ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default Spaces

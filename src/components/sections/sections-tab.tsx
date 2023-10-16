import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import { useGenresQuery } from '@/data/genre'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import SectionsList from './sections-list'

export default function SectionsTab() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const {
    genres: sections,
    loading,
    error,
    paginatorInfo,
  } = useGenresQuery({
    limit: 5,
    page,
    search: searchTerm,
    type: 'Social',
  })

  // if (loading) return <Loader text="Cargando usuarios..." />

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
          <h1 className="text-lg font-semibold text-heading">Secciones</h1>
        </div>

        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-2/3">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.sections.create}`}
            className="h-12 w-full md:ms-6 md:w-auto"
          >
            <span>+</span>
          </LinkButton>
        </div>
      </Card>

      <SectionsList
        sections={sections ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

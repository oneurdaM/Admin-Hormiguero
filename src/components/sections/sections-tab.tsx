import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import GenresList from '@/components/genres/genres-list'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { Routes } from '@/config/routes'
import { useGenresQuery } from '@/data/genre'
import { Tooltip } from 'antd'

export default function SectionsTab() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { genres, paginatorInfo, loading, error } = useGenresQuery({
    limit: 10,
    page,
    search: searchTerm,
    type: 'SOCIAL',
  })

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }

  if (loading) return <Loader text="Cargando géneros..." />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            Categoria de eventos
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <Tooltip placement="top" title="Crear">
            <LinkButton
              href={`${Routes.genres.create}?type=SOCIAL`}
              className="ms-4 h-12 md:ms-6"
            >
              <span>+</span>
            </LinkButton>
          </Tooltip>
        </div>
      </Card>

      <GenresList
        genres={genres ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

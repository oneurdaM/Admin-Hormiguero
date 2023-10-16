import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import { useEventsQuery } from '@/data/events'
import EventList from '@/components/events/events-lists'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'

export default function EventsTab() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { events, paginatorInfo, loading, error } = useEventsQuery({
    limit: 10,
    page,
    search: searchTerm,
    type: 'Production'
  })

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }

  // if (loading) return <Loader text="Cargando categorías..." />

  // if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-events')}
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.events.create}`}
            className="ms-4 h-12 md:ms-6"
          >
            <span>+</span>
          </LinkButton>
        </div>
      </Card>

      <EventList
        events={events ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

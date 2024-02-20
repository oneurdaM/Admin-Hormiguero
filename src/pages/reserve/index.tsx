import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/admin'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import { useEventsQuery } from '@/data/events'
import EventList from '@/components/events/events-lists'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import BillboardList from '@/components/billboard/billboard-list'
import { Tooltip } from 'antd'
import Schedule from '@/components/reserve/schedule'

export default function boxOffice() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { events, paginatorInfo, loading, error } = useEventsQuery({
    limit: 10,
    page,
    search: searchTerm,
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
        <Schedule />
      </Card>
    </>
  )
}

boxOffice.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

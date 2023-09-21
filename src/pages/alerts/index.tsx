import { useTranslation } from 'next-i18next'
import AppLayout from '@/components/layout/app'
import Card from '@/components/common/card'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AlertList from '@/components/alert/alert-list'
import { useState } from 'react'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useNoticesQuery } from '@/data/notice'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import Search from '@/components/common/search'

export default function Alerts() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { alerts, loading, error, paginatorInfo } = useNoticesQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) return <Loader text="Cargando alertas..." />

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
          <h1 className="text-lg font-semibold text-heading">
            {t('form:alerts-title')}
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.alerts.create}`}
            className="ms-4 h-12 md:ms-6"
          >
            <span>+ {t('form:button-label-add-alert')}</span>
          </LinkButton>
        </div>
      </Card>

      <AlertList
        alerts={alerts}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

Alerts.Layout = AppLayout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

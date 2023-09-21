import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes } from '@/config/routes'

import ModulesList from '@/components/modules/modules-list'
import { useAlertsQuery } from '@/data/alert' // replace for modules and alerts querys
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'

function ModulesTab() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
    console.log(searchText)
  }
  const { alerts, loading, error, paginatorInfo } = useAlertsQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  function handlePagination(current: number) {
    setPage(current)
  }

  if (loading) return <Loader text="Cargando Modulos..." />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="ms-auto flex w-full items-center">
        <Search onSearch={handleSearch} />
        <LinkButton
          href={`${Routes.modules.create}-module`}
          className="ms-4 h-12 md:ms-6"
        >
          <span>+ {t('form:button-label-add-module')}</span>
        </LinkButton>
      </div>
      <ModulesList
        modules={[]}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default ModulesTab

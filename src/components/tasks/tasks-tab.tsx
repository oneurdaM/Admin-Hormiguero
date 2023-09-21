import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes } from '@/config/routes'

import TasksList from './tasks-list'
import { useAlertsQuery } from '@/data/alert' // replace for modules and alerts querys
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'

function TasksTab() {
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

  if (loading) return <Loader text="Cargando Tareas..." />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="ms-auto flex w-full items-center">
        <Search onSearch={handleSearch} />
        <LinkButton
          href={`${Routes.modules.create}-task`}
          className="ms-4 h-12 md:ms-6"
        >
          <span>+ {t('form:button-label-add-task')}</span>
        </LinkButton>
      </div>
      <TasksList
        tasks={[]}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default TasksTab

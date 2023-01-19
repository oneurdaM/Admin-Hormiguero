import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Search from '@/components/common/search'
import Layout from '@/components/layout/admin'
import { useAlertsQuery } from '@/data/alert'
import Loader from '@/components/ui/loader'
import ErrorMessage from '@/components/ui/error-message'
import AlertList from '@/components/alert/alert-list'
import AlertMap from '@/components/alert/alert-map'
import { Alert } from '@/types/alerts'
import Badge from '@/components/ui/badge'
import Link from 'next/link'

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [alert, setAlert] = useState<Alert | null>(null)

  const { alerts, error, loading, paginatorInfo } = useAlertsQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) {
    return <Loader text="Cargando alertas..." />
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

  function selectAlert(alert: Alert) {
    setAlert(alert)
  }

  function colorBadge(status: string) {
    switch (status) {
      case 'CREATED':
        return 'bg-yellow-400 text-yellow-800'
      case 'UNDER_REVIEW':
        return 'bg-red-400 text-red-800'
      // Rejected Alarm
      case 'REJECTED':
        return 'bg-blue-400 text-blue-800'
      // False Alarm
      case 'FALSE_ALARM':
        return 'bg-purple-400 text-purple-800'
      // Solved
      case 'SOLVED':
        return 'bg-green-400 text-green-800'
      default:
        return 'bg-gray-400 text-gray-800'
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="flex justify-between">
            <Search onSearch={handleSearch} />
            <div className="flex items-center ml-4 space-x-2">
              <button className="bg-white shadow-lg p-2 rounded-md">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>
          <AlertList
            alerts={alerts}
            paginatorInfo={paginatorInfo}
            onPagination={handlePagination}
            seletedAlert={selectAlert}
          />
        </div>
        <div className="col-span-1">
          {alert && (
            <div className="bg-white rounded-lg shadow-lg p-4 mt-2 mb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-heading">
                  {alert.id}
                </h2>
                <Badge text={alert.status} color={colorBadge(alert.status)} />
              </div>
              <p className="text-sm text-gray-500">{alert.content}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  {new Date(alert.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                {/* Image */}
                {alert.image && (
                  // Link to view image on new page
                  <Link href={alert.image} target="_blank" rel="noreferrer">
                    {/* Text Link */}
                    <span className="text-sm text-gray-500 underline cursor-pointer">
                      Ver imágen
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
          {/* Alert Component */}
          <AlertMap lat={alert?.latitude} lng={alert?.longitude} />
        </div>
      </div>
    </>
  )
}

Alerts.Layout = Layout

import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useEventQuery } from '@/data/events'

import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import EventDetailForm from '@/components/events/event-detail'

export default function EventDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { event, error, loading } = useEventQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Detalle Evento</h1>
      </div>
      <EventDetailForm event={event} />
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

EventDetail.Layout = AppLayout

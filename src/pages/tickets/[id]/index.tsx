import React from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import TicketDetailForm from '@/components/tickets/ticket-detail-form'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useTicketQuery } from '@/data/tickets'

export default function TicketDetail() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { ticket, loading, error } = useTicketQuery({
    id: Number(id),
  })

  if (loading) return <Loader text="Cargando información del pedido..." />

  if (error) return <ErrorMessage message={error.message} />

  return <TicketDetailForm ticket={ticket} />
}

TicketDetail.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useReservationQuery } from '@/data/reservation'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import ReservationDetailForm from '@/components/reservations/reservation-detail'
// import ReservationDetailForm from '@/components/spaces/space-detail'

export default function ReservationDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { reservation, error, loading } = useReservationQuery({
    id: Number(id),
  })

  // if (loading) return <Loader />

  // if (error) return <ErrorMessage message={'error'} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Detalle Reservación
        </h1>
      </div>
      <ReservationDetailForm reservation={reservation} />
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

ReservationDetail.Layout = AppLayout

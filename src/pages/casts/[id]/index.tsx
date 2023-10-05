import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useCastQuery } from '@/data/casts'

import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import CastDetailForm from '@/components/casts/cast-detail-form'

export default function CastDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { cast, error, loading } = useCastQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Detalle Miembro del elenco
        </h1>
      </div>
      <CastDetailForm cast={cast} />
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

CastDetail.Layout = AppLayout

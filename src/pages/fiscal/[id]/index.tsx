import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useGenreQuery } from '@/data/genre'

import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import CategoryDetailForm from '@/components/genres/genre-detail-form'
import { useFiscalMutation } from '@/data/fiscal'
import CreateFiscalForm from '@/components/fiscal/fiscal-form'

export default function FiscalDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { fiscalr, error, loading } = useFiscalMutation({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  if (fiscalr) {
    fiscalr.thumbnailUrl = fiscalr.firmaElectronica
    fiscalr.thumbnailUrl2 = fiscalr.selloDigital
  }

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Detalle Género</h1>
      </div>
      <CreateFiscalForm initialValues={fiscalr} />
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

FiscalDetail.Layout = AppLayout

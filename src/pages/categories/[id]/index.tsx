import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import Card from '@/components/common/card'
import { useCategoryQuery } from '@/data/category'

import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import CategoryDetailForm from '@/components/category/category-detail-form'

export default function BlogCategoryDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { category, error, loading } = useCategoryQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Detalle Categoría
        </h1>
      </div>
      <CategoryDetailForm category={category} />
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

BlogCategoryDetail.Layout = AppLayout

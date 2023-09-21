import React from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import Card from '@/components/common/card'
import { useProductCategoryQuery } from '@/data/product-category'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import ProductCategoryDetailForm from '@/components/products-categories/product-category-detail'

export default function ProductCategoryDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { catalog, error, loading } = useProductCategoryQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  return (
    <Card className="mb-8">
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Detalle Categoría
        </h1>
      </div>
      <ProductCategoryDetailForm catalog={catalog} />
    </Card>
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

ProductCategoryDetail.Layout = AppLayout

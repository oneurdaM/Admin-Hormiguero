import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProductUpdateForm from '@/components/products/product-detail'
import Layout from '@/components/layout/admin'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useProductQuery } from '@/data/product'

export default function ProductPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { product, loading, error } = useProductQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={error.message} />

  return <ProductUpdateForm product={product} />
}

ProductPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

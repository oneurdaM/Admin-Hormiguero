import React from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import OrderUpdateForm from '@/components/orders/order-detail'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useOrderQuery } from '@/data/order'

export default function OrderDetail() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { order, loading, error } = useOrderQuery({
    id: Number(id),
  })

  if (loading) return <Loader text="Cargando información del pedido..." />

  if (error) return <ErrorMessage message={error.message} />

  return <OrderUpdateForm order={order} />
}

OrderDetail.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

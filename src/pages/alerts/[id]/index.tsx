import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AlertDetailForm from '@/components/alert/alert-detail'
import Layout from '@/components/layout/admin'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import { useNoticeQuery } from '@/data/notice'

export default function AlertDetail() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const { notice, error, loading } = useNoticeQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  return <AlertDetailForm noticeData={{...notice, hour: notice?.effectiveFrom?.split('T')[1].split('.')[0].split(":").slice(0, 2).join(":") ?? ''}} />
}

AlertDetail.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

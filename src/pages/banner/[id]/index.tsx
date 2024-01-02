import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'

import CreateBanneForm from '@/components/banner/banner-form'
import Layout from '@/components/layout/admin'
import ErrorMessage from '@/components/ui/error-message'
import { useBannerQuery } from '@/data/banner'
import Loader from '@/components/ui/loader/loader'

export default function UpdatePostPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router
  const { banner, loading, error } = useBannerQuery({ id: Number(id) })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Actualiza la publicación
        </h1>
      </div>
      <CreateBanneForm initialValues={banner} />
    </>
  )
}

UpdatePostPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx)
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: Routes.login,
        permanent: false,
      },
    }
  }
  return {
    props: {
      userPermissions: permissions,
    },
  }
}
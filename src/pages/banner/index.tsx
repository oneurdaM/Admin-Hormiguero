import { GetServerSideProps } from 'next'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'

import Layout from '@/components/layout/admin'
import { Tabs, Tab } from '@/components/ui/tabs'
import BannerTab from '@/components/banner/banner-tab'
import CategoryTab from '@/components/banner/banner-tab'
import { Routes } from '@/config/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Banner() {
  return <BannerTab />
}

Banner.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx)
  const locale = ctx.locale || 'es'
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
      ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
  }
}

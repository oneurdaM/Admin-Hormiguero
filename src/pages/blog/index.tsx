import { GetServerSideProps } from 'next'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'

import Layout from '@/components/layout/admin'
import { Tabs, Tab } from '@/components/ui/tabs'
import NoteTab from '@/components/blog/note-tab'
import CategoryTab from '@/components/category/category-tab'
import { Routes } from '@/config/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Notes() {
  return (
    <Tabs>
      <Tab label="Notas">
        <NoteTab />
      </Tab>
      <Tab label="Categorías">
        <CategoryTab />
      </Tab>
    </Tabs>
  )
}

Notes.Layout = Layout

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

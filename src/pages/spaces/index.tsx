import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import Reservations from '@/components/reservations/reservations-tab'
import SpacesTab from '@/components/spaces/spaces-tab'
import { Tabs, Tab } from '@/components/ui/tabs'

export default function Spaces() {
  return (
    <Tabs>
      <Tab label="Espacios">
        <SpacesTab />
      </Tab>
      <Tab label="Reservaciones">
        <Reservations />
      </Tab>
    </Tabs>
  )
}

Spaces.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

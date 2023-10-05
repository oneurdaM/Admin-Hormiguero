import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Tabs, Tab } from '@/components/ui/tabs'
import TicketsTab from '@/components/tickets/tickets-tab'
import EventsTab from '@/components/events/events-tab'
import GenresTab from '@/components/genres/genres-tab'
import CastsTab from '@/components/casts/casts-tab'
import Layout from '@/components/layout/admin'

export default function Events() {
  return (
    <Tabs>
      <Tab label="Tickets">
        <TicketsTab />
      </Tab>
      <Tab label="Eventos">
        <EventsTab />
      </Tab>
      <Tab label="Elencos">
        <CastsTab />
      </Tab>
      <Tab label="Géneros">
        <GenresTab />
      </Tab>
    </Tabs>
  )
}
Events.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

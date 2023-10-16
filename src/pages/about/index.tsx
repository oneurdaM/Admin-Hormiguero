import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Tabs, Tab } from '@/components/ui/tabs'
import Layout from '@/components/layout/admin'
import { useSettingsQuery } from '@/data/settings'
import AboutDetailForm from '@/components/about/about-detail'
import SectionsTab from '@/components/sections/sections-tab'
import SocialEventsTab from '@/components/community/social-events-tab'

function SocialImpact() {
  const { settings, error, loading } = useSettingsQuery()

  return (
    <Tabs>
      <Tab label="Eventos sociales">
        <SocialEventsTab />
      </Tab>
      <Tab label="Categorías de eventos">
        <SectionsTab />
      </Tab>
      <Tab label="Acerca de hormiguero">
        <>
          <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
            <h1 className="text-lg font-semibold text-heading">
              Detalle de Centro Cultural El Hormiguero
            </h1>
          </div>
          <AboutDetailForm
            error={error}
            loading={loading}
            settings={settings}
          />
        </>
      </Tab>
    </Tabs>
  )
}

export default SocialImpact

SocialImpact.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AppLayout from '@/components/layout/app'

// import AdminLayout from "@/components/layouts/admin";
import { adminOnly } from '@/utils/auth-utils'

export default function Settings() {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-settings')}
        </h1>
      </div>
      {/* <SettingsForm
        // TODO: fix it
        // @ts-ignore
        settings={settings}
      /> */}
    </>
  )
}
Settings.Layout = AppLayout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

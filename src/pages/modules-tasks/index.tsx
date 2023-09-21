import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import AppLayout from '@/components/layout/app'
import { Tabs, Tab } from '@/components/ui/tabs'
import ModulesTab from '@/components/modules/modules-tab'
import TasksTab from '@/components/tasks/tasks-tab'

export default function Modules() {
  const { t } = useTranslation()

  return (
    <Tabs>
      <Tab label={t('form:input-label-modules')}>
        <ModulesTab />
      </Tab>
      <Tab label={t('form:input-label-tasks')}>
        <TasksTab />
      </Tab>
    </Tabs>
  )
}

Modules.Layout = AppLayout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

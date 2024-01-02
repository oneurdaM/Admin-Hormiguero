import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { Tabs, Tab } from '@/components/ui/tabs'
import ProductsTab from '@/components/products/products-tab'
import DepartmentsTab from '@/components/departments/department-tab'

export default function Products() {
  return (
    <Tabs>
      <Tab label="Productos">
        <ProductsTab />
      </Tab>
      <Tab label="Categorías de productos">
        <DepartmentsTab />
      </Tab>
    </Tabs>
  )
}

Products.Layout = AppLayout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

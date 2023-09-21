import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { Tabs, Tab } from '@/components/ui/tabs'
import ProductsTab from '@/components/products/products-tab'
import ProductsCategoriesTab from '@/components/products-categories/products-categories-tab'

export default function Products() {
  return (
    <Tabs>
      <Tab label="Productos">
        <ProductsTab />
      </Tab>
      <Tab label="Categorías de productos">
        <ProductsCategoriesTab />
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

import React from 'react'
import { useState } from 'react'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import { useBannersQuery } from '@/data/banner'
import BannerList from '@/components/banner/banner-list'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import ShowFiscal from './showFiscal'
import { useFiscalMutation } from '@/data/fiscal'

function FisclaTab() {
  const { fiscalr, loading: loadingFiscal } = useFiscalMutation({
    id: 1,
  })

  return (
    <>
      <Card className="mb-8 flex items-center justify-around xl:flex-row">
        <div className="mb-4 md:w-1/3 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">Datos Fiscales</h1>
        </div>

        {fiscalr ? (
          <LinkButton
            className="h-12 w-full md:ms-6 md:w-auto"
            href={Routes.fiscal.details({ id: '1' })}
          >
            <span>Editar</span>
          </LinkButton>
        ) : (
          <LinkButton
            className="h-12 w-full md:ms-6 md:w-auto"
            href={`${Routes.fiscal.create}`}
          >
            <span>+</span>
          </LinkButton>
        )}
      </Card>

      <Card>
        <ShowFiscal />
      </Card>
    </>
  )
}

export default FisclaTab

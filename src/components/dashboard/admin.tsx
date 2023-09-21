import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import StickerCard from '@/components/widgets/sticker-card'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { Bell } from '@/components/icons/sidebar/bell'

import { useAnalyticsQuery } from '@/data/analytics'

export default function Dashboard() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(false)
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const { analytics, loading, error } = useAnalyticsQuery()

  if (loading) {
    return <Loader text={t('common:text-loading') ?? ''} />
  }
  if (error) {
    return <ErrorMessage message={error?.message} />
  }

  const handleValueChange = (value: any) => {
    if (value.startDate === null || value.endDate === null) {
      setSelected(false)
    } else {
      setSelected(true)
    }
    setValue(value)
  }

  return (
    <>
      <div className="mb-6 w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <StickerCard
            // titleTransKey="sticker-card-title-rev"
            titleTransKey="Nombre de la alerta - Nueva"
            subtitleTransKey="Descripción de la alerta - fecha: 10/09/2023 16:00 hrs"
            icon={<Bell className="h-7 w-7" color="#d60000" />}
            iconBgStyle={{ backgroundColor: '#ffafaf' }}
            // price={analytics.alertsCount}
          />
        </div>
        <br />
        <div className="w-full">
          <StickerCard
            titleTransKey="Nombre de la alerta - Vista"
            subtitleTransKey="Descripción de la alerta - fecha: 1/08/2023 16:00 hrs"
            icon={<Bell className="h-7 w-7" color="white" />}
            iconBgStyle={{ backgroundColor: '#024154' }}
          />
        </div>
        <br />
        <div className="w-full">
          <StickerCard
            titleTransKey="Nombre de la alerta - Atendida"
            subtitleTransKey="Descripción de la alerta - fecha: 1/08/2023 16:00 hrs"
            icon={<Bell className="h-7 w-7" color="white" />}
            iconBgStyle={{ backgroundColor: '#024154' }}
          />
        </div>
      </div>
    </>
  )
}

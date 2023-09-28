import StickerCard from '@/components/widgets/sticker-card'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { Bell } from '@/components/icons/sidebar/bell'
import { useSockets } from '@/contexts/socket.context'

export default function Dashboard() {
  const { alerts } = useSockets()

  return (
    <div className="mb-6 w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {alerts?.length !== 0 ? (
        alerts?.map((alert: any) => (
          <StickerCard
            titleTransKey={`${alert.title} - ${alert.status}`}
            subtitleTransKey={`${alert.description} - fecha: ${alert.date}`}
            icon={
              <Bell
                className="h-7 w-7"
                color={alert.status === 'attended' ? 'white' : '#d60000'}
              />
            }
            iconBgStyle={{
              backgroundColor:
                alert.status === 'attended' ? '#024154' : '#ffafaf',
            }}
          />
        ))
      ) : (
        <StickerCard
          titleTransKey="No hay nuevas notificaciones"
          subtitleTransKey="De momento no hay notificaciones nuevas."
          icon={<Bell className="h-7 w-7" color="white" />}
          iconBgStyle={{
            backgroundColor: '#024154',
          }}
        />
      )}
    </div>
  )
}

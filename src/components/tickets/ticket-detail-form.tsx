import pick from 'lodash/pick'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdateTicketMutation } from '@/data/tickets'
import { ticketValidationSchema } from './ticket-validation-schema'
import { Ticket } from '@/types/tickets'

type FormValues = {
  name: string
  userId?: string
  price: number
  image?: string
  dateAndHour: string
  id: string | number
  seat: string
  location: string
}

const TicketDetailForm = ({ ticket }: Ticket | any) => {
  const router = useRouter()
  const { mutate: updateTicket, isLoading: loading } = useUpdateTicketMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      ...(ticket && pick(ticket, ['name', 'price', 'dateAndHour'])),
    },
    resolver: yupResolver(ticketValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (ticket.id !== undefined) {
      updateTicket({
        id: ticket.id,
        input: values,
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Ticket"
          details="Detalles del ticket. Estos detalles NO se pueden editar, unicamente son con fines informativos."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Folio del ticket"
            disabled
            placeholder="Folio"
            {...register('id')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.id?.message?.toString()}
          />
          <Input
            label="Nombre del evento"
            disabled
            placeholder="Nombre del evento"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />
          <Input
            label="Dirección del evento"
            disabled
            placeholder="Dirección del evento"
            {...register('location')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.location?.message?.toString()}
          />
          <Input
            label="Fecha y hora del evento"
            disabled
            placeholder="Fecha y hora"
            {...register('dateAndHour')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.dateAndHour?.message?.toString()}
          />
          <Input
            label="Precio"
            disabled
            placeholder="Precio"
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.price?.message?.toString()}
          />
          <Input
            label="Asiento reservado"
            disabled
            placeholder="Asiento reservado"
            {...register('seat')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.seat?.message?.toString()}
          />
        </Card>
      </div>
      <div className="mb-4 text-end ">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Atrás
        </Button>
      </div>
    </form>
  )
}

export default TicketDetailForm

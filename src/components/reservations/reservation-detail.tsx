/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'

import Label from '../ui/label'
import Select from '../select/select'
import { useUpdateReservationMutation } from '@/data/reservation'
import { Space } from '@/types/spaces'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { ReservationValidationSchema } from './reservation-validation-schema'
import { useSpacesQuery } from '@/data/space'

type FormValues = {
  reason: string
  name: string
  email: string
  phone: string
  address: string
  date?: string | Date
  payment?: boolean
  space?: string
  location?: string
  createdAt?: string
  effectiveFrom?: string
  expiresAt?: string
  cost: number
  total: number
}

export default function ReservationDetailForm({ space }: Space | any) {
  const router = useRouter()
  const { mutate: updateReservation, isLoading } =
    useUpdateReservationMutation()
  const { spaces, loading } = useSpacesQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const [selectedSpace, setSelectedSpace] = useState<number | null>(null)
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(space &&
        pick(space, [
          'reason',
          'name',
          'email',
          'phone',
          'address',
          'effectiveFrom',
          'expiresAt',
          'payment',
          'space',
          'location',
          'createdAt',
          'cost',
          'total',
        ])),
    },
    resolver: yupResolver(ReservationValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (space.id !== undefined) {
      updateReservation({
        id: space.id,
        input: { ...values, space: selectedSpace },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Reservación"
          details="Ver y editar detalles de la reservación."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Motivo por el cual reserva"
            placeholder="Ej.: cumpleaños, aniversario, obra, etc"
            {...register('reason')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.reason?.message?.toString()}
          />

          <Input
            label="Nombre completo de quién reserva"
            placeholder="Nombre Apellido"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />

          <Input
            label="Correo electrónico de quién reserva"
            placeholder="ejemplo@email.ex"
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={errors.email?.message?.toString()}
          />

          <Input
            label="Número de contacto de quién reserva"
            placeholder="Teléfono"
            {...register('phone')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.phone?.message?.toString()}
          />

          <Input
            label="Dirección de quién reserva"
            placeholder="Dirección"
            {...register('address')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.address?.message?.toString()}
          />

          <Input
            type="date"
            label="Fecha en que se hizó la reservación"
            placeholder="Fecha de nacimiento"
            {...register('createdAt')}
            variant="outline"
            className="mb-5"
            disabled
            error={errors.createdAt?.message?.toString()}
          />

          <Input
            type="date"
            label="Fecha en que comienza la reservación"
            placeholder="Fecha de nacimiento"
            {...register('effectiveFrom')}
            variant="outline"
            className="mb-5"
            disabled
            error={errors.effectiveFrom?.message?.toString()}
          />

          <Input
            type="date"
            label="Fecha en que termina la reservación"
            placeholder="Fecha de nacimiento"
            {...register('expiresAt')}
            variant="outline"
            className="mb-5"
            disabled
            error={errors.expiresAt?.message?.toString()}
          />

          <Label className="my-4">Espacio a reservar</Label>
          <Select
            isDisabled
            isLoading={loading}
            options={spaces ?? []}
            getOptionLabel={(option: any) => option?.id ?? ''}
            getOptionValue={(option: any) => option?.name ?? ''}
            placeholder="Espacio"
            onChange={(value: any) => setSelectedSpace(value?.id ?? null)}
            isClearable={true}
          />

          <Input
            label="Precio por día según el espacio reservado"
            placeholder="Precio"
            {...register('cost')}
            type="number"
            variant="outline"
            className="my-4"
            disabled
            error={errors.cost?.message?.toString()}
          />

          <Input
            label="Costo total de la reservación"
            placeholder="Total"
            {...register('total')}
            type="number"
            variant="outline"
            className="my-4"
            disabled
            error={errors.total?.message?.toString()}
          />
        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Atrás
        </Button>
        <Button disabled={isLoading} loading={isLoading}>
          Actualizar
        </Button>
      </div>
    </form>
  )
}

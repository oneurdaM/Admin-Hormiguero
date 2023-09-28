/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import Label from '../ui/label'
import Datepicker from 'react-tailwindcss-datepicker'
import Select from '../select/select'
import { ReservationValidationSchema } from './reservation-validation-schema'
import { useSpacesQuery } from '@/data/space'
import { useCreateReservationMutation } from '@/data/reservation'

type FormValues = {
  reason: string
  name: string
  email: string
  phone: string
  address: string
  date?: string | Date
  payment?: boolean
  space?: any
}

const defaultValues: FormValues = {
  reason: '',
  name: '',
  email: '',
  phone: '',
  address: '',
}

const CreateReservationForm = () => {
  const router = useRouter()
  const { mutate: createReservation, isLoading } =
    useCreateReservationMutation()
  const { spaces, loading } = useSpacesQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const [isDatePickerEnabled, togleDatePicker] = useState<boolean>(false)
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null)
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(ReservationValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    createReservation(
      {
        ...values,
        space: selectedSpace,
        effectiveFrom: value.startDate,
        expiresAt: value.endDate,
      },
      {
        onError: (error: any) => {
          if (error.response?.data?.errors) {
            error.response.data.errors.forEach((error: any) => {
              setError(error.field, {
                type: 'manual',
                message: error.message,
              })
            })
          }
        },
      }
    )
  }

  const handleValueChange = (value: any) => {
    setValue(value)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Reservación"
          details="Llena todos los campos para crear una nueva reservación"
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
            type="number"
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

          <Label className="my-4">Espacio a reservar</Label>
          <Select
            isLoading={loading}
            options={spaces ?? []}
            getOptionLabel={(option: any) => option?.id ?? ''}
            getOptionValue={(option: any) => option?.name ?? ''}
            placeholder="Espacio"
            onChange={(value: any) => {
              setSelectedSpace(value?.id ?? null)
              togleDatePicker(value ? true : false)
            }}
            isClearable={true}
          />

          <Label className="mb-4">Rango de fechas de la reservación</Label>
          <Datepicker
            disabled={isDatePickerEnabled}
            primaryColor={'sky'}
            value={value}
            onChange={handleValueChange}
            minDate={new Date()}
            disabledDates={[
              //fechas disponibles por espacio.
              {
                startDate: '2023-10-02',
                endDate: '2023-10-05',
              },
              {
                startDate: '2023-11-11',
                endDate: '2023-11-12',
              },
            ]}
            displayFormat="DD/MM/YYYY"
          />
        </Card>
        <div className="w-full text-end">
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </Button>
          <Button disabled={isLoading} loading={isLoading}>
            Crear
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateReservationForm

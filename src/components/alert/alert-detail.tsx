/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { alertValidationSchema } from './alert-validation-schema'
import { useUpdateAlertMutation } from '@/data/alert'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import Select from '../select/select'
import Label from '../ui/label'
import Datepicker from 'react-tailwindcss-datepicker'
import DayCheckbox from '../ui/checkbox/day-checkbox'
import { useUsersQuery } from '@/data/users'
import { Alert } from '@/types/alerts'

type FormValues = {
  alert: string
  description?: string
  notifies_to: number | null
  hour: string
  creator?: string
}

type WeekDay = {
  day: string
  checked: boolean
}

export default function AlertCreateForm({ alertData }: Alert | any) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [userReceivesSelect, setUserReceivesSelect] = useState(null)
  const [selected, setSelected] = useState(
    alertData?.expiredAt && alertData?.effectiveFrom ? true : false
  )
  const [weekDays, setWeekDays] = useState<WeekDay[]>([
    { day: 'L', checked: false },
    { day: 'M', checked: false },
    { day: 'Mx', checked: false },
    { day: 'J', checked: false },
    { day: 'V', checked: false },
    { day: 'S', checked: false },
    { day: 'D', checked: false },
  ])

  const [value, setValue] = useState({
    startDate: alertData?.effectiveFrom ?? new Date(),
    endDate: alertData?.expiredAt ?? new Date(),
  })

  const { users, loading: loadingUsers } = useUsersQuery({
    limit: 10,
    page: 1,
    search: searchTerm,
  })

  const { mutate: updatealert, isLoading: loading } = useUpdateAlertMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      ...(alertData &&
        pick(alertData, ['alert', 'description', 'creator', 'hour'])),
    },
    resolver: yupResolver(alertValidationSchema),
  })

  async function onSubmit({ alert, description, hour }: FormValues) {
    const days: string[] = weekDays
      .filter((item) => item.checked)
      .map((item) => item.day)

    updatealert(
      {
        id: alertData.id,
        input: {
          alert,
          description,
          effectiveFrom: value.startDate,
          expiredAt: value.endDate,
          // is_approved: true,
          days,
          notifies_to: userReceivesSelect,
        },
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
    if (value.startDate === null || value.endDate === null) {
      setSelected(false)
    } else {
      setSelected(true)
    }
    setValue(value)
  }

  const onSelectDay = (e: { target: { value: string } }) => {
    const selected = e.target.value
    const updatedWeekDays = weekDays.map((day) => {
      if (day.day === selected) {
        return { ...day, checked: !day.checked }
      }
      return day
    })

    setWeekDays(updatedWeekDays)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Alerta"
          details="Llena todos los campos para crear una nueva alerta"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Creada por"
            {...register('creator')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
          />
          <Input
            label="Nombre de alerta"
            placeholder="Nombre"
            {...register('alert')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.alert?.message?.toString()}
          />

          <Input
            label="Descripción de la alerta"
            placeholder="Descripción"
            {...register('description')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.description?.message?.toString()}
          />

          <Label className="mb-4">Usuario Recibe</Label>
          <Select
            className="mb-4"
            options={users}
            isLoading={loadingUsers}
            getOptionLabel={(option: any) =>
              `${option?.firstName} ${option?.lastName}` ?? ''
            }
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Selecciona un usuario"
            onChange={(value: any) => setUserReceivesSelect(value?.id ?? null)}
            isClearable={true}
            // onInputChange={(value: any) => setSearchTerm(value ?? userReceivesSelect)}
          />

          <Label className="mb-4">Rango de fechas de la alerta</Label>
          <Datepicker
            primaryColor={'sky'}
            value={value}
            onChange={handleValueChange}
            minDate={new Date()}
            displayFormat="DD/MM/YYYY"
          />
          <span className="text-xs text-red-500">
            {!selected && 'Campo requerido'}
          </span>

          <Input
            type="time"
            min="09:00"
            max="18:00"
            required
            label="Horario"
            placeholder="Descripción"
            {...register('hour')}
            variant="outline"
            className="my-4"
            error={errors.hour?.message?.toString()}
          />

          <Label className="my-4">Días de la semana</Label>
          <div className="col-auto flex w-full gap-5">
            {weekDays.map((day) => (
              <DayCheckbox
                day={day.day}
                checked={day.checked}
                key={day.day}
                handleOnClick={onSelectDay}
              />
            ))}
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Atrás
        </Button>
        <Button disabled={loading} loading={loading}>
          Actualizar
        </Button>
      </div>
    </form>
  )
}

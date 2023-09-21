/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import PasswordInput from '../ui/password-input'
import { userValidationSchema } from './user-validation-schema'
import Select from '../select/select'
import Label from '../ui/label'

import { Role } from '@/types/users'
import { useState } from 'react'

type FormValues = {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  password: string
  birthDate: string
  role: string | null
}

const defaultValues: FormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  birthDate: '',
  role: null,
}

const roleOptions = [
  {
    label: Role.Director, //translate each label
    value: Role.Director,
  },
  {
    label: Role.Coordination,
    value: Role.Coordination,
  },
  {
    label: Role.Communication,
    value: Role.Communication,
  },
  {
    label: Role.Cafeteria,
    value: Role.Cafeteria,
  },
  {
    label: Role.Technicalarea,
    value: Role.Technicalarea,
  },
  {
    label: Role.User,
    value: Role.User,
  },
]

const UserCreateForm = () => {
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 18)
  const minAge = currentDate.toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userValidationSchema),
  })

  async function onSubmit({
    firstName,
    middleName,
    lastName,
    email,
    password,
    birthDate,
  }: FormValues) {
    registerUser(
      {
        firstName,
        lastName,
        email,
        password,
        middleName: middleName || null,
        username: email,
        birthDate,
        role: selectedRole,
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

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Usuario"
          details="Llena todos los campos para crear un nuevo usuario"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2">
              <Input
                label="Nombre"
                placeholder="Nombre"
                type="text"
                {...register('firstName')}
                variant="outline"
                className="mb-5 md:mr-5"
                error={errors.firstName?.message?.toString()}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Input
                label="Segundo nombre"
                placeholder="Segundo nombre"
                className="mb-5 md:ml-5"
                variant="outline"
                {...register('middleName')}
                error={errors.middleName?.message?.toString()}
              />
            </div>
          </div>
          <Input
            label="Apellido"
            placeholder="Apellido"
            className="mb-4"
            variant="outline"
            {...register('lastName')}
            error={errors.lastName?.message?.toString()}
          />
          <Input
            label="Email"
            placeholder="Email"
            className="mb-4"
            type="email"
            variant="outline"
            {...register('email')}
            error={errors.email?.message?.toString()}
          />
          <PasswordInput
            {...register('password')}
            label="Contraseña"
            placeholder="Contraseña"
            className="mb-4"
            variant="outline"
            error={errors.password?.message?.toString()}
          />
          <Input
            type="date"
            label="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            {...register('birthDate')}
            variant="outline"
            className="mb-5"
            max={minAge}
            error={errors.birthDate?.message?.toString()}
          />

          <Label className="mb-4">Rol de usuario</Label>
          <Select
            isLoading={loading}
            options={roleOptions}
            getOptionLabel={(option: any) => option?.label ?? ''}
            getOptionValue={(option: any) => option?.value ?? ''}
            placeholder="Rol del usuario"
            onChange={(value: any) => setSelectedRole(value?.value ?? null)}
            isClearable={true}
          />
        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        <Button disabled={loading} loading={loading}>
          Crear
        </Button>
      </div>
    </form>
  )
}

export default UserCreateForm

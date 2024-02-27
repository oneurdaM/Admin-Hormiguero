/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import PasswordInput from '../ui/password-input'
import { userValidationSchema } from './user-validation-schema'
import { useRouter } from 'next/router'
import Label from '../ui/label'
import Select from '../select/select'
import { Role } from '@/types/users'

type FormValues = {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  password: string
  birthDate?: string
  role?: string | null
}

const defaultValues: FormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
}

const UserCreateForm = () => {
  const [selectedRole, setSelectedRole] = useState()
  const { t } = useTranslation()

  const router = useRouter()
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation()
  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 18)

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

  const roleOptions = [
    {
      label: t(`common:${Role.Director}`),
      value: Role.Director,
    },
    {
      label: t(`common:${Role.Coordination}`),
      value: Role.Coordination,
    },
    {
      label: t(`common:${Role.Communication}`),
      value: Role.Communication,
    },
    {
      label: t(`common:${Role.Cafeteria}`),
      value: Role.Cafeteria,
    },
    {
      label: t(`common:${Role.Technicalarea}`),
      value: Role.Technicalarea,
    },
  ]

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Usuario"
          details="Llena todos los campos para crear un nuevo usuario."
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
          <Label className="mb-4">Rol de usuario</Label>
          <Select
            name="role"
            isLoading={loading}
            options={roleOptions}
            getOptionLabel={(option: any) => option?.label ?? ''}
            getOptionValue={(option: any) => option?.value ?? ''}
            placeholder="Rol del usuario"
            onChange={(value: any) => setSelectedRole(value?.value ?? null)}
            isClearable={true}
            // defaultValue={{ label: t(`common:${user.role}`), value: user.role }}
          />
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
          Crear
        </Button>
      </div>
    </form>
  )
}

export default UserCreateForm

/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'

import { useUpdateUserMutation } from '@/data/users'
import { UsersResponse } from '@/types/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { updateUserValidationSchema } from '../user/update-user-validation-schema'
import Card from '../common/card'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import Button from '../ui/button'
import Select from '../select/select'
import Label from '../ui/label'
import { Role } from '@/types/users'
import { useState } from 'react'

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

export default function ProfileUpdateForm({ user }: UsersResponse | any) {
  const [selectedRole, setSelectedRole] = useState(user.role)
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersResponse>({
    defaultValues: {
      ...(user &&
        pick(user, [
          'username',
          'email',
          'image',
          'role',
          'firstName',
          'middleName',
          'lastName',
          'birthDate',
          'registrationDate',
        ])),
    },
    resolver: yupResolver(updateUserValidationSchema),
  })

  async function onSubmit(values: UsersResponse) {
    if (user.id !== undefined) {
      updateUser({
        id: user.id,
        input: {
          ...values,
          role: selectedRole,
          birthDate: `${values.birthDate}T00:00:00.000Z`,
          image: ''
        },
      })
    }
  }

  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 18)
  const minAge = currentDate.toISOString().split('T')[0]

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Avatar"
          details="Actualizar foto de perfil"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Usuario"
          details="Actualizar información de usuario"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
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
            type="date"
            label="Fecha de nacimiento"
            {...register('birthDate')}
            variant="outline"
            className="mb-5"
            max={minAge}
            error={errors.birthDate?.message?.toString()}
          />

          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2">
              <Input
                label="Correo electrónico"
                {...register('email')}
                variant="outline"
                disabled={true}
                error={errors.email?.message?.toString()}
                className="mb-5 md:mr-5"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Input
                label="Nombre de usuario"
                {...register('username')}
                variant="outline"
                className="mb-5 md:ml-5"
                disabled={true}
              />
            </div>
          </div>

          <Input
            label="Fecha de registro"
            {...register('registrationDate')}
            variant="outline"
            className="mb-5"
            disabled={true}
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
            defaultValue={{ label: user.role, value: user.role }}
          />
        </Card>
        <div className="w-full text-end">
          <Button loading={loading} disabled={loading}>
            Actualizar
          </Button>
        </div>
      </div>
    </form>
  )
}

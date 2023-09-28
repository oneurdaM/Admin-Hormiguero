/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateSpaceMutation } from '@/data/space'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { SpaceValidationSchema } from './space-validation-schema'

type FormValues = {
  name: string
  dimensions: number
  capacity: number
  price: number
  location: string
}

const defaultValues: FormValues = {
  name: '',
  dimensions: 0,
  capacity: 0,
  price: 0,
  location: '',
}

const SpaceCreateForm = () => {
  const router = useRouter()
  const { mutate: createSpace, isLoading: loading } = useCreateSpaceMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(SpaceValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    createSpace(values, {
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
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Espacio"
          details="Llena todos los campos para crear un nuevo espacio"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre del espacio"
            placeholder="Nombre del espacio"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />

          <Input
            label="Dimensiones del espacio en metros cuadrados"
            placeholder="Dimensiones del espacio"
            {...register('dimensions')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.dimensions?.message?.toString()}
          />

          <Input
            label="Capacidad del espacio"
            placeholder="Aforo"
            {...register('capacity')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.capacity?.message?.toString()}
          />

          <Input
            label="Precio"
            placeholder="Precio"
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.price?.message?.toString()}
          />

          <Input
            label="Dirección del espacio"
            placeholder="Dirección"
            {...register('location')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.location?.message?.toString()}
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
          <Button disabled={loading} loading={loading}>
            Crear
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SpaceCreateForm

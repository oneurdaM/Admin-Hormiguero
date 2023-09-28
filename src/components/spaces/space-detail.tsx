/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'

import { useUpdateSpaceMutation } from '@/data/space'
import { Space } from '@/types/spaces'
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

export default function SpaceDetailForm({ space }: Space | any) {
  const router = useRouter()
  const { mutate: updateSpace, isLoading: loading } = useUpdateSpaceMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(space &&
        pick(space, ['name', 'dimensions', 'capacity', 'price', 'location'])),
    },
    resolver: yupResolver(SpaceValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (space.id !== undefined) {
      updateSpace({
        id: space.id,
        input: { ...values, active: space.active },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Espacio"
          details="Ver y editar detalles de espacio."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
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
        <Button disabled={loading} loading={loading}>
          Actualizar
        </Button>
      </div>
    </form>
  )
}

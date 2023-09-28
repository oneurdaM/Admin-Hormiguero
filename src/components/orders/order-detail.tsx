/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useUpdateOrderMutation } from '@/data/order'
import { yupResolver } from '@hookform/resolvers/yup'

import { orderValidationSchema } from './order-validation-schema'
import { OrderStatus, Order } from '@/types/orders'
import Card from '../common/card'
import Description from '../ui/description'
import Input from '../ui/input'
import Button from '../ui/button'
import Select from '../select/select'
import Label from '../ui/label'

type FormValues = {
  id: number
  category: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
  deliverDate: string | null
  status: string
  total: number
  content: string
}

const statusOptions = [
  {
    label: OrderStatus.Dispatch,
    value: OrderStatus.Dispatch,
  },
  {
    label: OrderStatus.Pending,
    value: OrderStatus.Pending,
  },
  {
    label: OrderStatus.Complete,
    value: OrderStatus.Complete,
  },
]

export default function OrderUpdateForm({ order }: Order | any) {
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)

  const { mutate: updateOrder, isLoading: loading } = useUpdateOrderMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      ...(order &&
        pick(order, [
          'id',
          'category',
          'name',
          'email',
          'phone',
          'address',
          'createdAt',
          'deliverDate',
          'status',
          'total',
        ])),
    },
    resolver: yupResolver(orderValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (order.id !== undefined) {
      updateOrder({
        id: order.id,
        input: {
          ...values,
          deliverDate: `${values.deliverDate}T00:00:00.000Z`,
          status,
        },
      })
    }
  }

  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear())
  const minDate = currentDate.toISOString().split('T')[0]

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Pedido"
          details="Detalles del pedido"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="ID/Folio"
            {...register('id')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.id?.message?.toString()}
          />
          <Input
            label="Categoría del pedido"
            {...register('category')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.category?.message?.toString()}
          />
          <Input
            label="Nombre"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.name?.message?.toString()}
          />
          <Input
            label="Correo electrónico"
            {...register('email')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.email?.message?.toString()}
          />
          <Input
            label="Telefono"
            {...register('phone')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.phone?.message?.toString()}
          />
          <Input
            label="Dirección"
            {...register('address')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.address?.message?.toString()}
          />

          <Input
            disabled
            label="Fecha de creación"
            {...register('createdAt')}
            variant="outline"
            className="mb-5"
            error={errors.createdAt?.message?.toString()}
          />

          <Input
            type="date"
            label="Fecha de entrega"
            {...register('deliverDate')}
            variant="outline"
            className="mb-5"
            min={minDate}
            error={errors.deliverDate?.message?.toString()}
          />

          <Label className="mb-4">Estatus</Label>
          <Select
            name="status"
            isLoading={loading}
            options={statusOptions}
            getOptionLabel={(option: any) => option?.label ?? ''}
            getOptionValue={(option: any) => option?.value ?? ''}
            placeholder="Rol del usuario"
            onChange={(value: any) => setStatus(value?.value ?? null)}
            isClearable={true}
            defaultValue={{ label: order?.status, value: order?.status }}
          />

          <Input
            disabled
            label="Total"
            {...register('total')}
            type="number"
            variant="outline"
            className="my-4"
            error={errors.total?.message?.toString()}
          />

          {/* list/table of order products */}
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
            Actualizar
          </Button>
        </div>
      </div>
    </form>
  )
}

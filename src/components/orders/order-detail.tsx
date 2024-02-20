/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Badge from '../ui/badge/badge'
import StatusColor from './order-status-color'
import {
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} from '@/data/order'
import { yupResolver } from '@hookform/resolvers/yup'
import { es } from 'date-fns/locale'

import { orderValidationSchema } from './order-validation-schema'
import { OrderStatus, Order } from '@/types/orders'
import Card from '../common/card'
import Description from '../ui/description'
// import Input from '../ui/input'
import Button from '../ui/button'
// import Select from '../select/select'
// import Label from '../ui/label'
import { Descriptions, Form, Input, Select } from 'antd'
import Image from 'next/image'

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

  const { mutate: updateOrderStatus, isLoading: loading } =
    useUpdateOrderStatusMutation()
  const optionsStatus = [
    {
      id: 1,
      value: 'PROCESADO',
      label: 'Procesado',
    },
    {
      id: 2,
      value: 'ENVIANDO',
      label: 'Enviado',
    },
    {
      id: 3,
      value: 'ENTREGADO',
      label: 'Entregado',
    },
  ]

  let currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear())
  const minDate = currentDate.toISOString().split('T')[0]
  const { Option } = Select

  const onsubmit = (value: any) => {
    console.log(value)

    updateOrderStatus(
      { id: order.id, input: { ...value } },
      {
        onError: (error: any) => {
          if (error.response?.data?.errors) {
            error.response.data.errors.forEach((error: any) => {})
          }
        },
      }
    )
  }

  return (
    // <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Pedidos"
          details="Detalles del pedido"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          {/* <Input
            label="ID/Folio"
            {...register('id')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.id?.message?.toString()}
          /> */}

          {/* <Input
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
          /> */}
          {/* <Input
            label="Correo electrónico"
            {...register('email')}
            type="text"
            variant="outline"
            className="mb-4"
            disabled
            error={errors.email?.message?.toString()}
          /> */}
          {/* <Input
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
          /> */}

          {/* <Input
            disabled
            label="Fecha de creación"
            {...register('createdAt')}
            variant="outline"
            className="mb-5"
            error={errors.createdAt?.message?.toString()}
          /> */}

          {/* <Input
            type="date"
            label="Fecha de entrega"
            {...register('deliverDate')}
            variant="outline"
            className="mb-5"
            min={minDate}
            error={errors.deliverDate?.message?.toString()}
          /> */}

          {/* <Label className="mb-4">Estatus</Label>
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
          /> */}

          {/* <Input
            disabled
            label="Total"
            {...register('total')}
            type="number"
            variant="outline"
            className="my-4"
            error={errors.total?.message?.toString()}
          /> */}

          {/* list/table of order products */}
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
          >
            <Descriptions.Item label="Id del pedido 1">
              {order?.id}
            </Descriptions.Item>

            <Descriptions.Item label="Estatus del pedido">
              <Badge
                text={order?.deliveryStatus}
                color={StatusColor(order?.deliveryStatus)}
              />
            </Descriptions.Item>

            {order && order.payment && order.payment.method !== null ? (
              <Descriptions.Item label="Tipo de pago">
                <span className="lowercase">{order.payment.method}</span>
              </Descriptions.Item>
            ) : null}

            {order && order.payment && order.payment.total !== null ? (
              <Descriptions.Item label="Total del pago">
                <span className="text-green-600">${order?.payment.total}</span>
              </Descriptions.Item>
            ) : null}

            {order && order.payment && order.payment.name !== null ? (
              <Descriptions.Item label="Nombre del Evento">
                <span>{order?.payment.name}</span>
              </Descriptions.Item>
            ) : null}

            {order &&
            order.seats[0] &&
            order?.seats[0].EventsSpaces.event.thumbnailUrl !== null ? (
              <Descriptions.Item label="Caratula del Evento">
                <div className="flex justify-center">
                  <Image
                    src={order?.seats[0].EventsSpaces.event.thumbnailUrl}
                    alt={'image'}
                    width={100}
                    height={100}
                  />
                </div>
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="Caratula del Evento">
                <div className="flex justify-center">
                  <Image
                    src={'/teatro.jpeg'}
                    alt={'image'}
                    width={100}
                    height={100}
                  />
                </div>
              </Descriptions.Item>
            )}

            {order &&
            order?.seats[0] &&
            order?.seats[0].EventsSpaces.startDate !== null ? (
              <Descriptions.Item label="Fecha del Evento" span={2}>
                <span className="text-sky-500">
                  {format(
                    new Date(order?.seats[0].EventsSpaces.startDate),
                    'EEEE, dd-MM-yyyy HH:mm',
                    {
                      locale: es,
                    }
                  )}
                </span>
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="Fecha de la renta" span={2}>
                <span className="text-sky-500">
                  {format(
                    new Date(order?.rents[0].startDate),
                    'EEEE, dd-MM-yyyy HH:mm',
                    {
                      locale: es,
                    }
                  )}
                </span>
              </Descriptions.Item>
            )}

            {order && order.user && order?.user.firstName !== null ? (
              <Descriptions.Item label="Usuario del pedido" span={2}>
                {order?.user.firstName + ' ' + order?.user.lastName}
              </Descriptions.Item>
            ) : null}

            {/* <Descriptions.Item label="Fecha del Evento" span={2}>
              <span className="text-sky-500">
                {format(
                  new Date(order?.seats[0].EventsSpaces.startDate),
                  'EEEE, dd-MM-yyyy HH:mm',
                  {
                    locale: es,
                  }
                )}
              </span>
            </Descriptions.Item> */}

            {order.seats.length > 0 ? (
              <Descriptions.Item label="Asientos" span={2}>
                {/* faltaria iterar */}

                {order.seats.map((element: any, index: any) => (
                  <span
                    key={index}
                    className="ml-2 rounded-full bg-blue-300 px-4 py-2 text-white"
                  >
                    {element.name}
                  </span>
                ))}
              </Descriptions.Item>
            ) : null}

            {order && order.payment && order.payment.name !== null ? (
              <Descriptions.Item label="Nombre del Evento">
                <span>{order?.payment.name}</span>
              </Descriptions.Item>
            ) : null}

            {order?.orderProduct.length > 0 ?? (
              <Descriptions.Item label="Productos" span={2}>
                {/* faltaria iterar */}

                {order.seats.map((element: any, index: any) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-300 p-2 text-white"
                  >
                    {element.name}
                  </span>
                ))}
              </Descriptions.Item>
            )}
            {order?.rents.length > 0 ?? (
              <Descriptions.Item label="Rentas">
                {/* faltaria iterar */}

                {order.seats.map((element: any, index: any) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-300 p-2 text-white"
                  >
                    {element.name}
                  </span>
                ))}
              </Descriptions.Item>
            )}
          </Descriptions>
          <br />
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onsubmit}
          >
            <Form.Item
              label={<span className="text-base">Cambiar Estatus</span>}
              name="deliveryStatus"
              rules={[{ required: true, message: 'Selecciona un estatus' }]}
            >
              <Select
                className="rounded-md capitalize"
                allowClear
                placeholder={'Seleccione una opción'}
              >
                {optionsStatus.map((element, index) => (
                  <Option key={index} value={element.value}>
                    {element.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

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
          </Form>
        </Card>
      </div>
    </>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

import FileInput from '../ui/file-input'
import Label from '../ui/label'
import { useUpdateSpaceMutation } from '@/data/space'
import { Space } from '@/types/spaces'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { SpaceValidationSchema } from './space-validation-schema'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'

type FormValues = {
  name: string
  dimensions: number
  capacity: number
  price: number
  location: string
  image: string
}

export default function SpaceDetailForm({ space }: Space | any) {
  const router = useRouter()
  const { mutate: updateSpace, isLoading: loading } = useUpdateSpaceMutation()
  const [autocomplete, setAutocomplete] = useState<any>()
  const [inputValue, setInputValue] = useState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(space &&
        pick(space, [
          'name',
          'dimensions',
          'capacity',
          'price',
          'location',
          'image',
        ])),
    },
    resolver: yupResolver(SpaceValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (space.id !== undefined) {
      updateSpace({
        id: space.id,
        input: {
          ...values,
          active: space.active,
          image: values?.image ?? space.image,
        },
      })
    }
  }

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      setInputValue(autocomplete.getPlace().formatted_address)
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
    libraries: ['places'],
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details="Imagen del espacio"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="container mx-auto p-4">
            <div className="lg:flex">
              {space.image !== 'string' && (
                <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
                  <Label>Imagen actual</Label>
                  <Image
                    src={space.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-auto w-full"
                  />
                </div>
              )}

              <div className={space.image ? 'lg:w-3/4' : 'lg:w-full'}>
                <div className="bg-gray-200 p-4">
                  <div className="w-full p-2">
                    <FileInput name="image" control={control} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
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
            label="Aforo"
            placeholder="Aforo"
            {...register('capacity')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.capacity?.message?.toString()}
          />

          <Input
            label="Precio por día"
            placeholder="MXN"
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-4"
            error={errors.price?.message?.toString()}
          />
          {/* {isLoaded && (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                label="Dirección del espacio"
                placeholder="Dirección"
                {...register('location')}
                type="text"
                variant="outline"
                className="mb-4"
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                error={errors.location?.message?.toString()}
              />
            </Autocomplete>
          )} */}

          <Input
            label="Direcciín del espacio"
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

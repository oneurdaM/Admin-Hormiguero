/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateSpaceMutation } from '@/data/space'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'

import FileInput from '../ui/file-input'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { SpaceValidationSchema } from './space-validation-schema'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { toast } from 'react-toastify'

type FormValues = {
  name: string
  dimensions?: number
  capacity?: number
  price?: number
  location?: string
  image: string | null
}

const defaultValues: FormValues = {
  name: '',
  image: null,
}

const SpaceCreateForm = () => {
  const router = useRouter()
  const { mutate: createSpace, isLoading: loading } = useCreateSpaceMutation()
  const [autocomplete, setAutocomplete] = useState<any>()
  const [inputValue, setInputValue] = useState()

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
    if (!values.image) {
      toast.warning('Es obligatorio agregar una imagen del espacio.')
    } else {
      createSpace(
        { ...values, active: true },
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
          <FileInput name="image" control={control} />
        </Card>
      </div>
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
            placeholder="m2"
            {...register('dimensions')}
            type="number"
            variant="outline"
            className="mb-4"
            min={1}
            error={errors.dimensions?.message?.toString()}
          />

          <Input
            label="Aforo"
            placeholder="Aforo"
            {...register('capacity')}
            type="number"
            variant="outline"
            className="mb-4"
            min={1}
            error={errors.capacity?.message?.toString()}
          />

          <Input
            label="Precio por día"
            placeholder="MXN"
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-4"
            min={1}
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

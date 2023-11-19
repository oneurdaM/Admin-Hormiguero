import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import pick from 'lodash/pick'
import { yupResolver } from '@hookform/resolvers/yup'
import { aboutValidationSchema } from './about-validation-schema'
import {
  useUpdateSettingsMutation,
  usePostSettingsMutation,
} from '@/data/settings'
import { Settings } from '@/types/settings'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Label from '../ui/label'
import FileInput from '../ui/file-input'

const AboutDetailForm = ({ settings, error, loading }: Settings | any) => {
  const [autocomplete, setAutocomplete] = useState<any>()
  const [inputValue, setInputValue] = useState()

  const { mutate: updateSettings, isLoading } = useUpdateSettingsMutation()
  const { mutate: postSettings, isLoading: loadingPost } =
    usePostSettingsMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Settings>({
    defaultValues: {
      ...(settings &&
        pick(settings, [
          'logo',
          'siteName',
          'whatWeAre',
          'whoWeAre',
          'whyCommunity',
          'createdAt',
          'artists',
          'communities',
          'people',
          'facebookUrl',
          'twitterUrl',
          'instagramUrl',
          'youtubeUrl',
          'location',
          'contactNumber',
          'website',
          'mision',
          'vision',
        ])),
    },
    resolver: yupResolver(aboutValidationSchema),
  })

  async function onSubmit(values: Settings) {
    const input = {
      logo: values.logo,
      siteName: values.siteName,
      artists: values?.artists?.toString(),
      communities: values?.communities?.toString(),
      people: values?.people?.toString(),
      whatWeAre: values.whatWeAre,
      whoWeAre: values.whoWeAre,
      whyCommunity: values.whyCommunity,
      createdAt: values.createdAt,
      facebookUrl: values.facebookUrl,
      twitterUrl: values.twitterUrl,
      instagramUrl: values.instagramUrl,
      youtubeUrl: values.youtubeUrl,
      location: values.location,
      contactNumber: values.contactNumber,
      website: values.website,
      mision: values.mision,
      vision: values.vision,

      siteSubtitle: '',
      metaTitle: '',
      metaDescription: '',
      metaTags: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterHandle: '',
      twitterCardType: '',
      linkedinUrl: '',
      tiktokUrl: '',
    }
    if (Object.keys(settings).length !== 0) {
      updateSettings({
        id: 1,
        ...input,
      })
    } else {
      postSettings(input)
    }
  }

  if (loading) return <Loader text="Cargando usuarios..." />

  if (error) return <ErrorMessage message={error.message} />

  const imageInformation = (
    <span>
      Carga el logo del sitio desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

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
          title="Logo"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="container mx-auto p-4">
            <div className="lg:flex">
              {settings?.logo && (
                <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
                  <Label>Logo actual</Label>
                  <Image
                    src={settings.logo}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-auto w-full"
                  />
                </div>
              )}

              <div className={settings?.logo ? 'lg:w-3/4' : 'lg:w-full'}>
                <div className="bg-gray-200 p-4">
                  <div className="w-full p-2">
                    <FileInput name="logo" control={control} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Ver y editar detalles del sitio"
          details="Aquí puedes ver y editar la información general y el impacto social de Centro Cultural El Hormiguero"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            disabled={settings?.siteName}
            label="Nombre del sitio"
            placeholder="Nombre del sitio"
            {...register('siteName')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.siteName?.message && 'Campo obligatorio'}
          />
          <Input
            label="¿Quiénes somos?"
            placeholder="Texto"
            {...register('whoWeAre')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whoWeAre?.message && 'Campo obligatorio'}
          />
          <Input
            label="¿Qué es el hormiguero?"
            placeholder="Texto"
            {...register('whatWeAre')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whatWeAre?.message && 'Campo obligatorio'}
          />
          <Input
            label="¿Por qué la comunidad?"
            placeholder="Texto"
            {...register('whyCommunity')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whyCommunity?.message && 'Campo obligatorio'}
          />
          <Input
            label="Aniversario"
            placeholder="Fecha/año de creación"
            {...register('createdAt')}
            type="date"
            variant="outline"
            className="my-4"
            error={errors.createdAt?.message && 'Campo obligatorio'}
          />
          {isLoaded && (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                label="Dirección"
                placeholder="Dirección"
                {...register('location')}
                type="text"
                variant="outline"
                className="mb-4"
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                error={errors.location?.message && 'Campo obligatorio'}
              />
            </Autocomplete>
          )}
          <Input
            label="Cantidad de artistas que se han presentado"
            placeholder="Número"
            {...register('artists')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.artists?.message && 'Campo obligatorio'}
          />
          <Input
            label="Cantidad de personas que han tenido alguna experiencia con la organización"
            placeholder="Número"
            {...register('people')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.people?.message && 'Campo obligatorio'}
          />
          <Input
            label="Comunidades vulnerables atendidas"
            placeholder="Número"
            {...register('communities')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.communities?.message && 'Campo obligatorio'}
          />
          <hr />
          <Input
            label="Enlace a Facebook"
            placeholder="Texto o enlace url"
            {...register('facebookUrl')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.facebookUrl?.message && 'Campo obligatorio'}
          />
          <Input
            label="Enlace a Twitter"
            placeholder="Texto o enlace url"
            {...register('twitterUrl')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.twitterUrl?.message && 'Campo obligatorio'}
          />
          <Input
            label="Enlace a Instagram"
            placeholder="Texto o enlace url"
            {...register('instagramUrl')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.instagramUrl?.message && 'Campo obligatorio'}
          />
          <Input
            label="Enlace a YouTube"
            placeholder="Texto o enlace url"
            {...register('youtubeUrl')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.youtubeUrl?.message && 'Campo obligatorio'}
          />
          <Input
            label="Misión"
            placeholder="Misión"
            {...register('mision')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.mision?.message && 'Campo obligatorio'}
          />
          <Input
            label="Visión"
            placeholder="Visión"
            {...register('vision')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.vision?.message && 'Campo obligatorio'}
          />
          <Input
            label="Correo electrónico de contacto"
            placeholder="E-mail"
            {...register('website')}
            type="email"
            variant="outline"
            className="my-4"
            error={errors.website?.message && 'Campo obligatorio'}
          />
          <Input
            label="Teléfono de contacto"
            placeholder="Número de contacto"
            {...register('contactNumber')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.contactNumber?.message && 'Campo obligatorio'}
          />
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button disabled={isLoading} loading={isLoading}>
          Actualizar
        </Button>
      </div>
    </form>
  )
}

export default AboutDetailForm

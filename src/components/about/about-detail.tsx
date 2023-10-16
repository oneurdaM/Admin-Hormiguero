import React from 'react'
import { useForm } from 'react-hook-form'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import pick from 'lodash/pick'
import { yupResolver } from '@hookform/resolvers/yup'
import { aboutValidationSchema } from './about-validation-schema'
import { useUpdateSettingsMutation } from '@/data/settings'
import { Settings } from '@/types/settings'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'

const AboutDetailForm = ({ settings, error, loading }: Settings | any) => {
  const { mutate: updateSettings, isLoading } = useUpdateSettingsMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Settings>({
    defaultValues: {
      ...(settings &&
        pick(settings, [
          'siteName',
          'anniversary',
          'artists',
          'communities',
          'people',
          'whatWeAre',
          'whoWeAre',
          'whyCommunity',
        ])),
    },
    resolver: yupResolver(aboutValidationSchema),
  })

  async function onSubmit(values: Settings) {
    updateSettings({
      id: 1,
      ...values,
    })
  }

  if (loading) return <Loader text="Cargando usuarios..." />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Ver y editar detalles del sitio"
          details="Aquí puedes editar y ver los detalles y la información como el acerca de nosotros y mucho más."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            disabled
            label="Nombre del sitio"
            {...register('siteName')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.siteName?.message?.toString()}
          />
          <Input
            label="¿Quiénes somos?"
            placeholder="Texto"
            {...register('whoWeAre')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whoWeAre?.message?.toString()}
          />
          <Input
            label="¿Qué es el hormiguero?"
            placeholder="Texto"
            {...register('whatWeAre')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whatWeAre?.message?.toString()}
          />
          <Input
            label="¿Por qué la comunidad?"
            placeholder="Texto"
            {...register('whyCommunity')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.whyCommunity?.message?.toString()}
          />
          <Input
            label="Aniversario"
            placeholder="Fecha/año de creación"
            {...register('anniversary')}
            type="date"
            variant="outline"
            className="my-4"
            error={errors.anniversary?.message?.toString()}
          />
          <Input
            label="Cantidad de artistas que se han presentado"
            placeholder="Número"
            {...register('artists')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.artists?.message?.toString()}
          />
          <Input
            label="Cantidad de personas que han tenido alguna experiencia con la organización"
            placeholder="Número"
            {...register('people')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.people?.message?.toString()}
          />
          <Input
            label="Comunidades vulnerables atendidas"
            placeholder="Número"
            {...register('communities')}
            type="number"
            min={1}
            variant="outline"
            className="my-4"
            error={errors.communities?.message?.toString()}
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

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useState, ChangeEvent } from 'react'

import FileInput from '../ui/file-input'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import Select from '../select/select'
import Label from '../ui/label'
import pick from 'lodash/pick'
import { yupResolver } from '@hookform/resolvers/yup'
import { eventValidationSchema } from './event-validation-schema'
import { useUpdateEventMutation } from '@/data/events'
import { useSpacesQuery } from '@/data/space'
import { useGenresQuery } from '@/data/genre'
import { useCastsQuery } from '@/data/casts'
import { Event } from '@/types/events'

type FormValues = {
  title: string
  synopsis: string
  company: string
  dramaturgy: string
  director: string
  public?: boolean
  gender?: []
  cast?: []
  schedule?: string[] | []
  space?: number
  video?: string | null | undefined
  thumbnailUrl?: string | null | undefined
  [key: string]: any
}

const EventDetailForm = ({ event }: Event | any) => {
  const router = useRouter()
  const { mutate: updateEvent, isLoading: loading } = useUpdateEventMutation()
  const { spaces, loading: loadingSpaces } = useSpacesQuery({
    limit: 10,
    page: 1,
    search: '',
  })
  const { genres, loading: loadingGenres } = useGenresQuery({
    limit: 10,
    page: 1,
    search: '',
  })
  const { casts, loading: loadingCast } = useCastsQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const [days, setDays] = useState<number | null>(event?.days ?? null)
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedCast, setSelectedCast] = useState([])
  const defaultValues = Object.keys(event)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      ...(event && pick(event, defaultValues)),
    },
    resolver: yupResolver(eventValidationSchema),
  })

  // const defaultValues: Record<string, any> = {
  //   ...(event &&
  //     pick(event, [
  //       'title',
  //       'synopsis',
  //       'company',
  //       'dramaturgy',
  //       'director',
  //       'video',
  //       'days',
  //     ])),
  // }

  // schedules.forEach((schedule, index) => {
  //   defaultValues[`date${index}`] = schedule
  // })

  async function onSubmit(values: FormValues) {
    const isoDateTimes = Object.keys(values)
      .filter((key) => key.includes('date'))
      .map((key) => {
        const { day, time } = values[key]
        const combinedDateTime = `${day}T${time}.000Z`
        return combinedDateTime
      })

    const thumbnailUrl = values?.image.length !== 0 ? values.image : null

    if (event.id !== undefined) {
      updateEvent({
        id: event.id,
        input: {
          title: values?.title ?? '',
          synopsis: values?.synopsis ?? '',
          company: values?.company ?? '',
          dramaturgy: values?.dramaturgy ?? '',
          director: values?.director ?? '',
          thumbnailUrl,
          video: values?.video ?? '',
          public: true,
          schedule: isoDateTimes,
          gender: selectedGenres.length !== 0 ? selectedGenres : [1],
          cast: selectedCast,
        },
      })
    }
  }

  const handleDays = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setDays(value)
  }

  const imageInformation = (
    <span>
      Carga la imagen de la nota desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

  const today = new Date().toISOString().split('T')[0]

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nuevo Evento"
          details="Este será un nuevo evento disponible en la cartelera."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Título del evento"
            placeholder="Título"
            {...register('title')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.title?.message?.toString()}
          />
          <Input
            label="Sinopsis del evento"
            placeholder="Sinopsis"
            {...register('synopsis')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.synopsis?.message?.toString()}
          />
          <Input
            label="Compañia del evento"
            placeholder="Compañia"
            {...register('company')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.company?.message?.toString()}
          />
          <Input
            label="Dramaturgia del evento"
            placeholder="Dramaturgía"
            {...register('dramaturgy')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.dramaturgy?.message?.toString()}
          />
          <Input
            label="Director del evento"
            placeholder="Director"
            {...register('director')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.director?.message?.toString()}
          />
          <Input
            label="URL Detrás de cámaras"
            placeholder="Vídeo de youtube"
            {...register('video')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.video?.message?.toString()}
          />
          <Label className="mb-4">Género del evento</Label>
          <Select
            className="mb-4"
            options={genres}
            isLoading={loadingGenres}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Selecciona una opción"
            onChange={(value: any) => console.log(value)}
            isClearable={true}
          />
          {/* <Label className="mb-4">Público apto para el evento</Label>
          <Select
            className="mb-4"
            options={[]}
            getOptionLabel={(option: any) => option?.label ?? ''}
            getOptionValue={(option: any) => option?.value ?? ''}
            placeholder="Selecciona una opción"
            onChange={(value: any) => console.log(value)}
            isClearable={true}
          /> */}
          <Label className="mb-4">Elenco del evento</Label>
          <Select
            className="mb-4"
            options={casts}
            isLoading={loadingCast}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Selecciona una opción"
            onChange={(value: any) => console.log(value)}
            isClearable={true}
            isMulti={true}
          />
          <Label className="mb-4">Lugar del evento</Label>
          <Select
            className="mb-4"
            options={spaces}
            isLoading={loadingSpaces}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Selecciona un espacio"
            onChange={(value: any) => console.log(value)}
            isClearable={true}
          />
          <Input
            label="Total de funciones del evento"
            placeholder="Número total de funciones"
            {...register(`days`)}
            type="number"
            variant="outline"
            className="mb-4"
            min={1}
            onChange={handleDays}
            error={errors.days?.message && 'Campo requerido'}
          />

          {Array.from({ length: days ?? 0 }, (_, index) => (
            <div key={index}>
              <Label className="my-4">Fecha y hora día {index + 1}</Label>
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2">
                  <Input
                    {...register(`date${index}.day`)}
                    variant="outline"
                    className="mb-5 md:mr-5"
                    type="date"
                    required
                    min={today}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <Input
                    {...register(`date${index}.time`)}
                    variant="outline"
                    className="mb-5 md:ml-5"
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
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

export default EventDetailForm

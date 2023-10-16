import pick from 'lodash/pick'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdateGenreMutation } from '@/data/genre'
import { sectionValidationSchema } from './section-validation-schema'
import { Genre } from '@/types/genre'

type FormValues = {
  name: string
  slug?: string
  thumbnail?: string
  image?: string
}

const SectionDetailForm = ({ genre }: Genre | any) => {
  const router = useRouter()
  const { mutate: updateGenre, isLoading: loading } = useUpdateGenreMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      ...(genre && pick(genre, ['name'])),
    },
    resolver: yupResolver(sectionValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (genre.id !== undefined) {
      updateGenre({
        id: genre.id,
        input: { ...values },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Sección"
          details="Esta sección podrá ser utilizada para categorizar los eventos sociales."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />
        </Card>
      </div>
      <div className="mb-4 text-end ">
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

export default SectionDetailForm

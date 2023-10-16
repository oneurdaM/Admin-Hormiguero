import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { sectionValidationSchema } from './section-validation-schema'
import { useCreateGenreMutation } from '@/data/genre'

type FormValues = {
  name: string
}

const defaultValues: FormValues = {
  name: '',
}

const SectionForm = () => {
  const router = useRouter()
  const { mutate: createGenre, isLoading: loading } = useCreateGenreMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(sectionValidationSchema),
  })

  async function onSubmit({ name }: FormValues) {
    createGenre(
      { name, type: 'Social' },
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

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nueva sección"
          details="Esta sección podrá ser utilizada para categorizar los eventos sociales."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre"
            placeholder='Texto'
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />
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

export default SectionForm

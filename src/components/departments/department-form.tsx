/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateDepartmentMutation } from '@/data/department'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { DepartmentValidationSchema } from './department-validation-schema'
import { slug } from '@/utils/slug'

type FormValues = {
  name: string
}

const defaultValues: FormValues = {
  name: '',
}

const DepartmentCreateForm = () => {
  const router = useRouter()
  const { mutate: registerProductCategory, isLoading: loading } =
    useCreateDepartmentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(DepartmentValidationSchema),
  })

  const today = new Date()

  async function onSubmit({ name }: FormValues) {
    const slugStr = slug(name)

    registerProductCategory(
      { name, number: 1, createdAt: today, slug: slugStr },
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
        onSuccess() {
          toast.success('Se creó un nuevo departamento')
          router.push('/products')
        },
      }
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Categoría de producto"
          details="Llena todos los campos para crear una nueva categoría producto"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre de la categoría de producto"
            placeholder="Nombre de la categoría"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
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

export default DepartmentCreateForm

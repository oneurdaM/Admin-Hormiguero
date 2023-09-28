/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'

import { useUpdateDepartmentMutation } from '@/data/department'
import { Department } from '@/types/department'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { DepartmentValidationSchema } from './department-validation-schema'

type FormValues = {
  name: string
}

export default function DepartmentDetailForm({ department }: Department | any) {
  const router = useRouter()
  const { mutate: updatedepartment, isLoading: loading } =
    useUpdateDepartmentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(department && pick(department, ['name', 'stock', 'id', 'createdAt'])),
    },
    resolver: yupResolver(DepartmentValidationSchema),
  })

  async function onSubmit({ name }: FormValues) {
    if (department.id !== undefined) {
      updatedepartment({
        id: department.id,
        input: { ...department, name },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Categoría"
          details="Ver y editar detalles de categoría de producto."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre de categoría de producto"
            placeholder="Nombre de categoría"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
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

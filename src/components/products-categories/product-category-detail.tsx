/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'

import { useUpdateProductCategoryMutation } from '@/data/product-category'
import { ProductCategory } from '@/types/products-categories'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { ProductCategoryValidationSchema } from './product-category-validation-schema'

type FormValues = {
  name: string
}

export default function ProductCategoryDetailForm({
  catalog,
}: ProductCategory | any) {
  const { mutate: updateCatalog, isLoading: loading } = useUpdateProductCategoryMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(catalog &&
        pick(catalog, [
          'name',
          'stock',
          'id',
          'createdAt'
        ])),
    },
    resolver: yupResolver(ProductCategoryValidationSchema),
  })

  async function onSubmit({name}: FormValues) {
    if (catalog.id !== undefined) {
      updateCatalog({
        id: catalog.id,
        input: {...catalog, name},
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
        <Button disabled={loading} loading={loading}>
          Actualizar
        </Button>
      </div>
    </form>
  )
}

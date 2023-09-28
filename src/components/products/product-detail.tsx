/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useUpdateProductMutation } from '@/data/product'
import { Product } from '@/types/products'
import { useDepartmentsQuery } from '@/data/department'
import { yupResolver } from '@hookform/resolvers/yup'

import { productValidationSchema } from './product-validation-schema'
import Card from '../common/card'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import Button from '../ui/button'
import Select from '../select/select'
import Label from '../ui/label'

type FormValues = {
  title: string
  description: string
  thumbnail: string
  stock: number
  price: number
  slug: string
}

export default function ProductUpdateForm({ product }: Product | any) {
  const router = useRouter()
  const [productCatalog, setProductCatalog] = useState<number | null>(null)

  const { departments, loading: loadingCategories } =
    useDepartmentsQuery({
      limit: 10,
      page: 1,
      search: '',
    })

  const { mutate: updateProduct, isLoading: loading } =
    useUpdateProductMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      ...(product &&
        pick(product, [
          'title',
          'description',
          'thumbnail',
          'stock',
          'price',
          'slug',
        ])),
    },
    resolver: yupResolver(productValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (product.id !== undefined) {
      updateProduct({
        id: product.id,
        input: { ...values, catalogId: productCatalog },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Thumbnail"
          details="Imagen del producto"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="thumbnail" control={control} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Producto"
          details="Llena todos los campos para crear un nuevo producto"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre del Producto"
            placeholder="Nombre del Producto"
            {...register('title')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.title?.message?.toString()}
          />

          <Input
            label="Descripción del Producto"
            placeholder="Descripción del Producto"
            {...register('description')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.description?.message?.toString()}
          />

          <Label className="mb-4">Selecciona la categoría del producto</Label>
          <Select
            className="mb-4"
            options={departments ?? []}
            isLoading={loadingCategories}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Categoría del producto"
            isClearable={true}
            onChange={(catalog: any) => setProductCatalog(catalog?.id ?? null)}
            defaultValue={{ id: product.catalogId }} //missing data from catalog, must be like catalog: {id, name, stock}
          />

          <Input
            label="Precio"
            placeholder="Precio"
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-4"
            min={20}
            max={999}
            error={errors.price?.message?.toString()}
          />

          <Input
            label="Inventario"
            placeholder="Inventario"
            {...register('stock')}
            type="number"
            variant="outline"
            className="mb-4"
            min={1}
            max={999}
            error={errors.stock?.message?.toString()}
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
            Actualizar
          </Button>
        </div>
      </div>
    </form>
  )
}

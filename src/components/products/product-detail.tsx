/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'

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
  catalog?: string
}

export default function ProductUpdateForm({ product }: Product | any) {
  const router = useRouter()
  const [productCatalog, setProductCatalog] = useState<number | null>(
    product.catalog.id
  )

  const { departments, loading: loadingDepartments } = useDepartmentsQuery({
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
          'catalog',
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
          <div className="container mx-auto p-4">
            <div className="lg:flex">
              {product.thumbnail && (
                <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
                  <Label>Imagen actual</Label>
                  <Image
                    src={product.thumbnail}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-auto w-full"
                  />
                </div>
              )}

              <div className={product.thumbnail ? 'lg:w-3/4' : 'lg:w-full'}>
                <div className="bg-gray-200 p-4">
                  <div className="w-full p-2">
                    <FileInput name="thumbnail" control={control} />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            label="Nombre del producto"
            placeholder="Nombre del producto"
            {...register('title')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.title?.message?.toString()}
          />

          <Input
            label="Descripción del producto"
            placeholder="Descripción del producto"
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
            isLoading={loadingDepartments}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Categoría del producto"
            isClearable={true}
            onChange={(catalog: any) => setProductCatalog(catalog?.id ?? null)}
            defaultValue={[
              { id: product.catalog.id, name: product.catalog.name },
            ]}
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

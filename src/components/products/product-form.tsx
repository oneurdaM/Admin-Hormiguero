/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useCreateProductMutation } from '@/data/product'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { productValidationSchema } from './product-validation-schema'
import Select from '../select/select'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { useDepartmentsQuery } from '@/data/department'
import { slug } from '@/utils/slug'

type FormValues = {
  title: string
  description: string
  thumbnail: string
  stock: number
  price: number

  capacity: number
  slug: string
}

const defaultValues: FormValues = {
  title: '',
  description: '',
  thumbnail: '',
  stock: 1,
  price: 20,

  capacity: 0,
  slug: '',
}

const ProductCreateForm = () => {
  const router = useRouter()
  const [productCatalog, setProductCatalog] = useState<number | null>(null)

  const { departments, loading: loadingCategories } = useDepartmentsQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const { mutate: registerProduct, isLoading: loading } =
    useCreateProductMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(productValidationSchema),
  })

  async function onSubmit({
    title,
    description,
    thumbnail,
    stock,
    price,
  }: FormValues) {
    const slugStr = slug(title)
    registerProduct(
      {
        title,
        description,
        thumbnail,
        stock,
        capacity: 100,
        price,
        slug: slugStr,
        catalogId: productCatalog,
      },
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
            Crear
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ProductCreateForm

// @ts-nocheck
import { useState } from 'react'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/data/product'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Uploader from '../common/uploaderAntd'
import Image from 'next/image'

import Card from '../common/card'
import ButtonMy from '../ui/button'
import Description from '../ui/description'
// import Input from '../ui/input'
import { productValidationSchema } from './product-validation-schema'
// import Select from '../select/select'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { useDepartmentsQuery } from '@/data/department'
import { slug } from '@/utils/slug'
import { toast } from 'react-toastify'
import {
  Upload,
  Button,
  message,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
} from 'antd'

type FormValues = {
  title: string
  description: string
  thumbnail: string
  stock?: number | null
  price?: number | null

  capacity?: number | null
  slug: string
}

const defaultValues: FormValues = {
  title: '',
  description: '',
  thumbnail: '',
  stock: null,
  price: null,

  capacity: null,
  slug: '',
}

const ProductCreateForm = ({ product }) => {
  const router = useRouter()
  const [productCatalog, setProductCatalog] = useState<number | null>(null)
  const [selectedFields, setSelectedFields] = useState({
    isCategorySelected: false,
  })

  const { departments, loading: loadingCategories } = useDepartmentsQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const { mutate: registerProduct, isLoading: loading } =
    useCreateProductMutation()

  const { mutate: updateProduct, isLoading: loadingProduct } =
    useUpdateProductMutation()

  // async function onSubmit({
  //   title,
  //   description,
  //   thumbnail,
  //   stock,
  //   price,
  // }: FormValues) {
  //   const slugStr = slug(title)
  //   if (thumbnail === '' || thumbnail === null) {
  //     toast.error('La imagen del producto es un campo obligatorio')
  //   }
  //   registerProduct(
  //     {
  //       title,
  //       description,
  //       thumbnail,
  //       stock,
  //       capacity: 100,
  //       price,
  //       slug: slugStr,
  //       catalogId: productCatalog,
  //     },
  //     {
  //       onError: (error: any) => {
  //         if (error.response?.data?.errors) {
  //           error.response.data.errors.forEach((error: any) => {
  //             setError(error.field, {
  //               type: 'manual',
  //               message: error.message,
  //             })
  //           })
  //         }
  //       },
  //     }
  //   )
  // }

  const onFinish = (values: FormValues) => {
    const slugStr = slug(values.title)

    if (product === undefined) {
      registerProduct(
        {
          title: values.title,
          description: values.description,
          thumbnailUrl: values.thumbnailUrl,
          stock: values.stock,
          capacity: 100,
          price: values.price,
          slug: slugStr,
          catalogId: values.catalogId,
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
    } else {
      const productUpdate = {
        title: values.title,
        description: values.description,
        thumbnailUrl: values.thumbnailUrl,
        stock: values.stock,
        capacity: 100,
        price: values.price,
        slug: slugStr,
        catalogId: values.catalogId,
      }
      updateProduct({
        id: product.id as string,
        input: productUpdate,
      })
    }
  }

  const [form] = Form.useForm()

  return (
    <Form
      onFinish={onFinish}
      form={form}
      initialValues={product}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details="Imagen del producto"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* <FileInput name="thumbnail" control={control} /> */}
          <Form.Item
            name="thumbnailUrl"
            label="Imagen del evento"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: 'Ingresa una imagen',
              },
            ]}
          >
            <Uploader form={form} />
          </Form.Item>

          {product !== undefined ? (
            <Image
              src={product.thumbnailUrl}
              alt="thumbnail"
              width={100}
              height={100}
            />
          ) : null}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Producto"
          details="Llena todos los campos para crear un nuevo producto"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          {/* <Input
            label="Nombre del Producto"
            placeholder="Nombre del Producto"
            {...register('title')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.title?.message?.toString()}
          /> */}
          <Form.Item
            label="Nombre del Producto"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el nombre del Producto',
              },
            ]}
          >
            <Input.TextArea placeholder="Nombre del producto" autoSize />
          </Form.Item>
          {/* <Input
            label="Descripción del Producto"
            placeholder="Descripción del Producto"
            {...register('description')}
            type="text"
            variant="outline"
            className="my-4"
            error={errors.description?.message?.toString()}
          /> */}

          <Form.Item
            label="Descripción del Producto"
            name="description"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la descripción del producto',
              },
            ]}
          >
            <Input.TextArea placeholder="Nombre del producto" autoSize />
          </Form.Item>

          {/* <Label className="my-4">Selecciona la categoría del producto</Label> */}
          {/* <Select
            className="mt-4"
            options={departments ?? []}
            isLoading={loadingCategories}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Categoría del producto"
            isClearable={true}
            onChange={(catalog: any) => {
              setProductCatalog(catalog?.id ?? null)
              setSelectedFields({ ...selectedFields, isCategorySelected: true })
            }}
          />
          {selectedFields.isCategorySelected === false && (
            <small className="text-xs text-red-500">Campo obligatorio</small>
          )} */}

          <Form.Item
            label="Categoria del producto"
            name="catalogId"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona al menos una opción',
              },
            ]}
          >
            <Select placeholder="Selecciona opciones">
              {departments?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Input
            label="Precio"
            placeholder="Precio"
            {...register('price')}
            type="number"
            variant="outline"
            className="my-4"
            min={20}
            max={999}
            error={errors.price?.message?.toString()}
              /> */}

          <Form.Item
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el precio del producto',
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Precio del producto"
              min={1}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          {/*} <Input
            label="Inventario"
            placeholder="Inventario"
            {...register('stock')}
            type="number"
            variant="outline"
            className="my-4"
            min={1}
            max={999}
            error={errors.stock?.message?.toString()}
          /> */}

          <Form.Item
            label="Inventario"
            name="stock"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el inventario del producto',
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Precio del producto"
              min={1}
            />
          </Form.Item>
        </Card>
        <div className="w-full text-end">
          <ButtonMy
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </ButtonMy>
          <button
            className=" h-12 rounded-md border border-transparent bg-accent px-5 py-0 font-semibold text-light transition duration-300 ease-in-out hover:bg-accent-hover"
            htmlType="submit"
          >
            {product === undefined ? 'Crear' : 'Editar'}
          </button>
        </div>
      </div>
    </Form>
  )
}

export default ProductCreateForm

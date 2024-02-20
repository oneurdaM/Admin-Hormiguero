import { useCreateFiscalMutation, useUpdateFiscalMutation } from '@/data/fiscal'
import { Note } from '@/types/blog'
import { getErrorMessage } from '@/utils/form-error'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import Uploader from '../common/uploaderAntd'

import Select from '../select/select'
import Label from '../ui/label'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
// import Input from '../ui/input'
import TextArea from '../ui/text-area'
import { slugglify } from '@/utils/slugglify'
import { useCategoriesQuery } from '@/data/category'
import { Form, Input } from 'antd'

type FormValues = {
  id: number
  contribuyente: string
  rfc: string
  thumbnailUrl: string
  thumbnailUrl2: string
  razonSocial: string
  domicilio: string
}

// type IProps = {
//   initialValues?: Note | null
// }

export default function CreateFiscalForm({ initialValues }: any) {
  const router = useRouter()

  // if (initialValues) {
  //   initialValues.thumbnailUrl = initialValues.firmaElectronica
  //   initialValues.thumbnailUrl2 = initialValues.selloDigital
  // }
  console.log(initialValues)
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
  })

  const { categories, loading: loadingCategories } = useCategoriesQuery({
    limit: 10,
    page: 1,
    search: '',
  })

  const { mutate: createFiscal, isLoading: creating } =
    useCreateFiscalMutation()

  const { mutate: updateFiscal, isLoading: editing } = useUpdateFiscalMutation()
  // const onSubmit = async (values: FormValues) => {
  //   const { title, content, image } = values
  //   const input = {
  //     title,
  //     content,
  //     slug: slugglify(title),
  //     image: image ?? initialValues?.image ?? '',
  //     categoryId: selectedCategory ?? initialValues?.category_id,
  //     is_approved: true,
  //   }

  //   try {
  //     if (!initialValues) {
  //       createNote(input)
  //     } else {
  //       updateNote({
  //         id: initialValues?.id,
  //         ...input,
  //       })
  //     }
  //   } catch (error) {
  //     const serverErrors = getErrorMessage(error)
  //     Object.keys(serverErrors?.validation).forEach((field: any) => {
  //       setError(field.split('.')[1], {
  //         type: 'manual',
  //         message: serverErrors?.validation[field][0],
  //       })
  //     })
  //   }
  // }

  const onFinish = (values: FormValues) => {
    const body = {
      contribuyente: values.contribuyente,
      razonSocial: values.razonSocial,
      rfc: values.rfc,
      domicilio: values.domicilio,
      firmaElectronica: values.thumbnailUrl,
      selloDigital: values.thumbnailUrl2,
    }

    if (initialValues) {
      updateFiscal({ id: initialValues.id, ...body })
    } else {
      createFiscal(body)
    }
  }

  const imageInformation = (
    <span>
      Carga la imagen o video del banner desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      initialValues={initialValues}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <div className="flex sm:my-8">
        <Card className="sm:w-8/12 md:w-2/3 lg:w-1/2">
          <Form.Item
            label="Nombre del contribuyente"
            name="contribuyente"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el nombre',
              },
            ]}
          >
            <Input.TextArea placeholder="Nombre del nombre" autoSize />
          </Form.Item>

          <Form.Item
            label="Razon social del contribuyente"
            name="razonSocial"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la rason social',
              },
            ]}
          >
            <Input.TextArea placeholder="Razon social" autoSize />
          </Form.Item>

          <Form.Item
            label="RFC"
            name="rfc"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el rfc',
              },
            ]}
          >
            <Input.TextArea placeholder="RFC" />
          </Form.Item>

          <Form.Item
            label="Domicilio de contribuyente"
            name="domicilio"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la dirección del contribuyente',
              },
            ]}
          >
            <Input.TextArea placeholder="Domicilio del contribuyente" />
          </Form.Item>
        </Card>

        <Card className="mx-2 sm:w-8/12 md:w-2/3 lg:w-1/2">
          <div className="container mx-auto p-4">
            <Form.Item
              name="thumbnailUrl"
              label="Firma electrónica"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[
                {
                  required: true,
                  message: 'Ingresa una imagen',
                },
              ]}
            >
              <Uploader form={form} field="thumbnailUrl" />
            </Form.Item>
            {initialValues ? (
              <Image
                src={initialValues.thumbnailUrl}
                alt={'imagen'}
                width={100}
                height={100}
              />
            ) : null}
            <Form.Item
              name="thumbnailUrl2"
              label="Sello figital"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[
                {
                  required: true,
                  message: 'Ingresa una imagen',
                },
              ]}
            >
              <Uploader form={form} field="thumbnailUrl2" />
            </Form.Item>
            {initialValues ? (
              <Image
                src={initialValues.thumbnailUrl2}
                alt={'imagen'}
                width={100}
                height={100}
              />
            ) : null}

            {/* {initialValues ?? (
              <Image
                src={initialValues.thumbnailUrl2}
                alt={'imagen'}
                width={100}
                height={100}
              />
            )} */}
          </div>
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

        <button
          className=" h-12 rounded-md border border-transparent bg-accent px-5 py-0 font-semibold text-light transition duration-300 ease-in-out hover:bg-accent-hover"
          htmlType="submit"
        >
          {initialValues ? 'Actualizar ' : 'Crear'}
        </button>
      </div>
    </Form>
  )
}

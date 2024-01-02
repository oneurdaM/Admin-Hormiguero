import { useCreateBannerMutation, useUpdateBannerMutation } from '@/data/banner'
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
import { noteValidationSchema } from './note-validation-schema'
import { slugglify } from '@/utils/slugglify'
import { useCategoriesQuery } from '@/data/category'
import { Form, Input } from 'antd'

type FormValues = {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  url: string
}

// type IProps = {
//   initialValues?: Note | null
// }

export default function CreateOrUpdateNoteForm({ initialValues }) {
  console.log(initialValues)
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(null)

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
  const { mutate: updateBanner, isLoading: updating } =
    useUpdateBannerMutation()
  const { mutate: createBanner, isLoading: creating } =
    useCreateBannerMutation()

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
    const input = {
      title: values.title,
      description: values.description,
      url: values.url,
      thumbnailUrl: values.thumbnailUrl,
    }

    try {
      createBanner(input)
    } catch (error) {
      const serverErrors = getErrorMessage(error)
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        })
      })
    }
  }

  const imageInformation = (
    <span>
      Carga la imagen del banner desde aquí <br />
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
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="container mx-auto p-4">
            <Form.Item
              name="thumbnailUrl"
              label="Imagen del banner"
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
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Banner"
          details="Detalla la información del banner"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            label="Titulo del banner"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese el nombre del banner',
              },
            ]}
          >
            <Input.TextArea placeholder="Nombre del banner" autoSize />
          </Form.Item>

          <Form.Item
            label="Url del banner"
            name="url"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la url del banner',
              },
            ]}
          >
            <Input.TextArea placeholder="Url del banner" autoSize />
          </Form.Item>

          <Form.Item
            label="Descripción del Banner"
            name="description"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese la descripción del banner',
              },
            ]}
          >
            <Input.TextArea placeholder="Descripción del banner" />
          </Form.Item>
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
          Crear
        </button>
      </div>
    </Form>
  )
}

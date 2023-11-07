import { useCreateNoteMutation, useUpdateNoteMutation } from '@/data/blog'
import { Note } from '@/types/blog'
import { getErrorMessage } from '@/utils/form-error'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'

import Select from '../select/select'
import Label from '../ui/label'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import TextArea from '../ui/text-area'
import { noteValidationSchema } from './note-validation-schema'
import { slugglify } from '@/utils/slugglify'
import { useCategoriesQuery } from '@/data/category'

type FormValues = {
  id: number
  title: string
  content: string
  createdBy: number
  is_approved: boolean
  slug?: string
  image?: string
  category_id?: number
}

type IProps = {
  initialValues?: Note | null
}

export default function CreateOrUpdateNoteForm({ initialValues }: IProps) {
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
    resolver: yupResolver(noteValidationSchema),
    ...(Boolean(initialValues) && {
      defaultValues: {
        ...initialValues,
      },
    }),
  })

  const { categories, loading: loadingCategories } = useCategoriesQuery({
    limit: 10,
    page: 1,
    search: '',
  })
  const { mutate: updateNote, isLoading: updating } = useUpdateNoteMutation()
  const { mutate: createNote, isLoading: creating } = useCreateNoteMutation()

  const onSubmit = async (values: FormValues) => {
    const { title, content, image } = values
    const input = {
      title,
      content,
      slug: slugglify(title),
      image: image ?? initialValues?.image ?? '',
      categoryId: selectedCategory ?? initialValues?.category_id,
      is_approved: true,
    }

    try {
      if (!initialValues) {
        createNote(input)
      } else {
        updateNote({
          id: initialValues?.id,
          ...input,
        })
      }
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
      Carga la imagen de la nota desde aquí <br />
      La dimensión de la imagen se recomienda sea de&nbsp;
      <span className="font-bold">1024x1024 px</span>
    </span>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={imageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="container mx-auto p-4">
            <div className="lg:flex">
              {initialValues?.image && (
                <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
                  <Label>Imagen actual</Label>
                  <Image
                    src={initialValues.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-auto w-full"
                  />
                </div>
              )}

              <div className={initialValues?.image ? 'lg:w-3/4' : 'lg:w-full'}>
                <div className="bg-gray-200 p-4">
                  <div className="w-full p-2">
                    <FileInput name="image" control={control} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nota"
          details="Detalla la información de la nota"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            {...register('title')}
            label="Titulo"
            placeholder="Titulo de nota"
            variant="outline"
            className="mb-5"
            error={errors?.title?.message}
          />

          <TextArea
            label="Contenido"
            placeholder="Contenido de nota"
            {...register('content')}
            variant="outline"
            className="mb-5"
            error={errors?.content?.message}
          />

          <Label className="mb-4">Categoría</Label>
          <Select
            name="cateogry"
            isLoading={loadingCategories}
            options={categories ?? []}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Categoría de nota"
            onChange={(value: any) => setSelectedCategory(value?.id ?? null)}
            isClearable={true}
            defaultValue={{
              name: initialValues?.category?.name,
              id: initialValues?.category?.id,
            }}
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

        <Button loading={updating || creating} disabled={updating || creating}>
          {initialValues ? 'Actualizar Nota' : 'Crear Nota'}
        </Button>
      </div>
    </form>
  )
}

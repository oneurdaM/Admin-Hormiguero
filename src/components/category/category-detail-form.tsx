import pick from 'lodash/pick'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdateCategoryMutation } from '@/data/category'
import FileInput from '../ui/file-input'
import { categoryValidationSchema } from './category-validation-schema'
import { Category } from '@/types/category'
import Label from '../ui/label'
import { slug } from '@/utils/slug'

type FormValues = {
  name: string
  slug?: string
  thumbnail?: string
  image?: string
}

const CategoryDetailForm = ({ category }: Category | any) => {
  const router = useRouter()
  const { mutate: updateCategory, isLoading: loading } =
    useUpdateCategoryMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      ...(category && pick(category, ['name', 'slug', 'thumbnail', 'image'])),
    },
    resolver: yupResolver(categoryValidationSchema),
  })

  async function onSubmit(values: FormValues) {
    if (category.id !== undefined) {
      const slugStr = slug(values.name)
      updateCategory({
        id: category.id,
        input: { ...values, slug: slugStr, image: values.image ?? category.image, },
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Imagen"
          details={'Sube una imagen para la categoría.'}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="container mx-auto p-4">
            <div className="lg:flex">
              {category.image && (
                <div className="mb-4 p-6 text-center lg:mb-0 lg:w-1/4">
                  <Label>Imagen actual</Label>
                  <Image
                    src={category.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-auto w-full"
                  />
                </div>
              )}

              <div className={category.image ? 'lg:w-3/4' : 'lg:w-full'}>
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
          title="Categoría"
          details="Esta categoría podrá ser utilizada para clasificar los articulos de tu blog."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre"
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.name?.message?.toString()}
          />
          {/* <TextArea
            label="Contenido"
            className="mb-4"
            variant="outline"
            {...register('content')}
            error={errors.content?.message?.toString()}
          />
          <div className="flex items-center gap-x-4">
            <SwitchInput name="is_approved" control={control} />
            <Label className="mb-0">Publicar</Label>
          </div> */}
        </Card>
      </div>
      <div className="mb-4 text-end ">
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

export default CategoryDetailForm

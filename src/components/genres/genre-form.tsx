import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Card from '../common/card'
import ButtonMy from '../ui/button'
import Description from '../ui/description'
// import Input from '../ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { genreValidationSchema } from './genre-validation-schema'
import { useCreateGenreMutation } from '@/data/genre'
import { Form, Input, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

type FormValues = {
  name: string
}

const defaultValues: FormValues = {
  name: '',
}

const GenreForm = () => {
  const router = useRouter()
  const { mutate: createGenre, isLoading: loading } = useCreateGenreMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(genreValidationSchema),
  })

  async function onSubmit({ name }: FormValues) {
    createGenre(
      { name },
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

  const onFinish = ({ name }: FormValues) => {
    createGenre(
      { name },
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
    <Form onFinish={onFinish}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Nuevo Género"
          details="Este género podrá ser utilizado para categorizar los eventos."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Form.Item
            className="flex flex-col"
            label={<span className="text-base font-normal">Genero</span>}
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor, ingrese un genero',
              },
            ]}
            labelCol={{ span: 24 }} // Configura el ancho completo para el label
            wrapperCol={{ span: 24 }} // Configura el ancho completo para el wrapper
          >
            <Input placeholder="Ingrese el genero" className="rounded-md" />
          </Form.Item>
        </Card>
      </div>
      <Form.Item>
        <div className="mb-4 text-end">
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
            Crear
          </button>
        </div>
      </Form.Item>
    </Form>
  )

  //   <form noValidate onSubmit={handleSubmit(onSubmit)}>
  //     <div className="my-5 flex flex-wrap sm:my-8">
  //       <Description
  //         title="Nuevo Género"
  //         details="Este género podrá ser utilizado para categorizar los eventos."
  //         className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
  //       />

  //       <Card className="w-full sm:w-8/12 md:w-2/3">
  //         <Input
  //           label="Nombre"
  //           {...register('name')}
  //           type="text"
  //           variant="outline"
  //           className="mb-4"
  //           error={errors.name?.message?.toString()}
  //         />
  //       </Card>
  //     </div>
  //     <div className="mb-4 text-end">
  //       <Button
  //         variant="outline"
  //         onClick={router.back}
  //         className="me-4"
  //         type="button"
  //       >
  //         Atrás
  //       </Button>
  //       <Button disabled={loading} loading={loading}>
  //         Crear
  //       </Button>
  //     </div>
  //   </form>
  // )
}

export default GenreForm

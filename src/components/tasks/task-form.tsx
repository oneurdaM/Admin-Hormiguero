/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { alertValidationSchema } from './task-validation-schema'
import { useEnviromentQuery } from '@/data/enviroment'
import Loader from '../ui/loader/loader'

type FormValues = {
  taskName: string
  taskDescription: string
  userCreates: string
}

const defaultValues: FormValues = {
  taskName: '',
  taskDescription: '',
  userCreates: ''
}


const TaskCreateForm = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  })

  const { mutate: registerUser, isLoading: loading } = useRegisterMutation()
  const { enviroments, loading: loadEnviroment } = useEnviromentQuery({
    limit: 15,
    page: 1,
    search: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(alertValidationSchema),
  })

  async function onSubmit({
    taskName,
    taskDescription,
  }: FormValues) {
    //replace with register alert
    // registerUser(
    //   {
    //     taskName,
    //     module,
    //     task,
    //     repeat,
    //     userCreates,
    //     userReceives,
    //     dateRange,
    //     // firstName,
    //     // lastName,
    //     // email,
    //     // password,
    //     // middleName: middleName || null,
    //     // username,
    //   },
    //   {
    //     onError: (error: any) => {
    //       if (error.response?.data?.errors) {
    //         error.response.data.errors.forEach((error: any) => {
    //           setError(error.field, {
    //             type: 'manual',
    //             message: error.message,
    //           })
    //         })
    //       }
    //     },
    //   }
    // )
  }

  if (loadEnviroment) {
    return <Loader />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Tarea"
          details="Llena todos los campos para crear una nueva tarea"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre Tarea"
            placeholder="Nombre de la tarea"
            {...register('taskName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.taskName?.message?.toString()}
          />

          <Input
            label="Descripción"
            placeholder='Breve descripción de la tarea'
            className="mb-4"
            type="text"
            variant="outline"
            {...register('taskDescription')}
            error={errors.taskDescription?.message?.toString()}
          />

          <Input
            disabled
            label="Usuario Crea"
            className="mb-4"
            variant="outline"
            {...register('userCreates')}
            error={errors.userCreates?.message?.toString()}
          />

        </Card>
      </div>
      <div className="mb-4 text-end sm:mb-8">
        <Button disabled={loading} loading={loading}>
          Crear
        </Button>
      </div>
    </form>
  )
}

export default TaskCreateForm

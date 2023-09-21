/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { alertValidationSchema } from './module-validation-schema'
import { useEnviromentQuery } from '@/data/enviroment'
import Loader from '../ui/loader/loader'

type FormValues = {
  moduleName: string
  moduleDescription: string
  userCreates: string
}

const defaultValues: FormValues = {
  moduleName: '',
  moduleDescription: '',
  userCreates: ''
}


const ModuleCreateForm = () => {
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
    moduleName,
    moduleDescription,
  }: FormValues) {
    //add new module
  }

  if (loadEnviroment) {
    return <Loader />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Modulo"
          details="Llena todos los campos para crear un nuevo modulo"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre de Modulo"
            placeholder="Nombre de Modulo"
            {...register('moduleName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.moduleName?.message?.toString()}
          />

          <Input
            label="Descripción"
            placeholder='Breve descripción del modulo'
            className="mb-4"
            type="text"
            variant="outline"
            {...register('moduleDescription')}
            error={errors.moduleDescription?.message?.toString()}
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

export default ModuleCreateForm

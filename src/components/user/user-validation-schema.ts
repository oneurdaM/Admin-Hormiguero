import * as yup from 'yup'

export const userValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email invalido')
    .required('Este campo es obligatorio'),
  password: yup.string().required('Este campo es obligatorio'),
  firstName: yup.string().required('Este campo es obligatorio'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Este campo es obligatorio'),
})

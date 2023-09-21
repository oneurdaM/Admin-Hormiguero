import * as yup from 'yup'

export const updateUserValidationSchema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Email es requerido'),
  firstName: yup.string().required('Nombre es requerido'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Apellido es requerido'),
  birthDate: yup.string().required('Fecha de nacimiento es requerida')
})

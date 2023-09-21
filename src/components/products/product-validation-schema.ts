import * as yup from 'yup'

export const productValidationSchema = yup.object().shape({
  title: yup.string().required('Campo requerido'),
  description: yup.string().required('Campo requerido'),
  price: yup.number().required('Campo requerido'),
  stock: yup.number().required('Campo requerido'),
})

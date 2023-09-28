import * as yup from 'yup'

export const SpaceValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
  dimensions: yup.number().required('Campo requerido'),
  capacity: yup.number().required('Campo requerido'),
  price: yup.number().required('Campo requerido'),
  location: yup.string().required('Campo requerido'),
})

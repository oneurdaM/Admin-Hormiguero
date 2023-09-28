import * as yup from 'yup'

export const alertValidationSchema = yup.object().shape({
  alert: yup.string().required('Campo requerido'),
  description: yup.string().required('Campo requerido'),
  hour: yup.string().required('Campo requerido'),
  creator: yup.string().nullable(),
})

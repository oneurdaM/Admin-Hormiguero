import * as yup from 'yup'

export const alertValidationSchema = yup.object().shape({
  taskName: yup.string().required('Campo requerido'),
  taskDescription: yup.string().required('Campo requerido'),
})

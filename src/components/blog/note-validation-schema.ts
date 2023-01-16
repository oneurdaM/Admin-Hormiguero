import * as yup from 'yup'

export const noteValidationSchema = yup.object().shape({
  title: yup.string().required('El título es requerido'),
  content: yup.string().required('El contenido es requerido'),
  slug: yup.string().required('El slug es requerido'),
})

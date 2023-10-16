import * as yup from 'yup'

export const socialEventValidationSchema = yup.object().shape({
  title: yup.string().required('Campo requerido'),
  synopsis: yup.string().required('Campo requerido'),
  company: yup.string().required('Campo requerido'),
  dramaturgy: yup.string().required('Campo requerido'),
  director: yup.string().required('Campo requerido'),
  video: yup.string().nullable(),
  days: yup.number().required('Campo requerido'),
})

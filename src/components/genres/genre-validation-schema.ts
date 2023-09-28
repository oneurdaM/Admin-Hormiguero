import * as yup from 'yup'

export const genreValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
})

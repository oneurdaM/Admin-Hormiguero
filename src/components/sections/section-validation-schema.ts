import * as yup from 'yup'

export const sectionValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
})

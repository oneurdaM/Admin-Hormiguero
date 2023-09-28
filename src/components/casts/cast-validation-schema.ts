import * as yup from 'yup'

export const castValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
})

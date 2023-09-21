import * as yup from 'yup'

export const ProductCategoryValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
})

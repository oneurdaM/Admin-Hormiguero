import * as yup from 'yup'

export const orderValidationSchema = yup.object().shape({
  id: yup.string().nullable(),
  category: yup.string().nullable(),
  name: yup.string().nullable(),
  email: yup.string().nullable(),
  phone: yup.string().nullable(),
  address: yup.string().nullable(),
  total: yup.string().nullable(),
})

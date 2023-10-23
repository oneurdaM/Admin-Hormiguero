import * as yup from 'yup'

export const updateUserValidationSchema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Campo obligatorio'),
  firstName: yup.string().required('Campo obligatorio'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Campo obligatorio'),
  birthDate: yup.string().required('Campo obligatorio'),
})

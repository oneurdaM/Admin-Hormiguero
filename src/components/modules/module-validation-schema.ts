import * as yup from 'yup'

export const alertValidationSchema = yup.object().shape({
  moduleName: yup.string().required('Campo requerido'),
  moduleDescription: yup.string().required('Campo requerido'),
})

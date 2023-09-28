import * as yup from 'yup'

export const DepartmentValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
})

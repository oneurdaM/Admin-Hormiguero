import * as yup from 'yup'

export const ticketValidationSchema = yup.object().shape({
  name: yup.string().required('Campo requerido'),
  price: yup.string().required('Campo requerido'),
  image: yup.string().required('Campo requerido'),
  dateAndHour: yup.string().required('Campo requerido'),
  id: yup.string().required('Campo requerido'),
  seat: yup.string().required('Campo requerido'),
  location: yup.string().required('Campo requerido'),
})

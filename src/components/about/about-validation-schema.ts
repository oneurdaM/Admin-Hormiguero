import * as yup from 'yup'

export const aboutValidationSchema = yup.object().shape({
  siteName: yup.string().required('Campo requerido'),
  whoWeAre: yup.string().required('Campo requerido'),
  whatWeAre: yup.string().required('Campo requerido'),
  whyCommunity: yup.string().required('Campo requerido'),
  createdAt: yup.date().required('Campo requerido'),
  artists: yup.number().required('Campo requerido'),
  people: yup.number().required('Campo requerido'),
  communities: yup.number().required('Campo requerido'),
})

import * as yup from 'yup'

export const aboutValidationSchema = yup.object().shape({
  siteName: yup.string().required('Campo requerido'),
  whoWeAre: yup.string().required('Campo requerido'),
  whatWeAre: yup.string().required('Campo requerido'),
  whyCommunity: yup.string().required('Campo requerido'),
  createdAt: yup.string().required('Campo requerido'),
  artists: yup.string().required('Campo requerido'),
  people: yup.string().required('Campo requerido'),
  communities: yup.string().required('Campo requerido'),
  facebookUrl: yup.string().required('Campo requerido'),
  twitterUrl: yup.string().required('Campo requerido'),
  instagramUrl: yup.string().required('Campo requerido'),
  youtubeUrl: yup.string().required('Campo requerido'),
  location: yup.string().required('Campo requerido'),
  mision: yup.string().required('Campo obligatorio'),
  vision: yup.string().required('Campo obligatorio'),
  website: yup.string().required('Campo obligatorio'),
  contactNumber: yup.number().required('Campo obligatorio'),
})

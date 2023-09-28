import * as yup from 'yup'

export const ReservationValidationSchema = yup.object().shape({
  reason: yup.string().required('Campo requerido'),
  name: yup.string().required('Campo requerido'),
  email: yup.string().required('Campo requerido'),
  phone: yup.string().required('Campo requerido'),
  address: yup.string().required('Campo requerido'),

  date: yup.date().nullable(),
  payment: yup.boolean().nullable(),
  space: yup.string().nullable(),
  createdAt: yup.string().nullable(),
  effectiveFrom: yup.string().nullable(),
  expiresAt: yup.string().nullable(),
  location: yup.string().nullable(),
  cost: yup.number().nullable(),
  total: yup.number().nullable(),
})

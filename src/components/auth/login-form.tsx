import { useTranslation } from 'next-i18next'
import * as yup from 'yup'

import Input from '@/components/ui/input'
import Form from '@/components/ui/forms/form'
import { Routes } from '@/config/routes'
import { useLogin } from '@/data/user'
import { useState } from 'react'
import Alert from '@/components/ui/alert'
import Router from 'next/router'
import { allowedRoles, hasAccess, setAuthCredentials } from '@/utils/auth-utils'
import PasswordInput from '../ui/password-input'
import Button from '../ui/button'
import { LoginInput } from '@/types'

const loginFormSchema = yup.object().shape({
  identifier: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
})

const LoginForm = () => {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutate: login, isLoading, error } = useLogin()

  function onSubmit({ identifier, password }: LoginInput) {
    login(
      {
        identifier,
        password,
      },
      {
        onSuccess: (data: any) => {
          if (data?.jwt) {
            const role = data?.role
            if (hasAccess(allowedRoles, role)) {
              setAuthCredentials(data.jwt, data.role)
              Router.push('/') //redirect to '/'
              return
            }
            setErrorMessage('form:error-enough-permission')
          } else {
            setErrorMessage('form:error-credential-wrong')
          }
        },
        onError: () => {
          const messages = error as any
          if (messages?.response?.data?.message) {
            setErrorMessage(
              messages?.response?.data?.message !== 'Unauthorized'
                ? messages?.response?.data?.message
                : 'Usuario no registrado.'
            )
          } else {
            setErrorMessage('form:error-credential-wrong')
          }
        },
      }
    )
  }

  return (
    <>
      <Form<LoginInput> validationSchema={loginFormSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={t('form:input-label-email') ?? ''}
              {...register('identifier')}
              type="email"
              variant="outline"
              className="mb-4"
              error={t(errors?.identifier?.message!) ?? ''}
            />
            <PasswordInput
              label={t('form:input-label-password')}
              forgotPassHelpText={t('form:input-forgot-password-label') ?? ''}
              {...register('password')}
              error={t(errors?.password?.message!) ?? ''}
              variant="outline"
              className="mb-4"
              forgotPageLink={Routes.forgotPassword}
            />
            <Button
              className="w-full bg-dark"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('form:button-label-login')}
            </Button>
          </>
        )}
      </Form>
      {errorMessage ? (
        <Alert
          message={t(errorMessage)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
    </>
  )
}

export default LoginForm

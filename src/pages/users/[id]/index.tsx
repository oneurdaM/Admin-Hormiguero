import ProfileUpdateForm from '@/components/auth/profile-update-form'
import Layout from '@/components/layout/admin'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useUserQuery } from '@/data/user'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export default function UserPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { user, loading, error } = useUserQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <ProfileUpdateForm
      user={{
        ...user,
        birthDate: user?.birthDate
          ? user?.birthDate.toString().split('T')[0]
          : '',
      }}
    />
  )
}

UserPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})

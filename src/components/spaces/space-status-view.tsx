import { useBlockUserMutation, useUnblockUserMutation } from '@/data/users'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const SpaceStatusView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } = useUnblockUserMutation()
  const { mutate: blockUser, isLoading: activeLoading } = useBlockUserMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    if (data?.banned) {
      unblockUser({
        id: data.id,
        banned: !data.banned,
      })
    } else {
      blockUser({
        id: data.id,
        banned: !data.banned,
      })
    }
    // await deleteUser(data.id);
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.banned ? 'Activar' : 'Desactivar'}
      title={data?.banned ? 'Activar espacio' : 'Desactivar espacio'}
      deleteBtnLoading={loading || activeLoading}
      description={
        data?.banned
          ? '¿Estás seguro de que quieres activar el espacio?'
          : '¿Estás seguro de que quieres desactivar el espacio?'
      }
    />
  )
}

export default SpaceStatusView

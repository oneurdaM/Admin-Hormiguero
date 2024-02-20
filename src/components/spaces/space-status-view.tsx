import { useBlockSpaceMutation, useUnblockSpaceMutation } from '@/data/space'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const SpaceStatusView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } = useBlockSpaceMutation()
  const { mutate: blockUser, isLoading: activeLoading } =
    useUnblockSpaceMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    if (!data?.active) {
      unblockUser({
        id: data.id,
        active: false,
      })
    } else {
      blockUser({
        id: data.id,
        active: true,
      })
    }
    // await deleteUser(data.id);
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.active ? 'Activar' : 'Desactivar'}
      title={data?.active ? 'Activar espacio' : 'Desactivar espacio'}
      deleteBtnLoading={loading || activeLoading}
      description={
        data?.active
          ? '¿Estás seguro de que quieres activar el espacio?'
          : '¿Estás seguro de que quieres desactivar el espacio?'
      }
    />
  )
}

export default SpaceStatusView

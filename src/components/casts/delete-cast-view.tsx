import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'
import { useDeleteCastMutation } from '@/data/casts'

const DeleteCastView = () => {
  const { data } = useModalState()
  const { mutate: deleteCast, isLoading: loading } = useDeleteCastMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteCast(data)
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar miembro del elenco"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este miembro del elenco?"
    />
  )
}

export default DeleteCastView

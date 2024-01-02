import { useDeleteBannerMutation } from '@/data/banner'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteNoteView = () => {
  const { data } = useModalState()
  const { mutate: deleteNote, isLoading: loading } = useDeleteBannerMutation()

  const { closeModal } = useModalAction()
  async function handleDelete() {
    deleteNote(data)
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar banner"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este banner?"
    />
  )
}

export default DeleteNoteView

import { useDeleteNoteMutation } from '@/data/blog'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteNoteView = () => {
  const { data } = useModalState()
  const { mutate: deleteNote, isLoading: loading } = useDeleteNoteMutation()

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
      title="Eliminar nota"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar esta nota?"
    />
  )
}

export default DeleteNoteView

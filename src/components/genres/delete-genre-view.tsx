import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'
import { useDeleteGenreMutation } from '@/data/genre'

const DeleteGenreView = () => {
  const { data } = useModalState()
  const { mutate: deleteGenre, isLoading: loading } = useDeleteGenreMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteGenre(data)
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar género"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este género?"
    />
  )
}

export default DeleteGenreView

import ConfirmationCard from '../common/confirmation-card'
import { useDeleteSpaceMutation } from '@/data/space'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteSpaceCatalogView = () => {
  const { data } = useModalState()
  const { mutate: deleteCatalog, isLoading: loading } = useDeleteSpaceMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteCatalog(data)
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar espacio"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este espacio?"
    />
  )
}

export default DeleteSpaceCatalogView

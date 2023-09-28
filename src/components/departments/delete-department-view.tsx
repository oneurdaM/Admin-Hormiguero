import { useDeleteDepartmentMutation } from '@/data/department'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteDepartmentView = () => {
  const { data } = useModalState()
  const { mutate: deleteCatalog, isLoading: loading } =
    useDeleteDepartmentMutation()

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
      title="Eliminar categoría"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar esta categoría?"
    />
  )
}

export default DeleteDepartmentView

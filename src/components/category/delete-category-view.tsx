import { useDeleteCategoryMutation } from '@/data/category'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteCategoryView = () => {
  const { data } = useModalState()
  const { mutate: deleteNotice, isLoading: loading } =
    useDeleteCategoryMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteNotice(data)
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

export default DeleteCategoryView

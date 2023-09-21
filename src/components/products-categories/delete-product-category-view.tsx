import { useDeleteProductMutation } from '@/data/product'
import { useDeleteProductCategoryMutation } from '@/data/product-category'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteProductCategoryView = () => {
  const { data } = useModalState()
  const { mutate: deleteCatalog, isLoading: loading } =
    useDeleteProductCategoryMutation()

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

export default DeleteProductCategoryView

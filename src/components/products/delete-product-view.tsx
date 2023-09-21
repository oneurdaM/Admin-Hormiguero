import { useDeleteProductMutation } from '@/data/product'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteProductView = () => {
  const { data } = useModalState()
  const { mutate: deleteProduct, isLoading: loading } =
    useDeleteProductMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteProduct(data)
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar producto"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este producto?"
    />
  )
}

export default DeleteProductView

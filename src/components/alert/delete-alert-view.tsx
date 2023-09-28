import { useDeleteNoticeMutation } from '@/data/alert'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteNoticeView = () => {
  const { data } = useModalState()
  const { mutate: deleteNotice, isLoading: loading } = useDeleteNoticeMutation()

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
      title="Eliminar alerta"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar esta alerta?"
    />
  )
}

export default DeleteNoticeView

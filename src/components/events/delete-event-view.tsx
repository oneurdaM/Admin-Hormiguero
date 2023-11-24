import { useDeleteEventMutation } from '@/data/events'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteEventView = () => {
  const { data } = useModalState()
  const { mutate: deleteEvent, isLoading: loading } = useDeleteEventMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    deleteEvent(data)
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Eliminar"
      title="Eliminar evento"
      deleteBtnLoading={loading}
      description="¿Estás seguro de que deseas eliminar este evento?"
    />
  )
}

export default DeleteEventView

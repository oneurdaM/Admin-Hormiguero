import Modal from '@/components/ui/modal/modal'
import dynamic from 'next/dynamic'
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context'
import MakeAdminView from '@/components/user/make-admin-view'

const BanCustomerView = dynamic(() => import('@/components/user/user-ban-view'))
const ComposerMessage = dynamic(
  () => import('@/components/message/compose-message')
)
const DeleteProduct = dynamic(
  () => import('@/components/products/delete-product-view')
)
const DeleteDepartment = dynamic(
  () => import('@/components/departments/delete-department-view')
)
const DeleteNotice = dynamic(
  () => import('@/components/alert/delete-alert-view')
)
const DeleteCategory = dynamic(
  () => import('@/components/category/delete-category-view')
)
const DeleteNote = dynamic(() => import('@/components/blog/delete-note-view'))

const ReserveSpaceView = dynamic(
  () => import('@/components/reservations/reservation-status-view')
)

const DeleteSpace = dynamic(
  () => import('@/components/spaces/delete-space-catalog-view')
)

const DeleteGenre = dynamic(
  () => import('@/components/genres/delete-genre-view')
)

const DeleteCast = dynamic(() => import('@/components/casts/delete-cast-view'))

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case 'BAN_CUSTOMER':
      return <BanCustomerView />
    case 'MAKE_ADMIN':
      return <MakeAdminView />
    case 'COMPOSE_MESSAGE':
      return <ComposerMessage />
    case 'DELETE_PRODUCT':
      return <DeleteProduct />
    case 'DELETE_CATALOG':
      return <DeleteDepartment />
    case 'DELETE_DEPARTMENT':
      return <DeleteNotice />
    case 'DELETE_CATEGORY':
      return <DeleteCategory />
    case 'DELETE_NOTE':
      return <DeleteNote />
    case 'RESERVATION_STATUS':
      return <ReserveSpaceView />
    case 'DELETE_SPACE':
      return <DeleteSpace />
    case 'DELETE_GENRE':
      return <DeleteGenre />
    case 'DELETE_CAST':
      return <DeleteCast />
    default:
      return null
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState()
  const { closeModal } = useModalAction()

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  )
}

export default ManagedModal

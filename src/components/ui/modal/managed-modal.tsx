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
const DeleteProductCategory = dynamic(
  () => import('@/components/products-categories/delete-product-category-view')
)
const DeleteNotice = dynamic(
  () => import('@/components/alert/delete-alert-view')
)
const DeleteCategory = dynamic(
  () => import('@/components/category/delete-category-view')
)
const DeleteNote = dynamic(() => import('@/components/blog/delete-note-view'))

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case 'BAN_CUSTOMER':
      return <BanCustomerView />
    case 'MAKE_ADMIN':
      return <MakeAdminView />
    case 'COMPOSE_MESSAGE':
      return <ComposerMessage />
    case 'LOCATE_USER':
      return <div>Locate User</div>
    case 'DELETE_PRODUCT':
      return <DeleteProduct />
    case 'DELETE_CATALOG':
      return <DeleteProductCategory />
    case 'DELETE_NOTICE':
      return <DeleteNotice />
    case 'DELETE_CATEGORY':
      return <DeleteCategory />
    case 'DELETE_NOTE':
      return <DeleteNote />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic'
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context'
import Modal from '@/components/ui/modal/modal'
import UserBanView from '@/components/user/user-ban-view'
import UserRoleView from '@/components/user/modify-user-role'
import UserContactView from '@/components/user/user-contact'
import SuggestionView from '@/components/suggestions/suggestion-info-view'

const SuggestionDeleteView = dynamic(
  () => import('@/components/suggestions/suggestion-delete-view')
)

const NoteDeleteView = dynamic(
  () => import('@/components/blog/note-delete-view')
)

const ManagedModal = () => {
  const { isOpen, view } = useModalState()
  const { closeModal } = useModalAction()

  function renderModal(view: MODAL_VIEWS | undefined) {
    switch (view) {
      case 'DELETE_NOTE':
        return <NoteDeleteView />
      case 'BAN_CUSTOMER':
        return <UserBanView />
      case 'MAKE_ADMIN':
        return <UserRoleView />
      case 'SHOW_CONTACT':
        return <UserContactView />
      case 'SHOW_SUGGESTION':
        return <SuggestionView />
      case 'DELETE_SUGGESTION':
        return <SuggestionDeleteView />
    }
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view)}
    </Modal>
  )
}

export default ManagedModal

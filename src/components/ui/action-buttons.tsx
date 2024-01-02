/* eslint-disable @typescript-eslint/no-explicit-any */
import { BanUser } from '@/components/icons/ban-user'
import { EditIcon } from '@/components/icons/edit'
import { TrashIcon } from '@/components/icons/trash'
import { CheckMarkCircle } from '@/components/icons/checkmark-circle'
import { useModalAction } from '@/components/ui/modal/modal.context'
import { CloseFillIcon } from '@/components/icons/close-fill'
import { AdminIcon } from '@/components/icons/admin-icon'
import Link from 'next/link'
import { Role } from '@/types/users'
import { ChatIcon } from '../icons/chat-icon'
import { CalendarIcon } from '../icons/calendar'
import { FaFilePdf } from 'react-icons/fa'
import { downloadTicketpdf } from '@/data/client/pdf'
import { Tooltip } from 'antd'

type Props = {
  id: string
  editModalView?: string | any
  downloadTicket?: string | any
  deleteModalView?: string | any
  editUrl?: string
  detailsUrl?: string
  isUserActive?: boolean
  userStatus?: boolean
  isShopActive?: boolean
  approveButton?: boolean
  //show contact with user
  showContact?: boolean
  showAddWalletPoints?: boolean
  changeRefundStatus?: boolean
  showMakeAdminButton?: boolean
  showReplyQuestion?: boolean
  customLocale?: string
  role?: Role
  isReservationActive?: boolean
  reservationStatus?: boolean

  isSpaceActive?: boolean
  spaceStatus?: boolean
}

const ActionButtons = ({
  id,
  editModalView,
  deleteModalView,
  editUrl,
  detailsUrl,
  userStatus = false,
  isUserActive = false,
  isShopActive,
  approveButton = false,
  showMakeAdminButton = false,
  showReplyQuestion = false,
  showContact = false,
  customLocale,
  downloadTicket,
  role,

  isReservationActive = false,
  reservationStatus = false,

  isSpaceActive = false,
  spaceStatus = false,
}: Props) => {
  const { openModal } = useModalAction()

  function handleDelete() {
    openModal(deleteModalView, id)
  }

  function handleEditModal() {
    openModal(editModalView, id)
  }

  function handleUserStatus(banned: boolean) {
    openModal('BAN_CUSTOMER', { id, banned })
  }

  function handleReservationStatus(active: boolean) {
    openModal('RESERVATION_STATUS', { id, active })
  }

  function handleSpaceActive(active: boolean) {
    openModal('SPACE_STATUS', { id, active })
  }

  function handleMakeAdmin() {
    openModal('MAKE_ADMIN', { id, role })
  }

  function handleShopStatus(status: boolean) {
    if (status === true) {
      //   openModal('SHOP_APPROVE_VIEW', id)
    } else {
      //   openModal('SHOP_DISAPPROVE_VIEW', id)
    }
  }

  const fetchData = async (order: any) => {
    try {
      const response = await downloadTicketpdf(order)
      console.log('response', response)
      if (response.error) {
        console.log('error', response)
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.downloadTicket])
        )
        const link = document.createElement('a')
        link.href = url
        link.download = 'Orden-' + order + '.pdf'

        document.body.appendChild(link)
        link.click()

        console.log('success')
      }
    } catch (error: any) {}
  }

  function showPdf(id: any) {
    fetchData(id)
  }

  function handleShowContact() {
    openModal('SHOW_CONTACT', id)
  }

  function handleReplyQuestion() {
    openModal('REPLY_QUESTION', id)
  }

  return (
    <div className="inline-flex w-auto items-center gap-8">
      {showReplyQuestion && (
        <button
          onClick={handleReplyQuestion}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
        >
          Reply
        </button>
      )}
      {showMakeAdminButton && (
        <button
          onClick={handleMakeAdmin}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          title={'Cambiar a operador'}
        >
          <AdminIcon width={18} />
        </button>
      )}
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
        >
          <Tooltip placement="bottom" title="Eliminar">
            <TrashIcon width={16} />
          </Tooltip>
        </button>
      )}
      {editModalView && (
        <button
          onClick={handleEditModal}
          className="text-body transition duration-200 hover:text-heading focus:outline-none"
        >
          <EditIcon width={16} />
        </button>
      )}
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus(false)}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus(true)}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}
      {reservationStatus && (
        <>
          {isReservationActive ? (
            <button
              onClick={() => handleReservationStatus(false)}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleReservationStatus(true)}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}

      {spaceStatus && (
        <>
          {isSpaceActive ? (
            <button
              onClick={() => handleSpaceActive(false)}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleSpaceActive(true)}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}
      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 hover:text-heading"
        >
          <Tooltip placement="bottom" title="Editar">
            <EditIcon width={16} />
          </Tooltip>
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 text-base transition duration-200 hover:text-heading"
          locale={customLocale}
        >
          <Tooltip placement="bottom" title="Editar">
            <EditIcon width={24} />
          </Tooltip>
        </Link>
      )}
      {
        // showContact - show icon to contact with user (only for admin)
        showContact && (
          <button
            onClick={handleShowContact}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          >
            <ChatIcon width={20} />
          </button>
        )
      }

      {
        // showContact - show icon to contact with user (only for admin)
        downloadTicket && (
          <button
            onClick={() => {
              showPdf(downloadTicket)
            }}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          >
            <Tooltip placement="bottom" title="Descrgar PDF">
              <FaFilePdf style={{ fontSize: '1.5em' }} />
            </Tooltip>
          </button>
        )
      }
    </div>
  )
}

export default ActionButtons

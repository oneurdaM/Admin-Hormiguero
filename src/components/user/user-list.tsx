/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { siteSettings } from '@/settings/site.settings'
import { Role, UsersResponse } from '@/types/users'
import { MappedPaginatorInfo } from '@/types/index'
import StatusColor from './user-role-status-color'
import Badge from '../ui/badge/badge'
import { AlignType, Table } from '../ui/table'
import ActionButtons from '../common/action-buttons'
import Pagination from '../ui/pagination'
import { useRouter } from 'next/router'
import { useMeQuery } from '@/data/user'
import { useTranslation } from 'react-i18next'

type UserListProps = {
  users: UsersResponse[]
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (current: number) => void
}

const UserList = ({ users, paginatorInfo, onPagination }: UserListProps) => {
  const router = useRouter()
  const { data: me } = useMeQuery()
  const { t } = useTranslation()

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      align: 'center' as AlignType,
      render: (image: string) => (
        <Image
          src={image ? image : siteSettings.logo.url}
          alt="Avatar"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center' as AlignType,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center' as AlignType,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as AlignType,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      align: 'center' as AlignType,
      render: (rol: string) =>
        rol === 'USER' ? 'Pendiente de asignar' : t(`common:${rol}`),
    },
    {
      title: 'Estatus',
      dataIndex: 'banned',
      key: 'banned',
      align: 'center' as AlignType,
      render: (banned: true) => (
        <Badge
          text={banned ? 'Inactivo' : 'Activo'}
          color={StatusColor(banned)}
        />
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      render: (id: string, { banned, role }: UsersResponse) => {
        return (
          <ActionButtons
            id={id}
            userStatus={me?.role === 'DIRECTOR' ? true : false}
            isUserActive={!banned}
            detailsUrl={
              me?.id !== parseInt(id)
                ? `${router.asPath}/${id}`
                : '/profile-update'
            }
            role={role as Role}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden overflow-x-auto rounded shadow">
        <Table
          className=""
          columns={columns}
          data={users}
          rowKey={'username'}
        />
      </div>
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={parseInt(paginatorInfo.total)}
            current={parseInt(paginatorInfo.currentPage)}
            pageSize={parseInt(paginatorInfo.perPage)}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default UserList

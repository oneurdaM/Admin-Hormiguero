/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignType, Table } from '@/components/ui/table'
import { Routes } from '@/config/routes'
import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/types/index'
import Image from 'next/image'
import LanguageSwitcher from '../ui/lang-action/action'
import Pagination from '../ui/pagination'
import TitleWithSort from '../ui/title-with-sort'
import { formatDate } from '@/utils/format-date'

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
}

const NotesList = ({ notes, paginatorInfo, onPagination }: NotesListProps) => {
  const columns = [
    {
      title: 'Imágen',
      dataIndex: 'image',
      key: 'image',
      align: 'center' as AlignType,
      width: 74,
      render: (image: string) => (
        <Image
          src={image}
          alt="artile"
          className="overflow-hidden rounded"
          width={42}
          height={42}
        />
      ),
    },
    {
      title: 'Categoría',
      dataIndex: ['category', 'name'],
      key: 'category',
      align: 'center' as AlignType,
      width: 64,
    },
    {
      title: <TitleWithSort title="Título" ascending={true} isActive={false} />,
      dataIndex: 'title',
      key: 'title',
      align: 'center' as AlignType,
      width: 170,
      render: (title: string) => <span className="line-clamp-2">{title}</span>,
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      align: 'center' as AlignType,
      render: (content: string) => (
        <span className="line-clamp-2">{content}</span>
      ),
    },
    {
      title: 'Autor',
      dataIndex: 'user',
      key: 'author',
      align: 'center' as AlignType,
      width: 100,
      render: (user: any) => (
        <span className="line-clamp-2">
          {user.firstName} {user.lastName}
        </span>
      ),
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      width: 100,
      render: (date: string) => formatDate(date),
    },
    // {
    //   title: 'Actualizado',
    //   dataIndex: 'updatedAt',
    //   key: 'updatedAt',
    //   align: 'center' as AlignType,
    //   width: 100,
    //   render: (date: string) => formatDate(date),
    // },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
      width: 64,
      render: (id: string, record: any) => (
        <LanguageSwitcher
          id={id}
          slug={record.slug}
          record={record}
          routes={Routes.blog}
          deleteModalView="DELETE_NOTE"
        />
      ),
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          rowKey="id"
          scroll={{ x: 900 }}
          columns={columns}
          emptyText="No hay notas creadas"
          data={notes ?? []}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default NotesList

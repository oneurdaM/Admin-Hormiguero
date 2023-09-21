import React from 'react'
import { GetServerSideProps } from 'next'

import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'
import TaskCreateForm from "@/components/tasks/task-form";
import AppLayout from '@/components/layout/app'

export default function CreateTask() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Crear Nueva Tarea
        </h1>
      </div>

      <TaskCreateForm />
    </>
  )
}

CreateTask.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token, permissions } = getAuthCredentials(ctx)
    if (
      !isAuthenticated({ token, permissions }) ||
      !hasAccess(allowedRoles, permissions)
    ) {
      return {
        redirect: {
          destination: Routes.login,
          permanent: false,
        },
      }
    }
    return {
      props: {
        userPermissions: permissions,
      },
    }
  }

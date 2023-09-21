import { GetServerSideProps } from "next";
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from "@/utils/auth-utils";
import { Routes } from "@/config/routes";

import Layout from "@/components/layout/admin";
import AlertCreateForm from "@/components/alert/alert-form";

export default function CreateAlert() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Alerta</h1>
      </div>

      <AlertCreateForm />
    </>
  );
}

CreateAlert.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx);
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: Routes.login,
        permanent: false,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
    },
  };
};

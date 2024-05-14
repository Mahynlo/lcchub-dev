"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import Sidebar from "@/components/ui/dashboard/sidebar";
import Login from "@/components/ui/dashboard/login";

export default function AuthLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { instance, accounts } = useMsal();
  return (
    <div>
      <AuthenticatedTemplate>
      <DashboardNavbar instance={instance} accounts={accounts} />
        <div className="flex flex-row">
          <Sidebar />
          {children}
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
      <DashboardNavbar instance={instance} accounts={accounts} />
        <Login instance={instance} />
      </UnauthenticatedTemplate>
    </div>
  );
}

"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import { SidebarNav } from "@/components/ui/dashboard/sidebarnav";
import Login from "@/components/ui/dashboard/login";

const sidebarNavItems = [
  {
    title: "Mi Progreso",
    href: "/dashboard/auth/progress",
  },
  {
    title: "Mapa Interactivo",
    href: "/dashboard/auth/lccmap",
  },
];

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
          <SidebarNav items={sidebarNavItems} />
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

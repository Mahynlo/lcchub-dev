"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import Login from "@/components/ui/dashboard/login";
export default function AuthLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { instance } = useMsal();
  return (
    <div>
       <DashboardNavbar />
        <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login instance={instance} />
        </UnauthenticatedTemplate>
    </div>
  );
}
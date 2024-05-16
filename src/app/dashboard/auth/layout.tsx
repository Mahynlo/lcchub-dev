"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import { SidebarNav } from "@/components/ui/dashboard/sidebarnav";
import Login from "@/components/ui/dashboard/login";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Mi Progreso",
    href: "/dashboard/auth/profile/progress",
  },
  {
    title: "Mapa Interactivo",
    href: "/dashboard/auth/profile/lccmap",
  },
];

export default function AuthLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardNavbar />
      <AuthenticatedTemplate>
        <div className="container relative py-5">
          <div className="rounded-[0.5rem] border bg-background shadow">
            <div className="space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Mi Portal</h2>
                <p className="text-muted-foreground">
                  Bienvenido a tu portal personal de la carrera en ciencias de
                  la computación.
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 px-4 lg:px-0 lg:w-4/5">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}

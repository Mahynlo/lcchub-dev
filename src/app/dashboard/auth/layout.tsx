"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import { SidebarNav } from "@/components/ui/dashboard/sidebarnav";
import { Badge } from "@/components/ui/badge";
import Login from "@/components/ui/dashboard/login";
import { Separator } from "@/components/ui/separator";
import { StudentInfoContext } from "./profile/StudentInfoContext";
import { useContext } from "react";

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

  // const student = useContext(StudentInfoContext);
  // console.log("creditos= " + (student?.approvedCredits / student?.requiredCredits)*100);
  // console.log("studiante= " + student?.name);
  return (
    <div>
      <AuthenticatedTemplate>
        <DashboardNavbar />
        <div className="container relative py-5">
          <div className="rounded-[0.5rem] border bg-background shadow">
            <div className="space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Mi Portal</h2>

                </div>
                <p className="text-muted-foreground">
                  Bienvenido a tu portal personal de la carrera en ciencias de la computación.
                </p>
              </div>

              <Separator className="my-6" />
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/7">{/*cambiar espacio horizontal del sidenavbar */}
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 px-4 lg:px-0 lg:w-4/5">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <DashboardNavbar />
        <Login />
      </UnauthenticatedTemplate>
      <footer className="mt-8 text-center text-sm text-gray-600 w-full py-4">
        Para comentarios y sugerencias, comuníquese al correo <a href="mailto:lcc@unison.mx" className="text-blue-700 underline">app-lcc@unison.mx</a>
      </footer>

    </div>
  );
}

"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import { SidebarNav } from "@/components/ui/dashboard/sidebarnav";
import Login from "@/components/ui/dashboard/login";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/lib/types";
import { getStudentById } from "@/lib/api/student-by-id";
import { createContext, useState, useEffect } from "react";

export const StudentInfoContext = createContext<Student | null>(null);

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
  const studentAccount = accounts[0];
  const studentId = studentAccount.username.split("@")[0].substring(1);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    getStudentById(studentId).then((student) => {
      setStudent(student);
    });
  }, [studentId]);

  return (
    <div>
      <AuthenticatedTemplate>
        <DashboardNavbar instance={instance} accounts={accounts} />
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
                <div className="flex-1 px-4 lg:px-0 lg:w-4/5">
              <StudentInfoContext.Provider value={student}>
                {children}
              </StudentInfoContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <DashboardNavbar instance={instance} accounts={accounts} />
        <Login instance={instance} />
      </UnauthenticatedTemplate>
    </div>
  );
}

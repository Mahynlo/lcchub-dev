"use client";
import { useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StudentInfoContext } from "../layout";

export default function Page() {
  const student = useContext(StudentInfoContext);

  return (
    student && (
      <div>
          <div className="w-full">
            <section className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div className="space-y-1">
                <h1 className="text-xl font-bold">{student.name}</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {student.email}
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {student.programName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Progress
                  className="w-32"
                  value={
                    (student.approvedCredits / student.requiredCredits) * 100
                  }
                />
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {Math.trunc(
                      (student.approvedCredits / student.requiredCredits) * 100,
                    )}
                    %
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avance
                  </p>
                </div>
              </div>
            </section>
            <Separator className="my-6" />
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4`">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Créditos Aprobados
                  </CardTitle>
                  <BookIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.approvedCredits}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    de {student.requiredCredits} requeridos
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Créditos Restantes
                  </CardTitle>
                  <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.requiredCredits - student.approvedCredits}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    para graduarse
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Promedio
                  </CardTitle>
                  <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.kardexGrade}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    acumulado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Promedio
                  </CardTitle>
                  <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.periodGrade}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    del periodo
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Nivel de inglés
                  </CardTitle>
                  <BookIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.levelAndCycleEnglish.split("-")[0]}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    de 4
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Créditos Culturales
                  </CardTitle>
                  <BookIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student.cultCredits}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    de 4 requeridos
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
      </div>
    )
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

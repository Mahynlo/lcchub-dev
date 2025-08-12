"use client";

import { useMsal } from "@azure/msal-react";
import { Student } from "@/lib/types";
import { getStudentById } from "@/lib/api/student-by-id";
import { useState, useEffect } from "react";
import Notification from "@/components/ui/notification";
import { StudentInfoContext } from "./StudentInfoContext";
import { extractSubjectsKeys } from "@/components/ui/dashboard/lccmap/subject-card";
import { useCacheSubject } from "./SubjectCache";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { cacheSubject } = useCacheSubject();
  const { accounts } = useMsal();
  const studentAccount = accounts[0];
  const studentId = studentAccount.username.split("@")[0].substring(1);
  const [student, setStudent] = useState<Student | null>(null);

  const [notifications, setNotifications] = useState<
    { id: string; message: string; className?: string; position?: "top" | "bottom" }[]
  >([]);

  function isInRange(anio: number, semester: number): boolean {
    const baseYear = 2000 + Math.floor(anio / 10);
    const baseSem = anio % 10;

    const targetYear = 2000 + Math.floor(semester / 10);
    const targetSem = semester % 10;

    const baseIndex = (baseYear * 2) + (baseSem - 1);
    const targetIndex = (targetYear * 2) + (targetSem - 1);

    const diff = targetIndex - baseIndex;

    return diff >= 1 && diff <= 4;
  }
  const addNotification = (
    message: string,
    className?: string,
    position: "top" | "bottom" = "bottom"
  ) => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { id, message, className, position }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    getStudentById(studentId).then((student) => {
      setStudent(student);
    });
  }, [studentId]);

useEffect(() => {
  if (!student || cacheSubject.size === 0) return;


    const pathname = window.location.pathname;
    const alreadyShown = sessionStorage.getItem(`notificacionesMostradas:${pathname}`);

    if (alreadyShown) return;

    addNotification(
      "Los datos aquí presentados pueden estar desactualizados. En caso de duda consultar la información oficial en el portal de alumnos.",
      "bg-yellow-50 border-yellow-300 text-yellow-800",
      "top"
    );

    const failedSubjects = student.failedSubjects;
    const approvedSubjects = student.creditedSubjects;

    if (failedSubjects) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentSemester = currentMonth <= 6 ? `${currentYear.toString().slice(-2)}1` : `${currentYear.toString().slice(-2)}2`;

      const previousSemester = currentSemester.endsWith("1")
        ? `${(currentYear - 1).toString().slice(-2)}2`
        : `${currentYear.toString().slice(-2)}1`;

      const subjectsArray = failedSubjects.split(" ");
      const approvedArray = approvedSubjects.split(" ");

      const approvedPreviousSemesterSubjects = approvedArray.filter(subject =>
        subject.endsWith(previousSemester)
      ).join(" ");
      const failedPreviousSemesterSubjects = subjectsArray.filter(subject =>
        subject.endsWith(previousSemester)
      ).join(" ");

      const clavesApro = extractSubjectsKeys(approvedPreviousSemesterSubjects);
      const clavesRepro = extractSubjectsKeys(failedPreviousSemesterSubjects);
      
      function sumCredits(clavesApro: string[]) {
        let totalCredits = 0;
        for (const clave of clavesApro) {
          const subject = cacheSubject.get(clave);
          //console.log(`Clave: ${clave}, Subject: `, subject);
          if (subject) {
            totalCredits += parseInt(subject.credits);
          }
        }
        return totalCredits;
      }

      // console.log("Todas las claves en cacheSubject:", Array.from(cacheSubject.keys()));
      // console.log("clavesRepro:", clavesApro);
      const sumaApro = sumCredits(clavesApro);
      const sumaRepro = sumCredits(clavesRepro);
      const anio = student.studentID.substring(1, 4);
      const semestreValido = isInRange(parseInt(anio), parseInt(currentSemester));


      //console.log("creditos apro ", sumaApro);
      //console.log("creditos repro ", sumaRepro);
      if ((sumaRepro >= 0.5 * (sumaApro + sumaRepro)) && semestreValido) {
        console.log("funciona");
        addNotification("Tienes mas del 50% reprobadas el semestre anterior.");
      }
    }

    if (student.thirdEnrolledSubjects) {
      addNotification("Tienes materias con una tercera inscripción", "mt-10");
    }

    sessionStorage.setItem(`notificacionesMostradas:${pathname}`, "true");
  }, [student, cacheSubject]);

  if (!student) {
    return (
      <div>
        La o el estudiante {studentAccount.name} con cuenta{" "}
        {studentAccount.username} no se encuentra en la base de datos de LCC.
      </div>
    );
  }

  return (
    <>
      <StudentInfoContext.Provider value={student}>
        {children}
      </StudentInfoContext.Provider>

      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        {notifications
          .filter((n) => n.position === "top")
          .map((n) => (
            <Notification
              key={n.id}
              id={n.id}
              message={n.message}
              onClose={removeNotification}
              duration={15000}
              className={n.className}
            />
          ))}
      </div>

      <div className="fixed bottom-20 right-5 z-50 flex flex-col gap-4">
        {notifications
          .filter((n) => n.position !== "top")
          .map((n) => (
            <Notification
              key={n.id}
              id={n.id}
              message={n.message}
              onClose={removeNotification}
              duration={15000}
              className={n.className}
            />
          ))}
      </div>
    </>
  );
}

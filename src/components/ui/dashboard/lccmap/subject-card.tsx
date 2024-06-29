import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useContext, useState } from "react";
import { SubjectShowContext } from "@/lib/types";
import { StudentInfoContext } from "@/app/dashboard/auth/profile/layout";
import { Subject } from "@/lib/types";

export default function SubjectCard({
  subject,
}: {
  subject: Subject | undefined;
}) {
  const { showAll, showSubject, setShowAll, filterOption, setFilterOption } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);
  const [click, setClick] = useState(false);

  function subjectClick() {
    setClick(true);
    setShowAll && setShowAll(false);
    all2false(showSubject);
    if (subject?.tracklistSubject) {
      for (const key of subject.tracklistSubject) showSubject.set(key, true);
    }
  }

  function subjectLeave() {
    if (click) {
      if (filterOption == "all") setShowAll && setShowAll(true);
      else setOptionSubjects(student, filterOption, showSubject);
    }
    setClick(false);
  }

  return (
    <Dialog>
      <Card
        className={cn(`w-[125px] h-[100px] text-center justify-between 
        ${axisColor(subject?.branch)} hover:scale-110
        ${showAll || (subject && showSubject.get(subject.subjectKey)) ? "opacity-100" : "opacity-20"}
        hover:opacity-100
        `)}
        onClick={subjectClick}
        onMouseLeave={subjectLeave}
      >
        <CardHeader>
          {subject && (
            <CardTitle>
              {isNaN(+subject?.subjectKey) ? (
                <h3 className="text-[12px]">
                  {subject?.abbr || subject?.subjectName.trim()}
                </h3>
              ) : (
                <DialogTrigger asChild>
                  <button>
                    <h3 className="text-[12px]">
                      {subject?.abbr || subject?.subjectName.trim()}
                    </h3>
                  </button>
                </DialogTrigger>
              )}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {subject?.subjectKey} - {subject?.subjectName.trim()}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{subject?.credits} créditos</DialogDescription>
        <div>
          <h1 className="text-sm font-bold">{subject?.academicDivision}</h1>
          <p className="text-sm">Departamento de {subject?.department}</p>
          <p className="text-sm">Eje {subject?.branch}</p>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <p className="text-sm">Teoría: {subject?.theoryHours}</p>
            <p className="text-sm">Laboratorio: {subject?.labHours}</p>
            <p className="text-sm">Taller: {subject?.workshopHours}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <p className="text-sm">Requisitos: {subject?.requirements}</p>
            <p className="text-sm">Liberaciones: {subject?.releases}</p>
          </div>

          <div>
            <h1 className="text-sm font-bold">Requisitos</h1>
            {subject?.requirements?.split("-").map((req) => (
              <p className="text-sm" key={req}>
                {req}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function all2false(map: Map<string, boolean>) {
  const keys = Array.from(map.keys());
  for (const key of keys) {
    map.set(key, false);
  }
}

function axisColor(axis: string | undefined) {
  if (axis == "Basico") return "bg-[#e8eef7]";
  if (axis == "Comun") return "bg-[#ffff66]";
  if (axis == "Profesional") return "bg-[#ff9966]";
  if (axis == "Especializante" || axis == "Selectiva") return "bg-[#99ff66]";
  if (axis == "Integrador") return "bg-[#9966ff]";
  return "bg-[#e8ef7]";
}

function extractSubjectsKeys(str: string) {
  return str.split(" ").map((s) => s.split("-")[0]);
}

export function setOptionSubjects(
  student: any,
  filterOption: string,
  showSubject: Map<string, boolean>
) {
  if (filterOption == "credited") {
    for (const key of extractSubjectsKeys(student?.creditedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "dropped") {
    for (const key of extractSubjectsKeys(student?.droppedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "enrolled") {
    for (const key of extractSubjectsKeys(student?.enrolledSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "failed") {
    for (const key of extractSubjectsKeys(student?.failedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "third enrolled") {
    for (const key of extractSubjectsKeys(student?.thirdEnrolledSubjects || ""))
      showSubject.set(key, true);
  }
}

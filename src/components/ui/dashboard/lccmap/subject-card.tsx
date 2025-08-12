import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubjectAccordion from "../../accordion";
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
import { StudentInfoContext } from "@/app/dashboard/auth/profile/StudentInfoContext";
import { Subject } from "@/lib/types";
import { getCurriculumMaps } from "@/lib/api/curriculumMap-by-key";
import { Button } from "../../button";
import { useRouter } from "next/navigation";

export default function SubjectCard({
  subjectKey,
  subjectCache,
}: {
  subjectKey: string;
  subjectCache: Map<string, Subject>;
}) {
  const { showAll, showSubject, setShowAll, filterOption, setFilterOption } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);
  const [click, setClick] = useState(false);
  const router = useRouter();

  //console.log("cosas del cache: ",subjectCache);
  //console.log("cosas del subj: ",subjectKey);
  const subject = subjectCache.get(subjectKey);//materias tomadas por semestre, no son todas
  //  if (subject?.subjectKey === 'Intg'){
  //   for (const key of extractSubjectsKeys(student?.creditedSubjects || ""))
  //     if(key === subject.subjectKey && subject.branch === 'Intg')
  //  }else if (subject?.subjectKey === 'Esp'){

  //  }else if (subject?.subjectKey === 'Selec'){
  // //   for (let i = 0; i < materias.length; i++) {

  // //   if(CurriculumMaps.integratorSubjects.split(-)[i] === student?.creditedSubjects[i] )

  // //   }
  // } 



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
  const handleRedirect = () => {
    if (subject?.page) {
      window.open(subject.page, "_blank");
    }
  };
  //console.log("materia?"+subject);
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
              {(isNaN(+subject?.subjectKey) && subject?.subjectKey !== "Avi") ? (
                <h3 className="text-[12px]">
                  {subject?.abbr || subject?.subjectName.trim()}
                </h3>
              ) : (
                <DialogTrigger asChild>
                  <button className="text-[12px] font-semibold">
                    {subject?.abbr || subject?.subjectName.trim()}
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
            {subjectKey === "Avi"
              ? `${subject?.subjectName}`
              : `${subject?.subjectKey} - ${subject?.subjectName?.trim()}`}
          </DialogTitle>
        </DialogHeader>

        {subjectKey === "Avi" ? (
          <div className="max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">

            <p>{subject?.detalles}</p>
            {(() => {
              //console.log("subject:", subject);
              return null;
            })()}

            {subject?.opciones?.map((opcion, i) => (
              <SubjectAccordion key={i} title={opcion.nombre}>
                {opcion.detalles.map((detalle, j) => (
                  <div key={j} className="mb-2">
                    {detalle.periodo && <p>Periodo: {detalle.periodo}</p>}
                    <p>Créditos: {detalle.creditos}</p>
                  </div>
                ))}
              </SubjectAccordion>
            ))}


          </div>
        ) : (
          <div>
            <DialogDescription>{subject?.credits} créditos</DialogDescription>
            <h1 className="text-sm font-bold">{subject?.academicDivision}</h1>
            <p className="text-sm">Departamento de {subject?.department}</p>
            <p className="text-sm">Eje {subject?.branch}</p>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <p className="text-sm">Teoría: {subject?.theoryHours}</p>
              <p className="text-sm">Laboratorio: {subject?.labHours}</p>
              <p className="text-sm">Taller: {subject?.workshopHours}</p>
            </div>

            <div>
              <h1 className="text-sm font-bold mt-3">Requiere de:</h1>

              {subject?.requirements ? (
                subject.requirements.toLowerCase().includes("creditos") ? (
                  <p className="text-sm">{subject.requirements.trim()}</p>
                ) : (
                  subject.requirements
                    .split("-")
                    .filter((req) => req.trim() !== "")
                    .map((req) => (
                      <p className="text-sm" key={req}>
                        {subjectCache.get(req)?.subjectName.trim() || req}
                      </p>
                    ))
                )
              ) : (
                <p className="text-sm text-gray-500">Sin requisitos.</p>
              )}
            </div>



            <div>
              <h1 className="text-sm font-bold mt-3">Libera:</h1>
              {subject?.releases?.split("-").map((req) => (
                <p className="text-sm" key={req}>
                  {subjectCache.get(req)?.subjectName.trim()}
                </p>
              ))}
            </div>
            {subject?.page && (
              <div>
                <Button
                  onClick={handleRedirect}
                  className="mt-6 flex flex-row items-center px-3 py-2 text-blue-950 font-semibold bg-white rounded-md hover:bg-blue-100"
                >
                  <span className="pl-1">Programa</span>
                </Button>
              </div>
            )}

          </div>
        )}
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
  if (axis == "Especializante" || axis == "Selectiva" || axis == "Vocacional") return "bg-[#99ff66]";
  if (axis == "Integrador") return "bg-[#9966ff]";
  return "bg-[#e8ef7]";
}

export function extractSubjectsKeys(str: string) {
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
    for (const key of extractSubjectsKeys(student?.enrolledSubjects || "")) {
      showSubject.set(key, true);
      // console.log(key);
      // console.log("cosas de show: ", showSubject);
    }
  } else if (filterOption == "failed") {
    for (const key of extractSubjectsKeys(student?.failedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "third enrolled") {
    for (const key of extractSubjectsKeys(student?.thirdEnrolledSubjects || ""))
      showSubject.set(key, true);
  }
}

"use client";

import { Subject, CurriculumMap, Student } from "@/lib/types";
import { StudentInfoContext } from "../layout";
import { useContext, useEffect, useState } from "react";
import { getCurriculumMaps, cacheSubjectInfo } from "@/lib/api/curriculumMap-by-key";
import { AxisCard } from "@/components/ui/dashboard/lccmap/axiscard";
import { cn } from "@/lib/utils";

export default function Page() {
  const student = useContext(StudentInfoContext);
  const key = student?.studyPlan;
  const [curriculumMap, setCurriculumMap] = useState<CurriculumMap | null>(null);
  const [cacheSubject, setCacheSubject] = useState<Map<string, Subject>>(new Map());
  useEffect(() => {
    if (key) {
      getCurriculumMaps(key).then((curriculumMap) => {
        setCurriculumMap(curriculumMap);
        if (curriculumMap) {
          const program = curriculumMap.semesters;
          cacheSubjectInfo(program).then((cache) => {
            setCacheSubject(cache);
          });
        }
      });
    }
  }, [key]);
  return curriculumMap && (
    <div className="w-full">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="grid gap-4">
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explora tu progreso en el plan de estudios, y las materias serializadas.
          </p>
          <h2 className="text-xl font-bold">Total de créditos</h2>
          <p className="text-4xl font-bold">{curriculumMap.totalCredits}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AxisCard title="Básico" credits={curriculumMap.basicCredits} color="#e8eef7" />
          <AxisCard title="Común" credits={curriculumMap.commonCredits} color="#ffff66" />
          <AxisCard title="Profesionalizante" credits={curriculumMap.electiveCredits} color="#ff9966" />
          <AxisCard title="Especializante" credits={curriculumMap.specialistCredits} color="#99ff66" />
          <AxisCard title="Integrador" credits={curriculumMap.integratorCredits} color="#9966ff" />
        </div>
      </div>
      <div className="container grid gap-8 px-4 py-10 md:px-6">
        <CurriculumMapSection semesters={curriculumMap.semesters} subjectCache={cacheSubject} />
        </div>
    </div>
  );
}


function CurriculumMapSection( { semesters, subjectCache } : { semesters: string[], subjectCache: Map<string, Subject> }) {
  return (
    <div className={cn(`grid grid-cols-8 gap-1`)}>
      {semesters.map((semester, i) => (
        <SemesterCard key={i} semester={semester} subjectCache={subjectCache} />
      ))}
    </div>
  );
}

function SemesterCard({ semester, subjectCache }: { semester: string, subjectCache: Map<string, Subject> }) {
  const subjectKeys = semester.split("-");
  return (
    <div>
      <div className={cn(`grid gap-5`)}>
        {subjectKeys.map((subjectKey, i) => (
          <SubjectCard key={i} subject={subjectCache.get(subjectKey)} />
        ))}
      </div>
    </div>
  );
}

function SubjectCard({ subject }: { subject: Subject | undefined }) {
  return (
    <div className={cn(`flex flex-col bg-white hover:scale-125 p-4 max-h-16 min-h-14 max-w-30 min-w-31 flex items-center justify-center gap-1 ${axisColor(subject?.branch.trim())}`)}>
      <h3 className="text-[8px] text-center">{subject?.abbr || subject?.subjectName}</h3>
      <p className="text-[8px] text-center">{subject?.credits}</p>
    </div>
  );
}

function axisColor(axis: string | undefined) {
  if (axis == "Basico") return "bg-[#e8eef7]";
  if (axis == "Comun") return "bg-[#ffff66]";
  if (axis == "Profesional") return "bg-[#ff9966]";
  if (axis == "Especializante" || axis == "Selectiva") return "bg-[#99ff66]";
  if (axis == "Integrador") return "bg-[#9966ff]";
  return "bg-[#e8ef7]";
}
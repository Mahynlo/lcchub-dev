"use client";

import { Subject, CurriculumMap, Student } from "@/lib/types";
import { StudentInfoContext } from "../layout";
import { useContext, useEffect, useState } from "react";
import { getCurriculumMaps, cacheSubjectInfo } from "@/lib/api/curriculumMap-by-key";
import { AxisCard } from "@/components/ui/dashboard/lccmap/axiscard";

export default function Page() {
  const student = useContext(StudentInfoContext);
  const key = student?.studyPlan;
  const [curriculumMap, setCurriculumMap] = useState<CurriculumMap | null>(null);
  const [cacheSubject, setCacheSubject] = useState<Map<string, Subject> | null>(null);
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
          <AxisCard title="Básico" credits={curriculumMap.basicCredits} color="#ffff66" />
          <AxisCard title="Común" credits={curriculumMap.commonCredits} color="#e8eef7" />
          <AxisCard title="Profesionalizante" credits={curriculumMap.electiveCredits} color="#ff9966" />
          <AxisCard title="Especializante" credits={curriculumMap.specialistCredits} color="#99ff66" />
          <AxisCard title="Integrador" credits={curriculumMap.integratorCredits} color="#9966ff" />
        </div>
      </div>
    </div>
  );
}
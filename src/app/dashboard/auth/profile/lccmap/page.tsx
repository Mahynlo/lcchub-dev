"use client";

import { Subject, CurriculumMap } from "@/lib/types";
import { StudentInfoContext } from "../layout";
import { useContext, useEffect, useState } from "react";
import {
  getCurriculumMaps,
  cacheSubjectInfo,
} from "@/lib/api/curriculumMap-by-key";
import { AxisCard } from "@/components/ui/dashboard/lccmap/axiscard";
import CurriculumMapSection from "@/components/ui/dashboard/lccmap/curriculum-map";
import { ComboboxPopover } from "@/components/ui/dashboard/lccmap/combobox-popover";
import { SubjectShowContext } from "@/lib/types";

export default function Page() {
  const student = useContext(StudentInfoContext);
  const key = student?.studyPlan;
  const [curriculumMap, setCurriculumMap] = useState<CurriculumMap | null>(
    null
  );
  const [cacheSubject, setCacheSubject] = useState<Map<string, Subject>>(
    new Map()
  );
  const [showAll, setShowAll] = useState(true);
  const [showSubject, setShowSubject] = useState(new Map<string, boolean>());
  const [filterOption, setFilterOption] = useState("all");

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
  return (
    curriculumMap && (
      <SubjectShowContext.Provider
        value={{
          showAll,
          showSubject,
          setShowAll,
          filterOption,
          setFilterOption,
        }}
      >
        <div className="w-full items-center">
          <div className="container grid gap-8 px-4 md:px-6">
            <div className="grid gap-4">
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explora tu progreso en el plan de estudios, y las materias
                serializadas.
              </p>
              <h2 className="text-xl font-bold">Total de créditos</h2>
              <p className="text-4xl font-bold">{curriculumMap.totalCredits}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AxisCard
                title="Básico"
                credits={curriculumMap.basicCredits}
                color="#e8eef7"
              />
              <AxisCard
                title="Común"
                credits={curriculumMap.commonCredits}
                color="#ffff66"
              />
              <AxisCard
                title="Profesionalizante"
                credits={curriculumMap.electiveCredits}
                color="#ff9966"
              />
              <AxisCard
                title="Especializante"
                credits={curriculumMap.specialistCredits}
                color="#99ff66"
              />
              <AxisCard
                title="Integrador"
                credits={curriculumMap.integratorCredits}
                color="#9966ff"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold py-6">Mapa curricular</h2>
          <div className="px-6 py-2">
            <ComboboxPopover />
          </div>
          <div className="md:grid md:grid-cols-8 md:gap-10 md:w-full md:h-[800px]">
            <CurriculumMapSection
              semesters={curriculumMap.semesters}
              subjectCache={cacheSubject}
            />
          </div>
        </div>
      </SubjectShowContext.Provider>
    )
  );
}

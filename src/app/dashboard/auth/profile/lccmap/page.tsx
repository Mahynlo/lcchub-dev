"use client";

import { useCurriculum } from "../CurriculumContext";
import { useContext, useState, useEffect } from "react";
import { StudentInfoContext } from "../StudentInfoContext";
import { SubjectShowContext } from "@/lib/types";
import CurriculumFlow from "@/components/ui/dashboard/lccmap/curriculum-flow";
import { AxisCard } from "@/components/ui/dashboard/lccmap/axiscard";
import { ComboboxPopover } from "@/components/ui/dashboard/lccmap/combobox-popover";
import { SubjectSearch } from "@/components/ui/dashboard/lccmap/subject-search";
import { ElectivesList } from "@/components/ui/dashboard/lccmap/electives-list";

export default function Page() {
  const { curriculumMap, updatedPrograma, subjectCache: cacheSubject } = useCurriculum();
  const student = useContext(StudentInfoContext);
  const [showAll, setShowAll] = useState(true);
  const [showSubject, setShowSubject] = useState(new Map<string, boolean>());
  const [filterOption, setFilterOption] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Mapa Interactivo | LCCHUB";
  }, []);

  const cols = student?.studyPlan === '2052' ? "md:grid-cols-8" : "md:grid-cols-9";


  return (
    curriculumMap && (
      <SubjectShowContext.Provider
        value={{
          showAll,
          showSubject,
          setShowSubject,
          setShowAll,
          filterOption,
          setFilterOption,
          selectedSubject,
          setSelectedSubject,
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
              <p className="text-4xl font-bold">{Number(curriculumMap.totalCredits)}</p>
            </div>
            <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              <AxisCard
                title="Básico"
                credits={curriculumMap.basicCredits}
                color="#9EC0DB"
              />
              {student?.studyPlan == '2052' && (
                <AxisCard
                  title="Común"
                  credits={curriculumMap.commonCredits}
                  color="#ffff66"
                />
              )}
              {student?.studyPlan == '2052' && (
                <AxisCard
                  title="Profesional"
                  credits={curriculumMap.electiveCredits}
                  color="#ff9966"
                />
              )}
              {student?.studyPlan == '2052' && (
                <AxisCard
                  title="Especializante"
                  credits={curriculumMap.specialistCredits}
                  color="#99ff66"
                />
              )}
              <AxisCard
                title="Integrador"
                credits={curriculumMap.integratorCredits}
                color="#9966ff"
              />
              {student?.studyPlan == '2252' && (
                <AxisCard
                  title="Vocacional"
                  credits={curriculumMap.vocationalCredits}
                  color="#99ff66"
                />
              )}
            </div>
          </div>
          <h2 className="text-xl font-bold py-6 px-4 md:px-0">Mapa curricular</h2>
          <div className="px-4 md:px-6 py-2 flex flex-col md:flex-row gap-3 md:gap-4">
            <ComboboxPopover />
            <SubjectSearch subjectCache={cacheSubject} />
          </div>
          <div className="w-full px-4 md:px-6 py-4">
            <CurriculumFlow
              semesters={updatedPrograma}
              subjectCache={cacheSubject}
            />
            {/* Leyenda de conexiones */}
            <div className="flex flex-wrap gap-4 mt-3 px-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-blue-500 rounded" style={{ boxShadow: "0 0 4px #3b82f6" }} />
                <span>Materias requeridas para llegar aquí</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-green-500 rounded" style={{ boxShadow: "0 0 4px #22c55e" }} />
                <span>Materias que puedes tomar después</span>
              </span>
            </div>
          </div>
          <ElectivesList student={student} curriculumMap={curriculumMap} />
        </div>
      </SubjectShowContext.Provider>
    )
  );
}

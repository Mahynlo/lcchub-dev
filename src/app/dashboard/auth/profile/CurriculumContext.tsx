"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CurriculumMap } from "@/lib/types";
import { useCacheSubject } from "./SubjectCache";
import { getCurriculumMaps, cacheSubjectInfo } from "@/lib/api/curriculumMap-by-key";
import { extractSubjectsKeys } from "@/components/ui/dashboard/lccmap/subject-card";
import { StudentInfoContext } from "./StudentInfoContext";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";

type CurriculumContextType = {
  curriculumMap: CurriculumMap | null;
  updatedPrograma: string[];
  subjectCache: Map<string, any>;
};

const CurriculumContext = createContext<CurriculumContextType>({
  curriculumMap: null,
  updatedPrograma: [],
  subjectCache: new Map(),
});

export const useCurriculum = () => useContext(CurriculumContext);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  const student = useContext(StudentInfoContext);
  const { setCacheSubject, cacheSubject } = useCacheSubject();
  const [curriculumMap, setCurriculumMap] = useState<CurriculumMap | null>(null);
  const [updatedPrograma, setUpdatedPrograma] = useState<string[]>([]);

  useEffect(() => {
    //console.log("Student info:", student);
    const key = student?.studyPlan;
    if (!key) return;

    getCurriculumMaps(key).then((map) => {
      if (!map) return;
      setCurriculumMap(map);

      const program = map.semesters;
      const selectivas = (map.selectiveSubjects || "").split("-").map(normalizeSubjectKey);
      const integradoras = (map.integratorSubjects || "").split("-").map(normalizeSubjectKey);
      const especializantes = (map.specialistSubjects || "").split("-").map(normalizeSubjectKey);
      const optativas = (map.Optativas || "").split("-").filter(k => k.trim()).map(normalizeSubjectKey);

      const { creditedSubjects, enrolledSubjects, droppedSubjects, failedSubjects } = student;
      const enrolledKeys = extractSubjectsKeys(enrolledSubjects);
      const creditedKeys = extractSubjectsKeys(creditedSubjects);
      const droppedKeys = extractSubjectsKeys(droppedSubjects);
      const failedKeys = extractSubjectsKeys(failedSubjects);

      const globalAssignedSubjects = new Set<string>();

      const getStudentSubject = (
        subjectList: string[],
        enrolled: string[],
        credited: string[],
        dropped: string[],
        failed: string[],
        assignedSubjects: Set<string>,
        globalAssignedSubjects: Set<string>
      ) => {
        for (let subject of subjectList) {
          if ((enrolled.includes(subject) || credited.includes(subject) || dropped.includes(subject) || failed.includes(subject))
            && !assignedSubjects.has(subject)
            && !globalAssignedSubjects.has(subject)) {
            return subject;
          }
        }
        return null;
      };

      const replaceSubjectKey = (subjectKey: string, assignedSubjects: Set<string>) => {
        // Normalizar el key antes de cualquier comparación
        const normalizedKey = normalizeSubjectKey(subjectKey);

        if (normalizedKey === "Selec") {
          return getStudentSubject(selectivas, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || normalizedKey;
        }
        if (normalizedKey === "Intg") {
          return getStudentSubject(integradoras, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || normalizedKey;
        }
        if (normalizedKey === "Esp") {
          return getStudentSubject(especializantes, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || normalizedKey;
        }
        // Plan 2252: placeholder OPT para materias optativas/vocacionales
        if (normalizedKey === "OPT") {
          return getStudentSubject(optativas, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || normalizedKey;
        }
        return normalizedKey;
      };

      const updatedProgram = program.map((semester) => {
        const assignedSubjects = new Set<string>();
        return semester.split("-").map((subjectKey) => {
          const replaced = replaceSubjectKey(subjectKey, assignedSubjects);
          if (replaced !== subjectKey) {
            assignedSubjects.add(replaced);
            globalAssignedSubjects.add(replaced);
          }
          return replaced;
        }).join("-");
      });

      let finalProgram = updatedProgram;
      
      // En el plan 2252, inyectar Servicio Social (22118) junto a Prácticas Profesionales ANTES de pedir a Firebase
      if (student.studyPlan === "2252") {
        let modified = false;
        const programWithServicio = updatedProgram.map(sem => {
          const subjects = sem.split("-");
          // Las prácticas en plan 2252 suelen ser 22262, pero aseguramos buscando "22262" en el mapa o simplemente verificando 
          // Ya que no tenemos el nombre todavía, buscamos la clave numérica de las prácticas (si no se sabe, lo inyectamos al final del 7mo u 8vo)
          // Pero asumiéndolo temporalmente por la clave conocida o buscando en el map original
          const hasPracticas = subjects.some(k => 
            map.semesters.some(origSem => origSem.includes(k) && origSem.includes("22262")) || k === "22262"
          );
          
          if (hasPracticas && !subjects.includes("22118")) {
            modified = true;
            return sem + "-22118";
          }
          return sem;
        });

        if (modified) {
          finalProgram = programWithServicio;
        } else {
          // Fallback: si por alguna razón no detecta el ID 22262 (prácticas), inyectar en el 8vo semestre, o al final
          const len = updatedProgram.length;
          if (len >= 8) {
             const subjects = updatedProgram[7].split("-");
             if (!subjects.includes("22118")) {
                 finalProgram[7] = updatedProgram[7] + "-22118";
                 modified = true;
             }
          }
        }
      }

      setUpdatedPrograma(finalProgram);

      cacheSubjectInfo(finalProgram).then((cache) => {
        setCacheSubject(cache);
      });
    });
  }, [student, setCacheSubject]);

  return (
    <CurriculumContext.Provider
      value={{ curriculumMap, updatedPrograma, subjectCache: cacheSubject }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

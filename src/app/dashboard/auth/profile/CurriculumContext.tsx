"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CurriculumMap } from "@/lib/types";
import { useCacheSubject } from "./SubjectCache";
import { getCurriculumMaps, cacheSubjectInfo } from "@/lib/api/curriculumMap-by-key";
import { extractSubjectsKeys } from "@/components/ui/dashboard/lccmap/subject-card";
import { StudentInfoContext } from "./StudentInfoContext";

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
      const selectivas = (map.selectiveSubjects || "").split("-");
      const integradoras = (map.integratorSubjects || "").split("-");
      const especializantes = (map.specialistSubjects || "").split("-");

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
        if (subjectKey === "Selec") {
          return getStudentSubject(selectivas, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || subjectKey;
        }
        if (subjectKey === "Intg") {
          return getStudentSubject(integradoras, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || subjectKey;
        }
        if (subjectKey === "Esp") {
          return getStudentSubject(especializantes, enrolledKeys, creditedKeys, droppedKeys, failedKeys, assignedSubjects, globalAssignedSubjects) || subjectKey;
        }
        return subjectKey;
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

      setUpdatedPrograma(updatedProgram);

      cacheSubjectInfo(updatedProgram).then((cache) => {
        setCacheSubject(cache);
        //console.log(cache);
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

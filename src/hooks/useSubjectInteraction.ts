/**
 * Hooks compartidos para la lógica de interacción con materias en el mapa
 */

import { useState, useContext } from "react";
import { Subject, SubjectShowContext } from "@/lib/types";
import { StudentInfoContext } from "@/app/dashboard/auth/profile/StudentInfoContext";
import { all2false, setOptionSubjects } from "@/components/ui/dashboard/lccmap/subject-card";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";

/**
 * Hook para manejar la lógica de click/hover en tarjetas de materias
 */
export function useSubjectInteraction(
  subjectKey: string,
  subject: Subject | undefined,
  subjectCache?: Map<string, Subject>
) {
  const { showAll, showSubject, setShowSubject, setShowAll, filterOption, setSelectedSubject } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);
  const [click, setClick] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClick(true);
    setShowAll && setShowAll(false);

    // Crear un nuevo Map para evitar mutar el estado directamente
    const newShowSubject = new Map<string, boolean>();

    // Limpiar el estado anterior
    if (subjectCache) {
      Array.from(subjectCache.keys()).forEach(key => newShowSubject.set(key, false));
    } else {
      Array.from(showSubject.keys()).forEach(key => newShowSubject.set(key, false));
    }

    setSelectedSubject && setSelectedSubject(subjectKey);

    // Mantener visible la tarjeta seleccionada
    newShowSubject.set(subjectKey, true);

    // Mostrar materias relacionadas en el tracklist
    if (subject?.tracklistSubject) {
      for (const key of subject.tracklistSubject) {
        newShowSubject.set(key, true);
      }
    }

    // Funciones recursivas para el árbol de relaciones
    if (subjectCache && subject) {
      const processRequirements = (key: string, visited: Set<string> = new Set()) => {
        if (visited.has(key)) return;
        visited.add(key);

        const subj = subjectCache.get(key);
        if (!subj) return;

        newShowSubject.set(key, true);

        if (subj.requirements && !subj.requirements.toLowerCase().includes("creditos")) {
          const requirements = subj.requirements
            .split("-")
            .map(r => normalizeSubjectKey(r))
            .filter(req => req.trim() !== "");
          requirements.forEach(reqKey => {
            if (subjectCache.has(reqKey)) {
              processRequirements(reqKey, visited);
            }
          });
        }
      };

      const processReleases = (key: string, visited: Set<string> = new Set()) => {
        if (visited.has(key)) return;
        visited.add(key);

        const subj = subjectCache.get(key);
        if (!subj) return;

        newShowSubject.set(key, true);

        if (subj.releases) {
          const releases = subj.releases
            .split("-")
            .map(r => normalizeSubjectKey(r))
            .filter(rel => rel.trim() !== "");
          releases.forEach(relKey => {
            if (subjectCache.has(relKey)) {
              processReleases(relKey, visited);
            }
          });
        }
      };

      processRequirements(subjectKey);
      processReleases(subjectKey);
    }

    setShowSubject && setShowSubject(newShowSubject);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (click) {
      if (filterOption === "all") {
        setShowAll && setShowAll(true);
      } else {
        // En estado filtrado, volvemos al estado inicial inmutable
        const newShowSubject = new Map<string, boolean>();
        if (subjectCache) {
          Array.from(subjectCache.keys()).forEach(key => newShowSubject.set(key, false));
        }
        setOptionSubjects(student, filterOption, newShowSubject);
        setShowSubject && setShowSubject(newShowSubject);
      }

      setSelectedSubject && setSelectedSubject(null);
    }
    setClick(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return {
    click,
    isHovered,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}

/**
 * Calcula la opacidad de una materia según su visibilidad y estado de hover
 */
export function getSubjectOpacity(
  showAll: boolean,
  isVisible: boolean,
  isHovered: boolean
): number {
  if (isHovered) return 1;
  if (showAll || isVisible) return 1;
  return 0.3;
}

/**
 * Determina si una materia debe mostrar el diálogo o solo el nombre
 */
export function shouldShowDialog(subjectKey: string): boolean {
  return !isNaN(+subjectKey) || subjectKey === "Avi";
}

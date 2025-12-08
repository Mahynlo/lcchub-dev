/**
 * Hooks compartidos para la lógica de interacción con materias en el mapa
 */

import { useState, useContext } from "react";
import { Subject, SubjectShowContext } from "@/lib/types";
import { StudentInfoContext } from "@/app/dashboard/auth/profile/StudentInfoContext";
import { all2false, setOptionSubjects } from "@/components/ui/dashboard/lccmap/subject-card";

/**
 * Hook para manejar la lógica de click/hover en tarjetas de materias
 */
export function useSubjectInteraction(subjectKey: string, subject: Subject | undefined) {
  const { showAll, showSubject, setShowAll, filterOption, setSelectedSubject } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);
  const [click, setClick] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClick(true);
    setShowAll && setShowAll(false);
    all2false(showSubject);
    
    setSelectedSubject && setSelectedSubject(subjectKey);
    
    // Mantener visible la tarjeta seleccionada
    showSubject.set(subjectKey, true);
    
    // Mostrar materias relacionadas en el tracklist
    if (subject?.tracklistSubject) {
      for (const key of subject.tracklistSubject) {
        showSubject.set(key, true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (click) {
      if (filterOption === "all") {
        setShowAll && setShowAll(true);
      } else {
        setOptionSubjects(student, filterOption, showSubject);
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

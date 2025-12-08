/**
 * Componente compartido para mostrar los detalles de una materia en un diálogo
 * Usado por SubjectCard y SubjectNodeFlow
 */

import { Subject } from "@/lib/types";
import { DialogDescription } from "@/components/ui/dialog";
import SubjectAccordion from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface SubjectDialogContentProps {
  subject: Subject;
  subjectKey: string;
  subjectCache: Map<string, Subject>;
}

export function SubjectDialogContent({ 
  subject, 
  subjectKey, 
  subjectCache 
}: SubjectDialogContentProps) {
  const handleRedirect = () => {
    if (subject?.page) {
      window.open(subject.page, "_blank");
    }
  };

  // Caso especial: Materia "Avi"
  if (subjectKey === "Avi") {
    return (
      <div className="max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <p>{subject?.detalles}</p>
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
    );
  }

  // Caso normal: Materia regular
  return (
    <div>
      <DialogDescription>{subject?.credits} créditos</DialogDescription>
      <h1 className="text-sm font-bold">{subject?.academicDivision}</h1>
      <p className="text-sm">Departamento de {subject?.department}</p>
      <p className="text-sm">Eje {subject?.branch}</p>

      {/* Horas de la materia */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <p className="text-sm">Teoría: {subject?.theoryHours}</p>
        <p className="text-sm">Laboratorio: {subject?.labHours}</p>
        <p className="text-sm">Taller: {subject?.workshopHours}</p>
      </div>

      {/* Requisitos */}
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

      {/* Materias que libera */}
      <div>
        <h1 className="text-sm font-bold mt-3">Libera:</h1>
        {subject?.releases ? (
          subject.releases.split("-").map((req) => (
            <p className="text-sm" key={req}>
              {subjectCache.get(req)?.subjectName.trim()}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">No libera materias.</p>
        )}
      </div>

      {/* Botón de programa */}
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
  );
}

/**
 * Retorna el título del diálogo según el tipo de materia
 */
export function getSubjectDialogTitle(
  subjectKey: string, 
  subject: Subject | undefined
): string {
  if (!subject) return "Materia no encontrada";
  
  if (subjectKey === "Avi") {
    return subject.subjectName;
  }
  
  return `${subject.subjectKey} - ${subject.subjectName?.trim()}`;
}

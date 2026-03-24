/**
 * Componente compartido para mostrar los detalles de una materia en un diálogo
 * Usado por SubjectCard y SubjectNodeFlow
 */

import { Subject, Student } from "@/lib/types";
import { DialogDescription } from "@/components/ui/dialog";
import SubjectAccordion from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";
import { BookOpen, FlaskConical, Wrench, Building2, Network, ExternalLink, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Intenta arreglar errores comunes de encoding UTF-8 (ej. "ProgramaciÃ³n" -> "Programación")
 * generados por importes fallidos de CSV.
 */
function fixEncoding(str: string | undefined): string {
  if (!str) return "";
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    return str;
  }
}

interface SubjectDialogContentProps {
  subject: Subject;
  subjectKey: string;
  subjectCache: Map<string, Subject>;
  student?: Student | null;
}

export function SubjectDialogContent({
  subject,
  subjectKey,
  subjectCache,
  student
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
    <div className="space-y-5">
      {/* Header Info: Créditos y Eje */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none font-semibold">
          {subject?.credits} Créditos
        </Badge>
        <Badge variant="outline" className="text-gray-600 font-medium">
          Eje {subject?.branch}
        </Badge>
      </div>

      {/* Facultad y Departamento */}
      <div className="space-y-2 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
        <div className="flex items-start gap-2">
          <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              {/*subject?.academicDivision || "Facultad Interdisciplinaria de Ciencias Exactas y Naturales"*/}
              Facultad Interdisciplinaria de Ciencias Exactas y Naturales
            </h4>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Network className="w-4 h-4 text-gray-400 mt-0.5" />
          <p className="text-sm text-gray-600">
            {subject?.department ? `Departamento de ${subject.department}` : "Departamento de Matemáticas"}
          </p>
        </div>
      </div>

      {/* Horas de la materia */}
      <div className={`grid gap-3 ${student?.studyPlan === "2252" ? "grid-cols-2" : "grid-cols-3"}`}>
        <div className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-md shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-500 mb-1" />
          <span className="text-xs text-gray-500 font-medium">Teoría</span>
          <span className="text-sm font-bold text-gray-900">{subject?.theoryHours}h</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-md shadow-sm">
          <FlaskConical className="w-4 h-4 text-purple-500 mb-1" />
          <span className="text-xs text-gray-500 font-medium">Lab</span>
          <span className="text-sm font-bold text-gray-900">{subject?.labHours}h</span>
        </div>
        
        {student?.studyPlan !== "2252" && (
          <div className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-md shadow-sm">
            <Wrench className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-xs text-gray-500 font-medium">Taller</span>
            <span className="text-sm font-bold text-gray-900">{subject?.workshopHours}h</span>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Requisitos y Liberaciones */}
      <div className="flex flex-col gap-5">
        {/* Requisitos */}
        <div>
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mb-2">
            <ArrowLeft className="w-4 h-4 text-blue-500" />
            Requiere de:
          </h4>
          <div className="flex flex-col gap-1.5">
            {subject?.requirements ? (
              subject.requirements.toLowerCase().includes("creditos") ? (
                <div className="text-sm bg-gray-100 px-2.5 py-1.5 rounded-md text-gray-700 border border-gray-200 font-medium inline-block w-fit">
                  {subject.requirements.trim()}
                </div>
              ) : (
                subject.requirements
                  .split("-")
                  .filter((req) => req.trim() !== "")
                  .map((req) => normalizeSubjectKey(req))
                  .map((req) => (
                    <div className="flex items-center justify-between gap-2 bg-blue-50/50 border border-blue-100 text-blue-900 px-3 py-2 rounded-md w-full" key={req}>
                      <div className="flex items-start gap-2 text-sm flex-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"></span>
                        <span className="leading-tight">{fixEncoding(subjectCache.get(req)?.subjectName.trim() || req)}</span>
                      </div>
                      {subjectCache.get(req)?.branch && (
                        <div className="flex-shrink-0 ml-2">
                          <span className="text-[10px] uppercase font-bold text-blue-600/70 tracking-wider bg-blue-100/50 px-1.5 py-0.5 rounded">
                            {subjectCache.get(req)?.branch}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
              )
            ) : (
              <p className="text-sm text-gray-400 italic">Sin requisitos previos.</p>
            )}
          </div>
        </div>

        {/* Materias que libera */}
        <div>
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mb-2">
            <ArrowRight className="w-4 h-4 text-green-500" />
            Libera a:
          </h4>
          <div className="flex flex-col gap-1.5">
            {subject?.releases ? (
              subject.releases
                .split("-")
                .filter((rel) => rel.trim() !== "")
                .map((rel) => normalizeSubjectKey(rel))
                .map((req) => (
                  <div className="flex items-center justify-between gap-2 bg-green-50/50 border border-green-100 text-green-900 px-3 py-2 rounded-md w-full" key={req}>
                    <div className="flex items-start gap-2 text-sm flex-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5"></span>
                      <span className="leading-tight">{fixEncoding(subjectCache.get(req)?.subjectName.trim() || req)}</span>
                    </div>
                    {subjectCache.get(req)?.branch && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="text-[10px] uppercase font-bold text-green-600/70 tracking-wider bg-green-100/50 px-1.5 py-0.5 rounded">
                          {subjectCache.get(req)?.branch}
                        </span>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-400 italic">No libera materias.</p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de programa */}
      <div className="pt-2">
        {subject?.page ? (
          <Button
            onClick={handleRedirect}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white transition-colors h-10"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Ver Programa Completo</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </Button>
        ) : (
          <Button
            disabled
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-400 cursor-not-allowed h-10 border border-gray-200"
            title="El enlace al programa no está disponible en la base de datos"
          >
            <GraduationCap className="w-4 h-4 opacity-50" />
            <span>Programa no disponible</span>
          </Button>
        )}
      </div>
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
    return fixEncoding(subject.subjectName);
  }

  return `${subject.subjectKey} - ${fixEncoding(subject.subjectName?.trim())}`;
}

import { useState, useEffect } from "react";
import { Student, CurriculumMap, Subject } from "@/lib/types";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";
import { cacheSubjectInfo } from "@/lib/api/curriculumMap-by-key";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubjectDialogContent, getSubjectDialogTitle } from "@/components/ui/dashboard/lccmap/SubjectDialogContent";

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

interface ElectivesListProps {
  student: Student | null;
  curriculumMap: CurriculumMap | null;
}

export function ElectivesList({ student, curriculumMap }: ElectivesListProps) {
  const [electivesDict, setElectivesDict] = useState<{ [category: string]: string[] }>({});
  const [subjectDetails, setSubjectDetails] = useState<Map<string, Subject>>(new Map());
  const [loading, setLoading] = useState(true);

  // Analizar y cargar materias
  useEffect(() => {
    if (!student || !curriculumMap) return;

    let dict: { [category: string]: string[] } = {};
    let allKeysToFetch = new Set<string>();

    const parseOptions = (rawString: string | undefined) => {
      if (!rawString) return [];
      return rawString.split("-").map(k => normalizeSubjectKey(k.trim())).filter(k => k);
    };

    if (student.studyPlan === "2252") {
      // Plan Nuevo
      const optativas = parseOptions(curriculumMap.Optativas);
      if (optativas.length > 0) dict["Materias Optativas / Vocacionales"] = optativas;

      optativas.forEach(k => allKeysToFetch.add(k));
    } else {
      // Plan Viejo 2052
      const selectivas = parseOptions(curriculumMap.selectiveSubjects);
      const especializantes = parseOptions(curriculumMap.specialistSubjects);
      const integradoras = parseOptions(curriculumMap.integratorSubjects);

      if (selectivas.length > 0) dict["Materias Selectivas"] = selectivas;
      if (especializantes.length > 0) dict["Materias Especializantes"] = especializantes;
      if (integradoras.length > 0) dict["Materias Integradoras"] = integradoras;

      selectivas.forEach(k => allKeysToFetch.add(k));
      especializantes.forEach(k => allKeysToFetch.add(k));
      integradoras.forEach(k => allKeysToFetch.add(k));
    }

    setElectivesDict(dict);

    if (allKeysToFetch.size > 0) {
      setLoading(true);
      // Simula el array que cacheSubjectInfo espera normalmente
      cacheSubjectInfo([Array.from(allKeysToFetch).join("-")]).then((cache) => {
        setSubjectDetails(cache);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [student, curriculumMap]);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-6 py-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="h-16 bg-gray-100 rounded"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  const categoryKeys = Object.keys(electivesDict);
  if (categoryKeys.length === 0) return null;

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <h2 className="text-xl font-bold mb-6">Catálogo de Opciones</h2>

      <div className="space-y-8">
        {categoryKeys.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">{category}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {electivesDict[category].map((subjectKey) => {
                const subject = subjectDetails.get(subjectKey);
                
                return (
                  <Dialog key={subjectKey}>
                    <DialogTrigger asChild>
                      <button 
                        className="flex items-center justify-between p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {fixEncoding(subject?.subjectName || subjectKey)}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
                            {subject?.branch || "Materia"}
                          </p>
                        </div>
                        <div className="bg-gray-100/80 px-2 py-1 rounded text-xs font-semibold text-gray-600 flex-shrink-0">
                          {subject?.credits || "?"} Cr
                        </div>
                      </button>
                    </DialogTrigger>
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {getSubjectDialogTitle(subjectKey, subject)}
                        </DialogTitle>
                      </DialogHeader>
                      <SubjectDialogContent
                        subject={subject!}
                        subjectKey={subjectKey}
                        subjectCache={subjectDetails}
                        student={student}
                      />
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

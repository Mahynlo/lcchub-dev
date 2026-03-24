import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { SubjectShowContext } from "@/lib/types";
import { Subject } from "@/lib/types";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";
import { getSubjectCardColor } from "@/lib/utils/subjectColors";
import {
  SubjectDialogContent,
  getSubjectDialogTitle
} from "./SubjectDialogContent";
import {
  useSubjectInteraction,
  shouldShowDialog
} from "@/hooks/useSubjectInteraction";

export default function SubjectCard({
  subjectKey,
  subjectCache,
}: {
  subjectKey: string;
  subjectCache: Map<string, Subject>;
}) {
  const { showAll, showSubject } = useContext(SubjectShowContext)!;
  const subject = subjectCache.get(subjectKey);

  // Hook personalizado para manejar la interacción
  const { handleClick, handleMouseLeave } = useSubjectInteraction(subjectKey, subject, subjectCache);

  return (
    <Dialog>
      <Card
        data-subject-key={subjectKey}
        className={cn(`
          w-[125px] h-[100px] text-center justify-between 
          ${getSubjectCardColor(subject?.branch)} 
          hover:scale-110
          ${showAll || (subject && showSubject.get(subject.subjectKey)) ? "opacity-100" : "opacity-20"}
          hover:opacity-100
        `)}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader>
          {subject && (
            <CardTitle>
              {shouldShowDialog(subject?.subjectKey) ? (
                <DialogTrigger asChild>
                  <button className="text-[12px] font-semibold">
                    {subject?.abbr || subject?.subjectName.trim()}
                  </button>
                </DialogTrigger>
              ) : (
                <h3 className="text-[12px]">
                  {subject?.abbr || subject?.subjectName.trim()}
                </h3>
              )}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getSubjectDialogTitle(subjectKey, subject)}
          </DialogTitle>
        </DialogHeader>
        <SubjectDialogContent
          subject={subject!}
          subjectKey={subjectKey}
          subjectCache={subjectCache}
        />
      </DialogContent>
    </Dialog>
  );
}

// ========================================
// Funciones de Utilidad Exportadas
// ========================================

/**
 * Establece todos los valores de un Map a false
 */
export function all2false(map: Map<string, boolean>) {
  for (const key of map.keys()) {
    map.set(key, false);
  }
}

/**
 * Extrae las claves de materias de un string separado por espacios
 * Formato esperado: "0120-A 0121-B 0123-C"
 */
export function extractSubjectsKeys(str: string): string[] {
  return str.split(" ")
    .map((s) => s.split("-")[0])
    .map(normalizeSubjectKey);
}

/**
 * Establece las materias visibles según el filtro seleccionado
 */
export function setOptionSubjects(
  student: any,
  filterOption: string,
  showSubject: Map<string, boolean>
) {
  const filterMap: Record<string, string> = {
    "credited": "creditedSubjects",
    "dropped": "droppedSubjects",
    "enrolled": "enrolledSubjects",
    "failed": "failedSubjects",
    "third enrolled": "thirdEnrolledSubjects",
  };

  const subjectField = filterMap[filterOption];
  if (subjectField && student?.[subjectField]) {
    for (const key of extractSubjectsKeys(student[subjectField])) {
      showSubject.set(key, true);
    }
  }
}

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useContext, useState } from "react";
import { SubjectShowContext } from "@/lib/types";
import { StudentInfoContext } from "@/app/dashboard/auth/profile/layout";
import { Subject } from "@/lib/types";

export default function SubjectCard({
  subject,
}: {
  subject: Subject | undefined;
}) {
  const { showAll, showSubject, setShowAll, filterOption, setFilterOption } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);
  const [click, setClick] = useState(false);

  function subjectClick() {
    setClick(true);
    setShowAll && setShowAll(false);
    all2false(showSubject);
    if (subject?.tracklistSubject) {
      for (const key of subject.tracklistSubject) showSubject.set(key, true);
    }
  }

  function subjectLeave() {
    if (click) {
      if (filterOption == "all") setShowAll && setShowAll(true);
      else setOptionSubjects(student, filterOption, showSubject);
    }
    setClick(false);
  }

  return (
    <Card
      className={cn(`w-[125px] h-[100px] text-center justify-between 
        ${axisColor(subject?.branch)} hover:scale-110
        ${showAll || (subject && showSubject.get(subject.subjectKey)) ? "opacity-100" : "opacity-20"}
        hover:opacity-100
        `)}
      onClick={subjectClick}
      onMouseLeave={subjectLeave}
    >
      <CardHeader>
        <CardTitle>
          {subject && (
            <h3 className="text-[12px]">
              {subject?.abbr || subject?.subjectName.trim()}
            </h3>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {subject && <p>{subject?.credits || 0}</p>}
        </CardDescription>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

export function all2false(map: Map<string, boolean>) {
  const keys = Array.from(map.keys());
  for (const key of keys) {
    map.set(key, false);
  }
}

function axisColor(axis: string | undefined) {
  if (axis == "Basico") return "bg-[#e8eef7]";
  if (axis == "Comun") return "bg-[#ffff66]";
  if (axis == "Profesional") return "bg-[#ff9966]";
  if (axis == "Especializante" || axis == "Selectiva") return "bg-[#99ff66]";
  if (axis == "Integrador") return "bg-[#9966ff]";
  return "bg-[#e8ef7]";
}

function extractSubjectsKeys(str: string) {
  return str.split(" ").map((s) => s.split("-")[0]);
}

export function setOptionSubjects(
  student: any,
  filterOption: string,
  showSubject: Map<string, boolean>
) {
  if (filterOption == "credited") {
    for (const key of extractSubjectsKeys(student?.creditedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "dropped") {
    for (const key of extractSubjectsKeys(student?.droppedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "enrolled") {
    for (const key of extractSubjectsKeys(student?.enrolledSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "failed") {
    for (const key of extractSubjectsKeys(student?.failedSubjects || ""))
      showSubject.set(key, true);
  } else if (filterOption == "third enrolled") {
    for (const key of extractSubjectsKeys(student?.thirdEnrolledSubjects || ""))
      showSubject.set(key, true);
  }
}

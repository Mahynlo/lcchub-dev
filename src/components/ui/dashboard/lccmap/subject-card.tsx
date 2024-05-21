import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useContext } from "react";
import { SubjectShowContext } from "@/app/dashboard/auth/profile/lccmap/page";
import { Subject } from "@/lib/types";

export default function SubjectCard({
  subject,
}: {
  subject: Subject | undefined;
}) {
  const { showAll, showSubject, setShowAll } = useContext(SubjectShowContext)!;

  function subjectClick() {
    setShowAll && setShowAll(false);
    if (subject?.tracklistSubject) {
      all2false(showSubject);
      for (const key of subject.tracklistSubject) showSubject.set(key, true);
    }
  }

  function subjectLeave() {
    setShowAll && setShowAll(true);
  }

  return (
    <Card
      className={cn(`w-[125px] h-[100px] text-center justify-between 
        ${axisColor(subject?.branch)} hover:scale-110
        ${showAll || (subject && showSubject.get(subject.subjectKey)) ? "opacity-100" : "opacity-50"}
        hover:opacity-100
        `)}
      onClick={subjectClick}
      onMouseLeave={subjectLeave}
    >
      <CardHeader>
        <CardTitle>
          <h3 className="text-[12px]">
            {subject?.abbr || subject?.subjectName.trim()}
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>{subject?.credits}</p>
        </CardDescription>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

function all2false(map: Map<string, boolean>) {
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

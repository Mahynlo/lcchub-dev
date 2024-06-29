import { Subject } from "@/lib/types";
import { cn } from "@/lib/utils";
import SemesterCard from "./semester-stack";

export default function CurriculumMapSection({
  semesters,
  subjectCache,
}: {
  semesters: string[];
  subjectCache: Map<string, Subject>;
}) {
  return (
    <>
      {semesters.map((semester, i) => (
        <div
          key={i}
          className={cn(`grid grid-rows-8 gap-2 justify-center text-center`)}
        >
          <h2 className="text-lg font-bold absolute">{int2roman(i)}</h2>
          <SemesterCard
            key={i}
            semester={semester}
            subjectCache={subjectCache}
          />
        </div>
      ))}
    </>
  );
}

function int2roman(num: number) {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return roman[num];
}

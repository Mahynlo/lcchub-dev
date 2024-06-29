import { Subject } from "@/lib/types";
import SubjectCard from "./subject-card";

export default function SemesterCard({
  semester,
  subjectCache,
}: {
  semester: string;
  subjectCache: Map<string, Subject>;
}) {
  const subjectKeys = semester.split("-");
  return (
    <>
      {subjectKeys.map((subjectKey, i) => (
        <SubjectCard
          key={i}
          subjectKey={subjectKey}
          subjectCache={subjectCache}
        />
      ))}
    </>
  );
}

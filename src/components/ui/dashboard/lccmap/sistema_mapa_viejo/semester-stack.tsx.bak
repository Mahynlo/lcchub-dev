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
  //console.log("cosas del subkeys: ",subjectKeys);
  //console.log("cosas del semesterasa: ",semester);
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

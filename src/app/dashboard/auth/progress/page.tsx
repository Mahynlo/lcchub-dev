"use client";
import { useEffect, useState } from "react";
import { getStudentById } from "@/lib/api/student-by-id";
import { useMsal } from "@azure/msal-react";
import { Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

export default function Page() {
  const { accounts } = useMsal();
  const studentAccount = accounts[0];
  const studentId = studentAccount.username.split("@")[0].substring(1);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    getStudentById(studentId).then((student) => {
      setStudent(student);
    });
  }, [studentId]);

  return (
    <div>
      <p>{studentAccount.username}</p>
      <p>{studentAccount.name}</p>
      <p>{studentId}</p>
      {student && (
        <div>
          <p>{student.name}</p>
          <p>{student.email}</p>
          <p>{student.programName}</p>
          <p>{student.programKey}</p>
          <p>{student.studentStatus}</p>
          <p>{student.levelAndCycleEnglish}</p>
          <p>{student.enrolledSubjects}</p>
          <p>{student.enrolledCredits}</p>
          <p>{student.approvedSubjects}</p>
          <p>{student.approvedCredits}</p>
          <p>{student.requiredCredits}</p>
          <p>{student.cultCredits}</p>
          <p>{student.sportsCredits}</p>
          <p>{student.kardexGrade}</p>
          <p>{student.periodGrade}</p>
          <p>{student.droppedSubjects}</p>
          <p>{student.failedSubjects}</p>
          <p>{student.creditedSubjects}</p>
          <p>{student.thirdEnrolledSubjects}</p>
          JSON
          <pre>{JSON.stringify(student, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

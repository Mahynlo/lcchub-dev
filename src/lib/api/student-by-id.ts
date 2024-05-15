import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { Student } from "@/lib/types";

export async function getStudentById(id: string) {
  const studentRef = doc(db, "students", id);
  const studentSnap = await getDoc(studentRef);
  console.log(studentSnap);
  if (studentSnap.exists()) {
    const student = studentSnap.data() as Student;
    return student;
  } else {
    return null;
  }
}

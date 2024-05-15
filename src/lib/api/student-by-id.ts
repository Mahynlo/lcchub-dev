import {
    doc,
    getDoc,
  } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

export async function getStudentById(id: string) {
    const studentRef = doc(db, "students", id);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
        return studentSnap.data();
    } else {
        return null;
    }
}
"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { CurriculumMap, Subject } from "@/lib/types";
import { unstable_cache } from "next/cache";

export async function getCurriculumMaps(key: string) {
  const docRef = doc(db, "curriculumMaps", key);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const curriculumMap = docSnap.data() as CurriculumMap;
    return curriculumMap;
  } else {
    return null;
  }
}

const getSubjectInfo = unstable_cache(async (subjectKey: string) => {
  const docRef = doc(db, "subjects", subjectKey);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const subject = docSnap.data() as Subject;
    return subject;
  } else {
    return null;
  }
});

export async function cacheSubjectInfo(program: string[]) {
  const cache = new Map<string, Subject>();
  for (const semester of program) {
    const subjectKeys = semester.split("-");
    for (const subjectKey of subjectKeys) {
      if (!cache.has(subjectKey)) {
        const subject = await getSubjectInfo(subjectKey);
        if (subject) {
          cache.set(subjectKey, subject);
        }
      }
    }
  }
  return cache;
}

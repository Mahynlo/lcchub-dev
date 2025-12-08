"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { CurriculumMap, Subject } from "@/lib/types";
import { unstable_cache } from "next/cache";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";

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
  }},
  ["subject-info"],
  {
    revalidate: false,
  }
);

export async function cacheSubjectInfo(program: string[]) {
  const cache = new Map<string, Subject>();
  const errors: string[] = [];
  
  for (const semester of program) {
    const subjectKeys = semester.split("-")
      .filter(key => key.trim())
      .map(normalizeSubjectKey);  // ✅ Normalizar cada key
    
    for (const subjectKey of subjectKeys) {
      if (!cache.has(subjectKey)) {
        const subject = await getSubjectInfo(subjectKey);
        if (subject) {
          cache.set(subjectKey, subject);
        } else {
          errors.push(subjectKey);
        }
      }
    }
  }
  
  if (errors.length > 0) {
    console.warn(`[SubjectCache] Failed to load ${errors.length} subjects:`, errors);
  }
  
  console.log(`[SubjectCache] Loaded ${cache.size} subjects`);
  return cache;
}

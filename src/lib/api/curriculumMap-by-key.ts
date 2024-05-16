import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { CurriculumMap } from "@/lib/types";

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
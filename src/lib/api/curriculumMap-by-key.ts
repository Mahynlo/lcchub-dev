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
  }
},
  ["subject-info"],
  {
    revalidate: false,
  }
);

export async function cacheSubjectInfo(program: string[]) {
  const cache = new Map<string, Subject>();
  const errors: string[] = [];
  const visited = new Set<string>(); // Evitar ciclos infinitos en dependencias
  
  // Función recursiva para descargar un lote de materias en paralelo
  const fetchBatch = async (keysToFetch: string[]) => {
    // Filtrar las que ya visitamos o ya tenemos en cache
    const uniqueKeys = Array.from(new Set(keysToFetch)).filter(
      key => key.trim() !== "" && !visited.has(key) && !cache.has(key)
    );
    
    if (uniqueKeys.length === 0) return;
    
    // Marcar como visitadas antes de lanzar la promesa para evitar re-entradas asíncronas
    uniqueKeys.forEach(k => visited.add(k));

    // Lanzar descargas simultáneas en paralelo
    const results = await Promise.allSettled(
      uniqueKeys.map(key => getSubjectInfo(key).then(subj => ({ key, subj })))
    );

    const nextBatch: string[] = [];

    // Procesar resultados
    for (const result of results) {
      if (result.status === "fulfilled") {
        const { key, subj } = result.value;
        if (subj) {
          cache.set(key, subj);

          // Encolar pre-requisitos
          if (subj.requirements && !subj.requirements.toLowerCase().includes("creditos")) {
            const reqs = subj.requirements.split("-").map(normalizeSubjectKey);
            nextBatch.push(...reqs);
          }

          // Encolar liberaciones
          if (subj.releases) {
            const rels = subj.releases.split("-").map(normalizeSubjectKey);
            nextBatch.push(...rels);
          }
        } else {
          errors.push(key);
        }
      } else {
        errors.push("Failed promise");
      }
    }

    // Recursividad paralela para la siguiente "capa" de dependencias
    if (nextBatch.length > 0) {
      await fetchBatch(nextBatch);
    }
  };

  // 1. Extraer todas las claves iniciales del mapa de semestres
  const initialKeys: string[] = [];
  for (const semester of program) {
    const subjectKeys = semester.split("-").map(normalizeSubjectKey);
    initialKeys.push(...subjectKeys);
  }

  // 2. Ejecutar la descarga en ráfaga (Batching Paralelo)
  await fetchBatch(initialKeys);

  if (errors.length > 0) {
    console.warn(`[SubjectCache] Failed to load ${errors.length} subjects:`, errors);
  }

  console.log(`[SubjectCache] Loaded ${cache.size} subjects in parallel`);
  return cache;
}

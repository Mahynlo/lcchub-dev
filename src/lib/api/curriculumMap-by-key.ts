"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { CurriculumMap, Subject } from "@/lib/types";
import { unstable_cache } from "next/cache";

export async function getCurriculumMaps(key: string) {
    const docRef = doc(db, "curriculumMaps", key);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if (docSnap.exists()) {
        const curriculumMap = docSnap.data() as CurriculumMap;
        return curriculumMap;
    } else {
        return null;
    }
  }
// async function getSubjectInfo(subjectKey: string) {
//     const docRef = doc(db, "subjects", subjectKey);
//     const docSnap = await getDoc(docRef);
//     console.log(docSnap);
//     if (docSnap.exists()) {
//         const subject = docSnap.data() as Subject;
//         return subject;
//     } else {
//         return null;
//     }
// }
//cache subject info
// unstable_cache

// unstable_cache allows you to cache the results of expensive operations, like database queries, and reuse them across multiple requests.

// import { getUser } from './data';
// import { unstable_cache } from 'next/cache';
 
// const getCachedUser = unstable_cache(
//   async (id) => getUser(id),
//   ['my-app-user']
// );
 
// export default async function Component({ userID }) {
//   const user = await getCachedUser(userID);
//   ...
// }

//     Good to know:

//         Accessing dynamic data sources such as headers or cookies inside a cache scope is not supported. If you need this data inside a cached function use headers outside of the cached function and pass the required dynamic data in as an argument.
//         This API uses Next.js' built-in Data Cache to persist the result across requests and deployments.

//     Warning: This API is unstable and may change in the future. We will provide migration documentation and codemods, if needed, as this API stabilizes.

// Parameters

// const data = unstable_cache(fetchData, keyParts, options)()

//     fetchData: This is an asynchronous function that fetches the data you want to cache. It must be a function that returns a Promise.
//     keyParts: This is an array that identifies the cached key. It must contain globally unique values that together identify the key of the data being cached. The cache key also includes the arguments passed to the function.
//     options: This is an object that controls how the cache behaves. It can contain the following properties:
//         tags: An array of tags that can be used to control cache invalidation.
//         revalidate: The number of seconds after which the cache should be revalidated. Omit or pass false to cache indefinitely or until matching revalidateTag() or revalidatePath() methods are called.

// Returns

// unstable_cache returns a function that when invoked, returns a Promise that resolves to the cached data. If the data is not in the cache, the provided function will be invoked, and its result will be cached and returned.

// cache getSubjectInfo, individual subjects

//  incrementalCache missing
const getSubjectInfo = unstable_cache(
    async (subjectKey: string) => {
        const docRef = doc(db, "subjects", subjectKey);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (docSnap.exists()) {
            const subject = docSnap.data() as Subject;
            return subject;
        } else {
            return null;
        }
    }

);    

export async function cacheSubjectInfo(program: string[]) {
    const cache = new Map<string, Subject>();
    console.log("PROGRAM", program);
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
    console.log("CACHE", cache)
    return cache;
}
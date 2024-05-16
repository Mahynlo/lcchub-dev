"use client";

import { Subject, CurriculumMap, Student } from "@/lib/types";
import { StudentInfoContext } from "../layout";
import { useContext } from "react";

export default function Page() {
  const student = useContext(StudentInfoContext);
  return (
    <div>
      <h1>Mapa interactivo</h1>
    </div>
  );
}

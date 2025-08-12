import { Student } from "@/lib/types";
import { createContext } from "react";

export const StudentInfoContext = createContext<Student | null>(null);

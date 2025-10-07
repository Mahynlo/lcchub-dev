import { createContext } from "react";

export type Event = {
  title: string;
  shdesc: string;
  desc: string;
  location: string;
  date: Date;
  approved_by: string;
  from_community: boolean;
};

export type SoyLCCVideo = {
  title: string;
  desc: string;
  thumbnail: string;
  redirect: string;
};

export type ProyectOffering = {
  proyect_title: string;
  company: string;
  readmore_manual: string;
  readmore_img: string;
  readmore_redirect: string;
  issued: Date;
};

export type AnunciosYNoticias = {
  title: string;
  desc: string;
  thumbnail: string;
  redirect: string;
  issued: Date;        // fecha de publicación
  eventStart?: Date;   // fecha de inicio del evento (opcional)
  eventEnd?: Date;     // fecha de fin del evento (opcional)
  tag: "evento" | "convocatoria" | "noticia" | "general" | "platicas" | "taller";
};

export type Student = {
  programKey: string;
  approvedCredits: number;
  approvedSubjects: number;
  creditedSubjects: string;
  cultCredits: number;
  droppedSubjects: string;
  email: string;
  enrolledCredits: number;
  enrolledSubjects: string;
  failedSubjects: string;
  kardexGrade: number;
  levelAndCycleEnglish: string;
  name: string;
  periodGrade: number;
  programName: string;
  requiredCredits: number;
  sportsCredits: number;
  studentStatus: string;
  studyPlan: string;
  thirdEnrolledSubjects: string;
  studentID: string;
};

export type Subject = {
  academicDivision: string;
  branch: string;
  credits: string; // Yeah. This is from the db ...
  department: string;
  labHours: string;
  releases: string;
  requirements: string;
  subjectKey: string;
  subjectName: string;
  theoryHours: string;
  tracklistSubject: string[];
  workshopHours: string;
  abbr?: string;
  detalles?: string;
  opciones?: Opcion[];
  page?: string;
};
export type Detalle = {
  periodo?: string;
  creditos: string;
};

export type Opcion = {
  nombre: string;
  detalles: Detalle[];
};

export type CurriculumMap = {
  basicCredits: number;
  commonCredits: number;
  electiveCredits: number;
  integratorSubjects: string;
  map: number;
  obligatoryCredits: number;
  professionalCredits: number;
  selectiveSubjects: string;
  semesters: string[];
  specialistCredits: number;
  integratorCredits: number;
  totalCredits: number;
  specialistSubjects: string;
  Optativas: string;
  vocationalCredits: number;
};

type SubjectShowContext = {
  showAll: boolean;
  showSubject: Map<string, boolean>;
  setShowAll?: (showAll: boolean) => void;
  filterOption: string;
  setFilterOption: (filterOption: string) => void;
};

export const SubjectShowContext = createContext<SubjectShowContext | null>(
  null,
);

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
  excerpt: string;
  thumbnail: string;
  redirect: string;
  issued: Date;        // fecha de publicación
  eventEnd?: Date;     // fecha de fin del evento (opcional)
  tag: "evento" | "convocatoria" | "noticia" | "general" | "platicas" | "taller";
};

// Tipos compartidos para la galería
export type GalleryItem = {
  id?: number;
  images: string[];  // galería del evento
  title: string;
  description: string;
  date: string;
  tag: "evento" | "convocatoria" | "noticia" | "general" | "platicas" | "taller";
};

export type ViewMode = "cards" | "collage";

// Tipos para el contenido enriquecido de Strapi
export type RichTextNode = {
  type: "paragraph" | "heading" | "list" | "quote" | "code" | "image";
  children?: RichTextChild[];
  level?: number; // para headings (1-6)
  format?: "ordered" | "unordered"; // para listas
  image?: {
    name: string;
    alternativeText: string;
    url: string;
    caption: string | null;
    width: number;
    height: number;
    formats?: any;
  };
};

export type RichTextChild = {
  type: "text" | "link";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string; // para links
  children?: RichTextChild[]; // para links que contienen texto
};

export type BlogPost = {
  id: string;
  title: string;
  author?: string;
  content: RichTextNode[]; // Contenido enriquecido de Strapi
  excerpt: string;
  thumbnail?: string;
  issued: Date;        // fecha de publicación
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
  selectedSubject?: string | null;
  setSelectedSubject?: (subject: string | null) => void;
};

export const SubjectShowContext = createContext<SubjectShowContext | null>(
  null,
);

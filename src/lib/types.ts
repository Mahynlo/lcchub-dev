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
  thirdEnrolledSubjects: string;
};
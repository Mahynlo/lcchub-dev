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
}
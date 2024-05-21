import { ProyectOffering } from "../types";

const baseUrl = "http://localhost:1337";
export async function getAllProyectOfferings() {
  try {
    const response = await fetch(
      baseUrl + "/api/proyect-opportunities?populate=*",
    );
    const strapiData = await response.json();
    const data: ProyectOffering[] = strapiData.data.map((proyect: any) => ({
      proyect_title: proyect.attributes.proyect_title,
      company: proyect.attributes.company,
      issued: new Date(proyect.attributes.issued),
      readmore_manual: proyect.attributes.readmore_manual,
      readmore_redirect: proyect.attributes.readmore_redirect,
      readmore_img: proyect.attributes.readmore_img.data
        ? baseUrl + proyect.attributes.readmore_img.data.attributes.url
        : "",
    }));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

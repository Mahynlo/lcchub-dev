import { AnunciosYNoticias } from "../types";

const baseUrl = "http://localhost:1337";

export async function getAllAnuncios() {
  try {
    const response = await fetch(baseUrl + "/api/anuncio-y-noticia?populate=*");
    const strapiData = await response.json();

    const data: AnunciosYNoticias[] = strapiData.data.map((item: any) => ({
      title: item.attributes.title,
      desc: item.attributes.desc,
      redirect: item.attributes.redirect,
      thumbnail: item.attributes.thumbnail?.data
        ? baseUrl + item.attributes.thumbnail.data.attributes.url
        : "",
      issued: new Date(item.attributes.issued),
      eventStart: new Date(item.attributes.eventStart),
      eventEnd: new Date(item.attributes.eventEnd),
      tag: item.attributes.tag,
    }));

    return data;
  } catch (error) {
    console.error("Error fetching anuncios:", error);
    return [];
  }
}
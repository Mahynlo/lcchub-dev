import { SoyLCCVideo } from "../types";

const baseUrl = "http://localhost:1337";
export async function getAllSoyLCCVideos() {
  try {
    const response = await fetch(baseUrl + "/api/soy-lcc-videos?populate=*");
    const strapiData = await response.json();
    const data: SoyLCCVideo[] = strapiData.data.map((video: any) => ({
      title: video.attributes.title,
      desc: video.attributes.desc,
      redirect: video.attributes.redirect,
      thumbnail: video.attributes.thumbnail.data
        ? baseUrl + video.attributes.thumbnail.data.attributes.url
        : "",
    }));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

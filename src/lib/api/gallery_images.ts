import { GalleryItem } from "../types";

const baseUrl = "http://localhost:1337";

export async function getGalleryImages() {
  try {
    const response = await fetch(baseUrl + "/api/galleries?populate=*", {
      cache: "no-store",
    });
    const strapiData = await response.json();

    const data: GalleryItem[] = strapiData.data.map((item: any) => {
      // Extraer las imágenes del array de media
      const images = item.attributes.images?.data
        ? item.attributes.images.data.map(
            (img: any) => baseUrl + img.attributes.url
          )
        : [];

      return {
        title: item.attributes.title,
        description: item.attributes.description || "",
        date: item.attributes.date || new Date().toISOString(),
        tag: item.attributes.tag || "general",
        images: images,
      };
    });

    // Ordenar por fecha más reciente primero
    const sortedData = data.sort(
      (a: GalleryItem, b: GalleryItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedData;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

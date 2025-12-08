import { AnunciosYNoticias } from "../types";

// Usar variable de entorno en lugar de hardcodear URL
const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getAllAnuncios(): Promise<AnunciosYNoticias[]> {
  try {
    // OPCIONES DE CACHÉ:
    // 1. { next: { revalidate: 60 } } - Revalida cada 60 segundos
    // 2. { next: { revalidate: 300 } } - Revalida cada 5 minutos (recomendado para anuncios)
    // 3. { cache: 'no-store' } - Sin caché, siempre fresco
    const response = await fetch(baseUrl + "/api/anuncio-y-noticia?populate=*", {
      cache: 'no-store', // ✅ SIN CACHÉ - Cambios inmediatos (usa esto para desarrollo)
      // next: { revalidate: 300 }, // Descomentar para producción
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch anuncios: ${response.status} - ${errorText}`);
    }

    const strapiData = await response.json();

    // Validar que strapiData.data existe y es un array
    if (!strapiData.data || !Array.isArray(strapiData.data)) {
      console.warn("Invalid anuncios data structure from Strapi", strapiData);
      return [];
    }

    const data: AnunciosYNoticias[] = strapiData.data.map((item: any) => ({
      title: item.attributes.title,
      excerpt: item.attributes.excerpt, // Cambiado de 'desc' a 'excerpt'
      redirect: item.attributes.redirect,
      thumbnail: item.attributes.thumbnail?.data
        ? baseUrl + item.attributes.thumbnail.data.attributes.url
        : "",
      issued: new Date(item.attributes.issued), // Fecha de publicación
      eventEnd: item.attributes.eventEnd ? new Date(item.attributes.eventEnd) : undefined, // Fecha de fin (opcional)
      tag: item.attributes.tag,
    }));

    return data;
  } catch (error) {
    console.error("[Anuncios API] Error fetching anuncios:", error);
    return [];
  }
}
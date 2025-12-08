import { BlogPost } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    // OPCIONES DE CACHÉ:
    // 1. { next: { revalidate: 60 } } - Revalida cada 60 segundos (actual)
    // 2. { next: { revalidate: 0 } } - Sin caché, siempre fresco
    // 3. { cache: 'no-store' } - Nunca cachea, siempre hace fetch al backend
    // 4. { next: { revalidate: 3600 } } - Revalida cada hora
    const response = await fetch(`${baseUrl}/api/blogs?populate=*`, {
      cache: 'no-store', // ✅ SIN CACHÉ - Cambios inmediatos (usa esto para desarrollo)
      // next: { revalidate: 60 }, // Descomentar para producción
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch blogs: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Validar que data.data existe y es un array
    if (!data.data || !Array.isArray(data.data)) {
      console.warn("Invalid blog data structure from Strapi", data);
      return [];
    }

    return data.data.map((item: any) => ({
      id: item.id.toString(),
      title: item.attributes.title,
      author: item.attributes.author,
      content: item.attributes.content, // Array de RichTextNode de Strapi
      excerpt: item.attributes.excerpt,
      thumbnail: item.attributes.thumbnail?.data?.attributes?.url
        ? `${baseUrl}${item.attributes.thumbnail.data.attributes.url}`
        : undefined,
      issued: new Date(item.attributes.issued), // Fecha de publicación
      eventEnd: item.attributes.eventEnd ? new Date(item.attributes.eventEnd) : undefined, // Fecha de fin (opcional)
      tag: item.attributes.tag || "general",
    }));
  } catch (error) {
    console.error("[Blog API] Error fetching all blogs:", error);
    // En producción, podrías querer lanzar el error para que la página de error lo maneje
    // throw error;
    return [];
  }
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  try {
    // OPCIONES DE CACHÉ:
    // 1. { next: { revalidate: 60 } } - Revalida cada 60 segundos (actual)
    // 2. { next: { revalidate: 0 } } - Sin caché, siempre fresco
    // 3. { cache: 'no-store' } - Nunca cachea, siempre hace fetch al backend
    // 4. { next: { revalidate: 3600 } } - Revalida cada hora
    const response = await fetch(`${baseUrl}/api/blogs/${id}?populate=*`, {
      cache: 'no-store', // ✅ SIN CACHÉ - Cambios inmediatos (usa esto para desarrollo)
      // next: { revalidate: 60 }, // Descomentar para producción
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Blog no encontrado
      }
      const errorText = await response.text();
      throw new Error(`Failed to fetch blog: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const item = data.data;

    // Validar que el blog existe
    if (!item || !item.attributes) {
      console.warn("Invalid blog data structure from Strapi", data);
      return null;
    }

    return {
      id: item.id.toString(),
      title: item.attributes.title,
      author: item.attributes.author,
      content: item.attributes.content, // Array de RichTextNode de Strapi
      excerpt: item.attributes.excerpt,
      thumbnail: item.attributes.thumbnail?.data?.attributes?.url
        ? `${baseUrl}${item.attributes.thumbnail.data.attributes.url}`
        : undefined,
      issued: new Date(item.attributes.issued), // Fecha de publicación
      eventEnd: item.attributes.eventEnd ? new Date(item.attributes.eventEnd) : undefined, // Fecha de fin (opcional)
      tag: item.attributes.tag || "general",
    };
  } catch (error) {
    console.error(`[Blog API] Error fetching blog with id ${id}:`, error);
    return null;
  }
}

export function filterBlogsByTag(blogs: BlogPost[], tag?: string): BlogPost[] {
  if (!tag || tag === "todos") {
    return blogs;
  }
  return blogs.filter((blog) => blog.tag === tag);
}

export function searchBlogsByDate(blogs: BlogPost[], startDate?: Date, endDate?: Date): BlogPost[] {
  if (!startDate && !endDate) {
    return blogs;
  }

  return blogs.filter((blog) => {
    const blogDate = new Date(blog.issued); // Cambiado de publishedDate a issued
    
    if (startDate && endDate) {
      return blogDate >= startDate && blogDate <= endDate;
    } else if (startDate) {
      return blogDate >= startDate;
    } else if (endDate) {
      return blogDate <= endDate;
    }
    
    return true;
  });
}

export function sortBlogsByDate(blogs: BlogPost[], order: "asc" | "desc" = "desc"): BlogPost[] {
  return [...blogs].sort((a, b) => {
    const dateA = new Date(a.issued).getTime(); // Cambiado de publishedDate a issued
    const dateB = new Date(b.issued).getTime(); // Cambiado de publishedDate a issued
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/api/blog";
import { BlogFiltersClient } from "@/components/ui/home/blog/blog-filters-client";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Anuncios y noticias LCC",
  description: "Noticias, eventos, talleres y más de la comunidad LCC",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div>
      {/* Header de la página */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10 text-center">
          <span className="bg-[#CC2146] rounded-lg text-2xl md:text-3xl font-bold text-slate-50 px-4 py-1">
            Anuncios y noticias LCC
          </span>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Noticias, eventos, talleres y más de la comunidad LCC
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-2 md:px-6 py-8">
        <BlogFiltersClient initialBlogs={blogs} />
      </div>
    </div>
  );
}

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
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      {/* Header */}
      <div className="mb-6 md:mb-8 text-center">
        <div className="">
          <span className="bg-[#CC2146] rounded-lg text-2xl md:text-3xl font-bold text-slate-50 px-4 py-1">
            Anuncios y noticias LCC
          </span>
        </div>
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Noticias, eventos, talleres y más de la comunidad LCC
        </p>
      </div>

      <Separator className="mb-6 md:mb-8" />

      {/* Layout con sidebar */}
      <BlogFiltersClient initialBlogs={blogs} />
    </div>
  );
}

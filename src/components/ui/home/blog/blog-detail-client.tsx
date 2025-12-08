"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { RichTextRenderer } from "./rich-text-renderer";
import { tagColors } from "@/lib/constants/tags";

interface BlogDetailClientProps {
  blog: BlogPost;
}

export const BlogDetailClient = memo(function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/home/blog");
  }, [router]);

  return (
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      {/* Botón volver */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="mb-4 md:mb-6 text-xs md:text-sm"
      >
        <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
        Volver al anuncios y noticias
      </Button>

      {/* Contenido del blog */}
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <Badge className={`${tagColors[blog.tag]} text-white mb-3 md:mb-4 text-xs md:text-sm`}>
            {blog.tag}
          </Badge>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
            {blog.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-3 w-3 md:h-4 md:w-4" />
                <span>{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span>{format(new Date(blog.issued), "PPP", { locale: es })}</span>
            </div>
          </div>
        </div>

        <Separator className="mb-4 md:mb-6" />

        {/* Imagen principal (si existe) */}
        {blog.thumbnail && (
          <div className="relative w-full h-48 md:h-64 lg:h-96 mb-6 md:mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Contenido enriquecido */}
        <RichTextRenderer content={blog.content} />
      </article>
    </div>
  );
});

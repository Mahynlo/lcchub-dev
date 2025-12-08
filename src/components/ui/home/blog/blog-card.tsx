import { memo } from "react";
import { BlogPost } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";
import { tagColors, tagLabels } from "@/lib/constants/tags";

interface BlogCardProps {
  blog: BlogPost;
}

export const BlogCard = memo(function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/home/blog/${blog.id}`}>
      <Card className="h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
        
        {/* Fecha con ícono */}
        <div className="flex items-center gap-2 px-4 pt-4 text-sm">
          <CalendarDays className={`w-6 h-6 ${tagColors[blog.tag].replace('bg-', 'text-')}`} />
          Publicado:
          <span className="text-gray-500">
            {format(new Date(blog.issued), "d 'de' MMMM, yyyy", { locale: es })}
          </span>
        </div>

        {/* Imagen con aspect ratio y tag en esquina */}
        <CardHeader className="px-0 pt-2 relative">
          {blog.thumbnail ? (
            <div className="relative w-full aspect-[16/9] bg-gray-100">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-t-lg"
              />
              <Badge className={`absolute top-2 right-2 text-xs ${tagColors[blog.tag]} text-white`}>
                {tagLabels[blog.tag]}
              </Badge>
            </div>
          ) : (
            <div className="relative w-full aspect-[16/9] bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sin imagen</span>
              <Badge className={`absolute top-2 right-2 text-xs ${tagColors[blog.tag]} text-white`}>
                {tagLabels[blog.tag]}
              </Badge>
            </div>
          )}
        </CardHeader>

        {/* Título y descripción */}
        <CardContent>
          <CardTitle className="text-xl font-bold line-clamp-2">
            {blog.title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            {blog.excerpt || "Sin descripción disponible"}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
});

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { BlogPost } from "@/lib/types";
import { filterBlogsByTag, searchBlogsByDate, sortBlogsByDate } from "@/lib/api/blog";
import { BlogCard } from "@/components/ui/home/blog/blog-card";
import { BlogFilters } from "@/components/ui/home/blog/blog-filters";

interface BlogFiltersClientProps {
  initialBlogs: BlogPost[];
}

export function BlogFiltersClient({ initialBlogs }: BlogFiltersClientProps) {
  // Estados de filtros
  const [selectedTag, setSelectedTag] = useState("todos");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  // Memoizar el resultado del filtrado para evitar recálculos innecesarios
  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];
    
    // Filtrar por tag
    result = filterBlogsByTag(result, selectedTag);
    
    // Filtrar por fecha
    result = searchBlogsByDate(result, startDate, endDate);
    
    // Ordenar por fecha (más recientes primero)
    result = sortBlogsByDate(result, "desc");
    
    return result;
  }, [initialBlogs, selectedTag, startDate, endDate]);

  const handleClearFilters = useCallback(() => {
    setSelectedTag("todos");
    setStartDate(undefined);
    setEndDate(undefined);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Sidebar izquierdo - Filtros */}
      <aside className="lg:w-64 lg:flex-shrink-0">
        <div className="lg:sticky lg:top-24">
          <BlogFilters
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onClearFilters={handleClearFilters}
          />
        </div>
      </aside>

      {/* Contenido principal - Grid de blogs */}
      <main className="flex-1 min-w-0">
        {filteredBlogs.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="text-gray-400 text-5xl mb-4">📝</div>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                No se encontraron anuncios y noticias que coincidan con los filtros aplicados.
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Intenta con diferentes filtros
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              Mostrando {filteredBlogs.length} {filteredBlogs.length === 1 ? "blog" : "blogs"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

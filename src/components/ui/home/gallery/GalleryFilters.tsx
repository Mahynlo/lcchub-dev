import { Button } from "@/components/ui/button";
import { ViewMode } from "@/lib/types";

interface GalleryFiltersProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filterYear: string;
  setFilterYear: (year: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  years: string[];
}

export function GalleryFilters({
  viewMode,
  setViewMode,
  filterYear,
  setFilterYear,
  filterType,
  setFilterType,
  years,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
      <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
        <Button
          variant={viewMode === "collage" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("collage")}
          className="gap-2"
        >
          <span>🖼️</span>
          Todas las imagenes
        </Button>
        <Button
          variant={viewMode === "cards" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("cards")}
          className="gap-2"
        >
          <span>🃏</span>
          Colecciones
        </Button>
      </div>

      <select
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">Todos los años</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">Todos los tipos</option>
        <option value="evento">Evento</option>
        <option value="convocatoria">Convocatoria</option>
        <option value="noticia">Noticia</option>
        <option value="general">General</option>
        <option value="platicas">Pláticas</option>
        <option value="taller">Taller</option>
      </select>
    </div>
  );
}

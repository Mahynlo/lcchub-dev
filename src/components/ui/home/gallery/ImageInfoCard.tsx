import { GalleryItem } from "@/lib/types";
import { Months } from "@/lib/utils";
import { tagColors, tagLabels } from "@/lib/constants/tags";

interface ImageInfoCardProps {
  item: GalleryItem;
  isDescriptionExpanded: boolean;
  onToggleDescription: () => void;
}

// Formatear fecha de ISO a formato legible en español
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = Months[date.getMonth()].toLowerCase();
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function ImageInfoCard({ 
  item, 
  isDescriptionExpanded, 
  onToggleDescription 
}: ImageInfoCardProps) {
  return (
    <div className="absolute top-3 left-3 z-20 bg-black/80 backdrop-blur-md text-white rounded-lg shadow-2xl max-w-[320px] sm:max-w-[400px] overflow-hidden border border-white/10">
      <div className="p-3 sm:p-4">
        {/* Título */}
        <h3 className="text-base sm:text-lg font-bold mb-2 leading-tight">
          {item.title}
        </h3>

        {/* Botón para mostrar/ocultar detalles */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleDescription();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-300 hover:text-blue-200 transition-colors font-medium"
        >
          {isDescriptionExpanded ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Ver menos
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Ver más
            </>
          )}
        </button>

        {/* Contenido expandible: Tag, Fecha y Descripción */}
        {isDescriptionExpanded && (
          <div className="mt-3 pt-3 border-t border-white/30 space-y-3">
            {/* Tipo y fecha */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-block text-white text-xs sm:text-sm px-2.5 py-1 rounded-md font-semibold uppercase tracking-wide ${
                tagColors[item.tag] || "bg-gray-500"
              }`}>
                {tagLabels[item.tag] || item.tag}
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium">
                📅 {formatDate(item.date)}
              </span>
            </div>
            
            {/* Descripción */}
            <p className="text-xs sm:text-sm leading-relaxed text-white/90">
              {item.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

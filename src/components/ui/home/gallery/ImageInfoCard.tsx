import { GalleryItem } from "@/lib/types";

interface ImageInfoCardProps {
  item: GalleryItem;
  isDescriptionExpanded: boolean;
  onToggleDescription: () => void;
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

        {/* Tipo y fecha */}
        <div className="flex items-center gap-2">
          <span className="inline-block bg-blue-500 text-white text-xs sm:text-sm px-2.5 py-1 rounded-md font-semibold uppercase tracking-wide">
            {item.tag}
          </span>
          <span className="text-xs sm:text-sm text-white/90 font-medium">
            📅 {item.date}
          </span>
        </div>

        {/* Botón para mostrar/ocultar descripción */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleDescription();
          }}
          className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-blue-300 hover:text-blue-200 transition-colors font-medium"
        >
          {isDescriptionExpanded ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              Ocultar descripción
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ver descripción
            </>
          )}
        </button>

        {/* Descripción expandible */}
        {isDescriptionExpanded && (
          <div className="mt-3 pt-3 border-t border-white/30">
            <p className="text-xs sm:text-sm leading-relaxed text-white/90">
              {item.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

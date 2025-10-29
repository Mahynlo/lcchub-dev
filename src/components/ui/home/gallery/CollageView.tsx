import Image from "next/image";
import { GalleryItem } from "@/lib/types";

interface CollageViewProps {
  images: GalleryItem[];
  onImageClick: (eventIndex: number, imageIndex: number) => void;
}

// Tipo para imagen expandida con referencia al evento original
type ExpandedImage = {
  src: string;
  eventIndex: number;
  imageIndex: number;
  event: GalleryItem;
};

// Expandir todas las imágenes de todos los eventos
const expandAllImages = (events: GalleryItem[]): ExpandedImage[] => {
  const expanded: ExpandedImage[] = [];
  events.forEach((event, eventIndex) => {
    if (event.images && event.images.length > 0) {
      event.images.forEach((imageSrc, imageIndex) => {
        expanded.push({
          src: imageSrc,
          eventIndex,
          imageIndex,
          event,
        });
      });
    }
  });
  return expanded;
};

// Distribuir imágenes en columnas para el collage
const distributeInColumns = (images: ExpandedImage[], numColumns: number) => {
  const columns: ExpandedImage[][] = Array.from({ length: numColumns }, () => []);
  images.forEach((img, index) => {
    columns[index % numColumns].push(img);
  });
  return columns;
};

export function CollageView({ images, onImageClick }: CollageViewProps) {
  // Expandir todas las imágenes
  const allImages = expandAllImages(images);
  
  const collageColumnsMobile = distributeInColumns(allImages, 2); // 2 columnas para móvil
  const collageColumnsTablet = distributeInColumns(allImages, 3); // 3 columnas para tablet (md)
  const collageColumnsDesktop = distributeInColumns(allImages, 4); // 4 columnas para desktop (lg)

  const renderColumns = (columns: ExpandedImage[][]) => {
    return columns.map((column, colIndex) => (
      <div key={colIndex} className="flex-1 min-w-[calc(50%-4px)] sm:min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-8px)] lg:min-w-[calc(25%-8px)] flex flex-col gap-2">
        {column.map((expandedImg, idx) => (
          <div 
            key={`${expandedImg.eventIndex}-${expandedImg.imageIndex}`}
            className="relative w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
            onClick={() => onImageClick(expandedImg.eventIndex, expandedImg.imageIndex)}
          >
            <Image
              src={expandedImg.src}
              alt={expandedImg.event.title}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-end justify-start p-2 text-white text-xs sm:text-sm opacity-0 hover:opacity-100 transition-opacity">
              <div>
                <p className="font-semibold mb-0.5">{expandedImg.event.title}</p>
                <p className="text-[10px] sm:text-xs opacity-90 line-clamp-1">{expandedImg.event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <>
      {/* Vista móvil (< md): 2 columnas */}
      <div className="flex md:hidden flex-wrap gap-1 sm:gap-2">
        {renderColumns(collageColumnsMobile)}
      </div>

      {/* Vista tablet (md - lg): 3 columnas */}
      <div className="hidden md:flex lg:hidden flex-wrap gap-2">
        {renderColumns(collageColumnsTablet)}
      </div>

      {/* Vista desktop (>= lg): 4 columnas */}
      <div className="hidden lg:flex flex-wrap gap-2">
        {renderColumns(collageColumnsDesktop)}
      </div>
    </>
  );
}

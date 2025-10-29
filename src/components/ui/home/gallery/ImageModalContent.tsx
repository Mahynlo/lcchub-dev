import Image from "next/image";
import { DialogClose } from "@/components/ui/dialog";
import { GalleryItem } from "@/lib/types";
import { ImageInfoCard } from "./ImageInfoCard";

interface ImageModalContentProps {
  item: GalleryItem;
  currentImageSrc: string;
  currentIndex: number;
  totalImages: number;
  zoom: number;
  position: { x: number; y: number };
  isDragging: boolean;
  isDescriptionExpanded: boolean;
  onToggleDescription: () => void;
  onNext: () => void;
  onPrev: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onWheel: (e: React.WheelEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export function ImageModalContent({
  item,
  currentImageSrc,
  currentIndex,
  totalImages,
  zoom,
  position,
  isDragging,
  isDescriptionExpanded,
  onToggleDescription,
  onNext,
  onPrev,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: ImageModalContentProps) {
  return (
    <div className="relative w-full h-[80vh] sm:h-[85vh]">
      {/* Botón cerrar en la esquina superior derecha */}
      <DialogClose className="absolute top-3 right-3 z-30 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-sm transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </DialogClose>

      {/* Card de información del evento actual */}
      <ImageInfoCard
        item={item}
        isDescriptionExpanded={isDescriptionExpanded}
        onToggleDescription={onToggleDescription}
      />

      {/* Área de la imagen */}
      <div 
        className="relative w-full h-full flex items-center justify-center bg-black/90 overflow-hidden select-none group"
        style={{ cursor: zoom !== 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Botón Anterior */}
        {totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 sm:w-6 sm:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Botón Siguiente */}
        {totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Imagen siguiente"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 sm:w-6 sm:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Indicador de posición */}
        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold shadow-lg z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            {currentIndex + 1} / {totalImages}
          </div>
        )}

        {/* Controles de zoom */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-black/75 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onZoomOut();
            }}
            className="text-white hover:text-blue-400 transition-colors p-1"
            aria-label="Reducir zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
            </svg>
          </button>
          <span className="text-white text-xs font-mono min-w-[45px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onZoomIn();
            }}
            className="text-white hover:text-blue-400 transition-colors p-1"
            aria-label="Aumentar zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </button>
          {zoom !== 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onZoomReset();
              }}
              className="text-white hover:text-blue-400 transition-colors text-xs px-2"
              aria-label="Resetear zoom"
            >
              1:1
            </button>
          )}
        </div>

        {/* Imagen con zoom y pan */}
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <Image
            key={currentImageSrc}
            src={currentImageSrc}
            alt={item.description}
            width={1200}
            height={900}
            className="object-contain pointer-events-none max-h-[80vh]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

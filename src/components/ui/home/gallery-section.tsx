"use client";

import { useState, useMemo } from "react";
import { ViewMode, GalleryItem } from "@/lib/types";
import { GalleryFilters } from "./gallery/GalleryFilters";
import { CollageView } from "./gallery/CollageView";
import { CardsView } from "./gallery/CardsView";
import { ImageModal } from "./gallery/ImageModal";
import { useZoomControls } from "./gallery/useZoomControls";

// Tipo para imagen expandida con referencia al evento
type FlatImage = {
  src: string;
  event: GalleryItem;
};

interface GallerySectionProps {
  galleryImages: GalleryItem[];
}

export function GallerySection({ galleryImages }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [filterYear, setFilterYear] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("collage");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const zoomControls = useZoomControls();

  // Filtrar eventos
  const filteredEvents = galleryImages.filter((img) => {
    const matchesYear = filterYear === "All" || img.date.startsWith(filterYear);
    const matchesType = filterType === "All" || img.tag === filterType;
    return matchesYear && matchesType;
  });

  // Crear array plano de TODAS las imágenes individuales
  const flatImages = useMemo(() => {
    const flat: FlatImage[] = [];
    filteredEvents.forEach((event) => {
      if (event.images && event.images.length > 0) {
        event.images.forEach((imageSrc) => {
          flat.push({
            src: imageSrc,
            event: event,
          });
        });
      }
    });
    return flat;
  }, [filteredEvents]);

  const years = Array.from(new Set(galleryImages.map((img) => img.date.slice(0, 4))));

  // Click desde CardsView (eventos agrupados) - abre en la primera imagen del evento
  const handleCardClick = (eventIndex: number) => {
    const event = filteredEvents[eventIndex];
    // Encontrar el índice de la primera imagen de este evento en el array plano
    const flatIndex = flatImages.findIndex((img) => img.event === event);
    if (flatIndex !== -1) {
      setCurrentIndex(flatIndex);
      zoomControls.resetZoom();
      setIsDescriptionExpanded(false);
    }
  };

  // Click desde CollageView (imágenes individuales) - usa directamente el índice plano
  const handleCollageImageClick = (eventIndex: number, imageIndex: number) => {
    const event = filteredEvents[eventIndex];
    // Encontrar el índice de esta imagen específica en el array plano
    const flatIndex = flatImages.findIndex(
      (img) => img.event === event && img.src === event.images[imageIndex]
    );
    if (flatIndex !== -1) {
      setCurrentIndex(flatIndex);
      zoomControls.resetZoom();
      setIsDescriptionExpanded(false);
    }
  };

  const handleModalClose = () => {
    setCurrentIndex(null);
    setIsDescriptionExpanded(false);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % flatImages.length);
    zoomControls.resetZoom();
    setIsDescriptionExpanded(false);
  };

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + flatImages.length) % flatImages.length);
    zoomControls.resetZoom();
    setIsDescriptionExpanded(false);
  };

  const currentItem = currentIndex !== null ? flatImages[currentIndex] : null;

  // Si no hay imágenes
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <section className="py-6 sm:py-10 bg-gray-50" id="gallery">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📷</div>
              <p className="text-gray-600 text-lg">No hay imágenes disponibles en este momento.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-10 bg-gray-50" id="gallery">
      <div className="container mx-auto px-4">
        <GalleryFilters
          viewMode={viewMode}
          setViewMode={setViewMode}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          filterType={filterType}
          setFilterType={setFilterType}
          years={years}
        />

        {viewMode === "collage" && (
          <CollageView images={filteredEvents} onImageClick={handleCollageImageClick} />
        )}

        {viewMode === "cards" && (
          <CardsView images={filteredEvents} onImageClick={handleCardClick} />
        )}

        <ImageModal
          isOpen={currentIndex !== null}
          onClose={handleModalClose}
          item={currentItem?.event || null}
          currentImageSrc={currentItem?.src || ""}
          currentIndex={currentIndex ?? 0}
          totalImages={flatImages.length}
          zoom={zoomControls.zoom}
          position={zoomControls.position}
          isDragging={zoomControls.isDragging}
          isDescriptionExpanded={isDescriptionExpanded}
          onToggleDescription={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          onNext={nextImage}
          onPrev={prevImage}
          onZoomIn={zoomControls.handleZoomIn}
          onZoomOut={zoomControls.handleZoomOut}
          onZoomReset={zoomControls.handleZoomReset}
          onWheel={zoomControls.handleWheel}
          onMouseDown={zoomControls.handleMouseDown}
          onMouseMove={zoomControls.handleMouseMove}
          onMouseUp={zoomControls.handleMouseUp}
          onTouchStart={zoomControls.handleTouchStart}
          onTouchMove={zoomControls.handleTouchMove}
          onTouchEnd={zoomControls.handleTouchEnd}
        />
      </div>
    </section>
  );
}

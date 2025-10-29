import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GalleryItem } from "@/lib/types";
import { ImageModalContent } from "./ImageModalContent";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | null;
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

export function ImageModal({
  isOpen,
  onClose,
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
}: ImageModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-7xl p-0 overflow-hidden max-h-[95vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <ImageModalContent
            item={item}
            currentImageSrc={currentImageSrc}
            currentIndex={currentIndex}
            totalImages={totalImages}
            zoom={zoom}
            position={position}
            isDragging={isDragging}
            isDescriptionExpanded={isDescriptionExpanded}
            onToggleDescription={onToggleDescription}
            onNext={onNext}
            onPrev={onPrev}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onZoomReset={onZoomReset}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

import Image from "next/image";
import { GalleryItem } from "@/lib/types";

interface CardsViewProps {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
}

export function CardsView({ images, onImageClick }: CardsViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {images.map((item, index) => {
        const thumbnailSrc = item.images && item.images.length > 0 ? item.images[0] : "/placeholder.jpg";
        
        return (
          <div 
            key={index}
            className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-transform duration-300 ease-out"
            onClick={() => onImageClick(index)}
          >
            <Image
              src={thumbnailSrc}
              alt={item.title}
              fill
              className="object-cover"
            />
            {/* Badge con el número de imágenes */}
            {item.images && item.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {item.images.length}
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-end justify-start p-2 text-white text-xs sm:text-sm opacity-0 hover:opacity-100 transition-opacity">
              <div>
                <p className="font-semibold mb-0.5">{item.title}</p>
                <p className="text-[10px] sm:text-xs opacity-90 line-clamp-1">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

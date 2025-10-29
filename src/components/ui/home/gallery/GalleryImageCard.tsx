import Image from "next/image";
import { GalleryItem } from "@/lib/types";

interface GalleryImageCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export function GalleryImageCard({ item, onClick }: GalleryImageCardProps) {
  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
      onClick={onClick}
    >
      <Image
        src={item.images[0] || "/placeholder.jpg"}
        alt={item.title}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-end justify-start p-2 text-white text-xs sm:text-sm opacity-0 hover:opacity-100 transition-opacity">
        <div>
          <p className="font-semibold mb-0.5">{item.title}</p>
          <p className="text-[10px] sm:text-xs opacity-90 line-clamp-1">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

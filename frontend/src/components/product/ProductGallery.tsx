import { useState } from "react";
import { cn } from "../../lib/utils";

interface ProductGalleryProps {
  imageUrl: string | null;
  name: string;
}

export const ProductGallery = ({ imageUrl, name }: ProductGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-lg bg-muted"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <img
        src={imageUrl || "/placeholder.webp"}
        alt={name}
        className={cn(
          "h-full w-full object-cover transition-transform duration-500",
          isZoomed && "scale-110"
        )}
      />
    </div>
  );
};

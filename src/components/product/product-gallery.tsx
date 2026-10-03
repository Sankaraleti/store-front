import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProductImage } from "@/lib/catalog"

// Mobile/tablet: edge-to-edge swipe rail with the next image peeking in.
// Desktop: images stacked at full column width so the page scrolls through
// them while the product information stays pinned alongside.
export function ProductGallery({
  images,
  productName,
  className,
}: {
  images: ProductImage[]
  productName: string
  className?: string
}) {
  return (
    <div
      role="region"
      aria-label={`${productName} images`}
      tabIndex={0}
      className={cn(
        "rail -mx-gutter min-w-0 lg:mx-0 lg:flex-col lg:overflow-visible",
        className
      )}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className="media aspect-product w-[88%] sm:w-[62%] lg:w-full"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes="(min-width: 64rem) 60vw, (min-width: 40rem) 62vw, 88vw"
          />
        </div>
      ))}
    </div>
  )
}

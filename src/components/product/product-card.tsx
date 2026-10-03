import Image from "next/image"
import Link from "next/link"
import { getStockState, type Product } from "@/lib/catalog"
import { ProductPrice } from "./product-price"

// Listing tile: image well, then name and price. Shared by the home page,
// category listings and "you may also like" rows so they stay identical.
export function ProductCard({ product }: { product: Product }) {
  const [image] = product.images
  const soldOut = getStockState(product) === "out_of_stock"

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media aspect-product">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw"
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        {soldOut && (
          <span className="absolute top-3 left-3 eyebrow bg-background px-2 py-1">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 space-y-0.5 text-xs">
        <h3 className="text-xs font-normal underline-offset-4 decoration-1 group-hover:underline">
          {product.name}
        </h3>
        <ProductPrice product={product} className="text-muted-foreground" />
      </div>
    </Link>
  )
}

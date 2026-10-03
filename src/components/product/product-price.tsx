import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/catalog"

export function ProductPrice({
  product,
  className,
}: {
  product: Pick<Product, "price" | "compareAtPrice" | "currency">
  className?: string
}) {
  const { price, compareAtPrice, currency } = product
  const onSale = compareAtPrice !== undefined && compareAtPrice > price

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      {onSale ? (
        <>
          <span className="sr-only">Sale price</span>
          <span className="text-sale">{formatPrice(price, currency)}</span>
          <span className="sr-only">Original price</span>
          <s className="text-muted-foreground">
            {formatPrice(compareAtPrice, currency)}
          </s>
        </>
      ) : (
        <span>{formatPrice(price, currency)}</span>
      )}
    </p>
  )
}
